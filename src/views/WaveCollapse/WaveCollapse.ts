import getPixels from "get-pixels";
import { NdArray } from "ndarray";
import { renderSize } from "./defines";
import { loadSprites } from "./loadSprites";
import { chooseSprite, drawTile, initTiles } from "./tile";
import { sleep } from "./util";

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
  const tiles = initTiles(sprites, canvasWidth, canvasHeight);

  let remainingTiles = tiles;

  while (remainingTiles.length) {
    const tile = chooseSprite(remainingTiles);
    drawTile(context, tile);
    remainingTiles = remainingTiles.filter((tile) => !tile.chosenSprite);
    await sleep(100);
  }
};
