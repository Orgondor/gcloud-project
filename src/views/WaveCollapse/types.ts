export type Sprite = {
  rotation: number;
  flippedY: boolean;
  pixels: Uint8Array[];
  edges: string[];
  image: ImageBitmap;
};

export type EdgeMap = Record<Edge, Record<string, boolean>>;

export type Tile = {
  chosenSprite?: Sprite;
  options: Sprite[];
  edgeMap: EdgeMap;
  x: number;
  y: number;
};

export enum Edge {
  Top = 0,
  Right,
  Bottom,
  Left,
}

export const opposingEdge: Record<Edge, Edge> = {
  [Edge.Top]: Edge.Bottom,
  [Edge.Right]: Edge.Left,
  [Edge.Bottom]: Edge.Top,
  [Edge.Left]: Edge.Right,
};

export type Neighbor = {
  tile: Tile;
  edge: Edge;
};

export type RunControl = {
  setRunning: (running: boolean) => void;
  setCancel: (cancel: boolean) => void;
};

export type PathMap = Record<string, string>;

export type MapSetting = {
  spriteSize: number;
  numberOfSprites: number;
};

export type MapSettings = Record<string, MapSetting>;
