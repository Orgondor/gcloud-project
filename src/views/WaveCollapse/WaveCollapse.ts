import getPixels from "get-pixels";
import { NdArray } from "ndarray";
import { renderSize } from "./defines";
import { loadSprites } from "./loadSprites";
import { Edge } from "./types";
import { logSprite, pixelsToString } from "./util";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require("../../images/SimpleSprites.png");

const getPixelsPromise = (path: string): Promise<NdArray<Uint8Array>> => {
  return new Promise((resolve, reject) => {
    getPixels(path, (error, pixels) => {
      if (error) {
        return reject(error);
      }
      resolve(pixels);
    });
  });
};

export const WaveCollapse = async (canvasId: string): Promise<void> => {
  const canvas: HTMLCanvasElement = document.getElementById(
    canvasId
  ) as HTMLCanvasElement;
  const context: CanvasRenderingContext2D = canvas.getContext("2d");

  const canvasWidth = canvas.width / renderSize;
  const canvasHeight = canvas.height / renderSize;

  context.imageSmoothingEnabled = false;

  const pixels = await getPixelsPromise(imageSrc);
  const sprites = await loadSprites(pixels);

  for (let i = 0; i < 4; i++) {
    logSprite(sprites[i]);
    console.log(
      `edges:\n${pixelsToString([
        sprites[i].edges[Edge.Top],
      ])}\n${pixelsToString([sprites[i].edges[Edge.Right]])}\n${pixelsToString([
        sprites[i].edges[Edge.Bottom],
      ])}\n${pixelsToString([sprites[i].edges[Edge.Left]])}`
    );
  }

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
