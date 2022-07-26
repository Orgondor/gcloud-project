import getPixels from "get-pixels";
import { NdArray } from "ndarray";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require("../../images/SimpleSprites.png");

type Sprite = {
  rotation: number;
  flippedY: boolean;
  pixels: Uint8Array[];
  edges: Uint8Array[];
  image: ImageBitmap;
};

const pixelRowEqual = (
  a: Uint8Array | number[],
  b: Uint8Array | number[]
): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

const pixelsEqual = (
  a: Uint8Array[] | number[][],
  b: Uint8Array[] | number[][]
): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!pixelRowEqual(a[i], b[i])) {
      return false;
    }
  }

  return true;
};

const randomInt = (max: number) => {
  return Math.min(Math.floor(Math.random() * (max + 1)), max);
};

const pixelsToString = (pixels: Uint8Array[]): string => {
  let result = "";

  pixels.forEach((pixelRow) => {
    for (let i = 0; i < pixelRow.length; i += 4) {
      if (pixelRowEqual(pixelRow.slice(i, i + 4), [255, 255, 255, 255])) {
        result += "O";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [0, 0, 255, 255])) {
        result += "#";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [255, 0, 0, 255])) {
        result += "@";
      } else {
        result += "?";
      }
    }
    result += "\n";
  });

  return result;
};

const logSprite = (sprite: Sprite) => {
  console.log(
    `rotation: ${Math.round((sprite.rotation * 180) / Math.PI)}\nflipped: ${
      sprite.flippedY
    }\npixels:\n${pixelsToString(sprite.pixels)}`
  );
};

export const WaveCollapse = (canvasId: string): void => {
  const canvas: HTMLCanvasElement = document.getElementById(
    canvasId
  ) as HTMLCanvasElement;
  const context: CanvasRenderingContext2D = canvas.getContext("2d");
  const sprites: Sprite[] = [];
  const spriteSize = 3;
  const numberOfSprites = 6;
  const renderSize = 30;
  const pixelSize = 4;
  const pixelSpriteSize = pixelSize * spriteSize;

  const canvasWidth = canvas.width / renderSize;
  const canvasHeight = canvas.height / renderSize;

  context.imageSmoothingEnabled = false;

  const loadSprites = async (pixels: NdArray<Uint8Array>) => {
    const mapWidth = pixels.shape[0];
    const mapHeight = pixels.shape[1];
    const pixelRowSize = pixelSize * mapWidth;
    const spriteRowSize = Math.floor(mapWidth / spriteSize);

    const imageData = new ImageData(
      Uint8ClampedArray.from(pixels.data),
      mapWidth,
      mapHeight
    );

    const images = await Promise.all(
      [...Array(numberOfSprites * 2)].map((_, i) => {
        const spriteIndex = i % numberOfSprites;
        const flipped = i >= numberOfSprites;

        return createImageBitmap(
          imageData,
          (spriteIndex * spriteSize) % mapWidth,
          Math.floor((spriteIndex * spriteSize) / mapWidth) * spriteSize,
          spriteSize,
          spriteSize,
          {
            resizeWidth: renderSize,
            resizeHeight: renderSize,
            resizeQuality: "pixelated",
            imageOrientation: flipped ? "flipY" : "none",
          }
        );
      })
    );

    const extractPixelColumn = (
      spritePixels: Uint8Array[],
      column: number,
      reverse = false
    ): Uint8Array => {
      const columnPixels = new Uint8Array(spritePixels.length * pixelSize);
      spritePixels.forEach((row, i) => {
        [...Array(pixelSize)].forEach((_, j) => {
          const rowIndex = reverse ? spritePixels.length - i - 1 : i;
          columnPixels[rowIndex * pixelSize + j] = row[column * pixelSize + j];
        });
      });
      return columnPixels;
    };

    const extractSpriteEdges = (spritePixels: Uint8Array[]): Uint8Array[] => {
      const edges: Uint8Array[] = [];
      edges.push(spritePixels[0]);
      edges.push(extractPixelColumn(spritePixels, 0));
      edges.push(spritePixels[spritePixels.length - 1]);
      edges.push(extractPixelColumn(spritePixels, spriteRowSize - 1));
      return edges;
    };

    const rotateSpritePixels = (spritePixels: Uint8Array[]): Uint8Array[] => {
      const rotated: Uint8Array[] = [];
      [...Array(spriteSize)].forEach((_, i) => {
        rotated.push(extractPixelColumn(spritePixels, i, true));
      });
      return rotated;
    };

    const spriteAlreadyExists = (spritePixels: Uint8Array[]): boolean => {
      return sprites.some((data) => pixelsEqual(data.pixels, spritePixels));
    };

    [...Array(numberOfSprites * 2)].forEach((_, i) => {
      const spriteIndex = i % numberOfSprites;
      const flipped = i >= numberOfSprites;

      let spritePixels = [...Array(spriteSize)].map((_, j) => {
        const row =
          Math.floor(spriteIndex / spriteRowSize) * pixelRowSize * spriteSize;
        const col = (spriteIndex % spriteRowSize) * pixelSpriteSize;

        const pixelsStart = row + col + pixelRowSize * j;
        return pixels.data.slice(pixelsStart, pixelsStart + pixelSpriteSize);
      });

      if (flipped) {
        spritePixels.reverse();
      }

      if (!spriteAlreadyExists(spritePixels)) {
        sprites.push({
          pixels: spritePixels,
          edges: extractSpriteEdges(spritePixels),
          rotation: 0,
          flippedY: flipped,
          image: images[i],
        });
      }

      for (let r = 0; r < 3; r++) {
        spritePixels = rotateSpritePixels(spritePixels);

        if (!spriteAlreadyExists(spritePixels)) {
          sprites.push({
            pixels: spritePixels,
            edges: extractSpriteEdges(spritePixels),
            rotation: (Math.PI * (r + 1)) / 2,
            flippedY: flipped,
            image: images[i],
          });
        } else {
          break;
        }
      }
    });

    sprites.forEach((sprite, i) => {
      context.translate(
        renderSize / 2 + renderSize * (i % canvasWidth),
        renderSize / 2 + renderSize * Math.floor(i / canvasWidth)
      );
      context.rotate(sprite.rotation);
      context.drawImage(sprite.image, -(renderSize / 2), -renderSize / 2);
      context.rotate(-sprite.rotation);
      context.translate(
        -(renderSize / 2 + renderSize * (i % canvasWidth)),
        -(renderSize / 2 + renderSize * Math.floor(i / canvasWidth))
      );
    });
  };

  getPixels(imageSrc, async (error, pixels) => {
    if (!error) {
      loadSprites(pixels);
    } else {
      console.log("Failed to load sprite map", error);
    }
  });
};
