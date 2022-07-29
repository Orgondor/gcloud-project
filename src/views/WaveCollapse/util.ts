import { pixelSize, spriteSize } from "./defines";
import { Edge, EdgeMap, Sprite } from "./types";

export const randomInt = (max: number): number => {
  return Math.min(Math.floor(Math.random() * (max + 1)), max);
};

export const randomEntry = <T>(array: Array<T>): T =>
  array[randomInt(array.length - 1)];

export const pixelRowEqual = (
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

export const pixelsEqual = (
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

export const pixelsToLogString = (pixels: Uint8Array[]): string => {
  let result = "";

  pixels.forEach((pixelRow) => {
    for (let i = 0; i < pixelRow.length; i += 4) {
      if (pixelRowEqual(pixelRow.slice(i, i + 4), [255, 255, 255, 255])) {
        result += "O";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [0, 0, 255, 255])) {
        result += "#";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [255, 0, 0, 255])) {
        result += "@";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [0, 0, 0, 255])) {
        result += "S";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [49, 51, 49, 255])) {
        result += "B";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [109, 87, 6, 255])) {
        result += "T";
      } else if (
        pixelRowEqual(pixelRow.slice(i, i + 4), [109, 109, 109, 255])
      ) {
        result += "V";
      } else if (pixelRowEqual(pixelRow.slice(i, i + 4), [26, 26, 26, 255])) {
        result += "C";
      } else {
        result += "?";
      }
    }
    result += "\n";
  });

  return result;
};

export const pixelToHex = (pixel: Uint8Array): string => {
  let result = "";

  for (let i = 0; i < Math.min(pixel.length, 4); i++) {
    result += pixel[i].toString(16).padStart(2, "0");
  }

  return result;
};

export const pixelRowToHex = (pixelRow: Uint8Array): string => {
  let result = "";

  pixelRow.forEach((value) => {
    result += value.toString(16).padStart(2, "0");
  });

  return result;
};

export const pixelsToHex = (pixels: Uint8Array[]): string[][] => {
  const result: string[][] = [];

  pixels.forEach((pixelRow, i) => {
    result.push([]);

    for (let j = 0; j < pixelRow.length; j += 4) {
      result[i].push(pixelToHex(pixelRow.slice(j, j + 4)));
    }
  });

  return result;
};

export const pixelToInt = (pixel: Uint8Array): number => {
  if (pixel.length < 4) {
    throw new Error("invalid pixel, length < 4");
  }

  const buffer = new Uint32Array(1); // Needed to keep it unsigned
  buffer[0] = (pixel[0] << 24) | (pixel[1] << 16) | (pixel[2] << 8) | pixel[3];

  return buffer[0];
};

export const spriteToLogString = (sprite: Sprite): string => {
  return `rotation: ${Math.round(
    (sprite.rotation * 180) / Math.PI
  )}\nflipped: ${sprite.flippedY}\npixels:\n${pixelsToLogString(
    sprite.pixels
  )}edges:\n${sprite.edges[0]}\n${sprite.edges[1]}\n${sprite.edges[2]}\n${
    sprite.edges[3]
  }`;
};

export const extractPixelColumn = (
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

export const extractSpriteEdges = (spritePixels: Uint8Array[]): string[] => {
  const edges: Uint8Array[] = [];
  edges.push(spritePixels[0]);
  edges.push(extractPixelColumn(spritePixels, spritePixels.length - 1));
  edges.push(spritePixels[spritePixels.length - 1]);
  edges.push(extractPixelColumn(spritePixels, 0));
  return edges.map((edge) => pixelRowToHex(edge));
};

export const rotateSpritePixels = (
  spritePixels: Uint8Array[]
): Uint8Array[] => {
  const rotated: Uint8Array[] = [];
  [...Array(spriteSize)].forEach((_, i) => {
    rotated.push(extractPixelColumn(spritePixels, i, true));
  });
  return rotated;
};

export const spriteAlreadyExists = (
  sprites: Sprite[],
  spritePixels: Uint8Array[]
): boolean => {
  return sprites.some((data) => pixelsEqual(data.pixels, spritePixels));
};

export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getEmptyEdgeMap = (): EdgeMap => ({
  [Edge.Top]: {},
  [Edge.Right]: {},
  [Edge.Bottom]: {},
  [Edge.Left]: {},
});
