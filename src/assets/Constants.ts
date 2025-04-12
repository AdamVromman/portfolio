export enum LineDirection {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export enum LineType {
  MAIN = "main",
  SUB = "sub",
}

export const NR_OF_COLUMNS = 15;

export const calculateHeight = (localTileWidth: number) => {
  if (window) {
    const NR_OF_ROWS = Math.floor((window.innerHeight - 30) / localTileWidth);
    return `${NR_OF_ROWS * localTileWidth}px`;
  }
  return "0px";
};
