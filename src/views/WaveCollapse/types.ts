export type Sprite = {
  rotation: number;
  flippedY: boolean;
  pixels: Uint8Array[];
  edges: Uint8Array[];
  image: ImageBitmap;
};

export enum Edge {
  Top = 0,
  Right,
  Bottom,
  Left,
}
