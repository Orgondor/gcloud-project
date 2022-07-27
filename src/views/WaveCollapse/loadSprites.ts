import { NdArray } from "ndarray";
import {
  numberOfSprites,
  pixelSize,
  pixelSpriteSize,
  renderSize,
  spriteSize,
} from "./defines";
import { Sprite } from "./types";
import {
  extractSpriteEdges,
  rotateSpritePixels,
  spriteAlreadyExists,
} from "./util";

export const loadSprites = async (
  pixels: NdArray<Uint8Array>
): Promise<Sprite[]> => {
  const sprites: Sprite[] = [];
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

    if (!spriteAlreadyExists(sprites, spritePixels)) {
      sprites.push({
        pixels: spritePixels,
        edges: extractSpriteEdges(spritePixels, spriteRowSize),
        rotation: 0,
        flippedY: flipped,
        image: images[i],
      });
    }

    for (let r = 0; r < 3; r++) {
      spritePixels = rotateSpritePixels(spritePixels);

      if (!spriteAlreadyExists(sprites, spritePixels)) {
        sprites.push({
          pixels: spritePixels,
          edges: extractSpriteEdges(spritePixels, spriteRowSize),
          rotation: (Math.PI * (r + 1)) / 2,
          flippedY: flipped,
          image: images[i],
        });
      } else {
        break;
      }
    }
  });

  return sprites;
};
