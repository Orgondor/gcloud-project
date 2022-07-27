import { pixelSize, spriteSize } from "./defines";
import { Sprite } from "./types";

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

export const randomInt = (max: number) => {
  return Math.min(Math.floor(Math.random() * (max + 1)), max);
};

export const pixelsToString = (pixels: Uint8Array[]): string => {
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

export const logSprite = (sprite: Sprite) => {
  console.log(
    `rotation: ${Math.round((sprite.rotation * 180) / Math.PI)}\nflipped: ${
      sprite.flippedY
    }\npixels:\n${pixelsToString(sprite.pixels)}`
  );
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

export const extractSpriteEdges = (
  spritePixels: Uint8Array[],
  spriteRowSize: number
): Uint8Array[] => {
  const edges: Uint8Array[] = [];
  edges.push(spritePixels[0]);
  edges.push(extractPixelColumn(spritePixels, spriteRowSize - 1));
  edges.push(spritePixels[spritePixels.length - 1]);
  edges.push(extractPixelColumn(spritePixels, 0));
  return edges;
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
