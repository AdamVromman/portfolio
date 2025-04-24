import type { Project, FlyingObject } from "./Interfaces";

export const NR_OF_COLUMNS = 10;
export const NR_OF_COLUMNS_480 = 14;
export const NR_OF_COLUMNS_768 = 18;
export const NR_OF_COLUMNS_1024 = 26;
export const NR_OF_COLUMNS_1280 = 30;

export const projects: Project[] = [
  {
    name: "Qausal",
    slug: "qausal",
    color: "de2217",
    year: 2025,
  },
  {
    name: "Transfo Intiem",
    slug: "transfo-intiem",
    color: "de2217",
    year: 2024,
  },
  {
    name: "Train World",
    slug: "train-world",
    color: "de2217",
    year: 2023,
  },
  {
    name: "Club Sofa",
    slug: "club-sofa",
    color: "07d9ae",
    year: 2022,
  },
];

export const dynamicBodies: FlyingObject[] = [];

export const assetsLoaded = new Event("assetsloaded");
