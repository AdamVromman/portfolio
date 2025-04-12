export enum LineDirection {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export enum LineType {
  MAIN = "main",
  SUB = "sub",
}

const NR_OF_COLUMNS = 5;
const NR_OF_COLUMNS_480 = 7;
const NR_OF_COLUMNS_768 = 9;
const NR_OF_COLUMNS_1024 = 13;
const NR_OF_COLUMNS_1280 = 15;

export const calculateHeight = (localTileWidth: number) => {
  if (window) {
    const NR_OF_ROWS = Math.floor((window.innerHeight - 30) / localTileWidth);
    return `${NR_OF_ROWS * localTileWidth}px`;
  }
  return "0px";
};

export const getScreenWidth = () => {
  if (window) {
    return window.innerWidth;
  }
  return 0;
};

export const getNrOfColumns = () => {
  const screenWidth = getScreenWidth();
  if (screenWidth >= 1280) {
    return NR_OF_COLUMNS_1280;
  } else if (screenWidth >= 1024) {
    return NR_OF_COLUMNS_1024;
  } else if (screenWidth >= 768) {
    return NR_OF_COLUMNS_768;
  } else if (screenWidth >= 480) {
    return NR_OF_COLUMNS_480;
  }

  return NR_OF_COLUMNS;
};
