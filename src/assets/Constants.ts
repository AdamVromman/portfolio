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

export const calculateNrOfRows = (localTileWidth: number) => {
  if (window) {
    const screenWidth = getScreenWidth();
    const NR_OF_ROWS = Math.floor((window.innerHeight - 30) / localTileWidth);
    if (screenWidth >= 1280) {
      return Math.max(NR_OF_ROWS, 5);
    }
    if (screenWidth >= 1024) {
      return Math.max(NR_OF_ROWS, 6);
    }
    if (screenWidth >= 768) {
      return Math.max(NR_OF_ROWS, 7);
    }
    if (screenWidth >= 480) {
      return Math.max(NR_OF_ROWS, 8);
    }
    return Math.max(NR_OF_ROWS, 10);
  }
  return 5;
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
