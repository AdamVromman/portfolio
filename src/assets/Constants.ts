import type { Project, FlyingObject } from "./Interfaces";

export const NR_OF_COLUMNS = 10;
export const NR_OF_COLUMNS_480 = 14;
export const NR_OF_COLUMNS_768 = 18;
export const NR_OF_COLUMNS_1024 = 26;
export const NR_OF_COLUMNS_1280 = 30;

export const ROWS_PER_PROJECT_PER_SCREENSIZE = new Map<
  string,
  { xs: number; sm: number; md: number; lg: number; xl: number }
>([
  ["club-sofa", { xs: 113, sm: 131, md: 121, lg: 113, xl: 111 }],
  ["train-world", { xs: 115, sm: 138, md: 121, lg: 109, xl: 107 }],
  ["transfo-intiem", { xs: 115, sm: 138, md: 121, lg: 109, xl: 107 }],
  ["all-eyes-on-gaza", { xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }],
  ["qausal", { xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }],
]);

export const projects: Project[] = [
  {
    name: "Club Sofa",
    slug: "club-sofa",
    color: "07d9ae",
    year: 2022,
  },
  {
    name: "Train World",
    slug: "train-world",
    color: "de2217",
    year: 2023,
  },
  {
    name: "Transfo Intiem",
    slug: "transfo-intiem",
    color: "B87AFF",
    year: 2024,
  },
  // {
  //   name: "All Eyes on Gaza",
  //   slug: "all-eyes-on-gaza",
  //   color: "FF7700",
  //   year: 2025,
  // },
  {
    name: "Qausal",
    slug: "qausal",
    color: "FF7700",
    year: 2025,
  },
];

export const dynamicBodies: FlyingObject[] = [];

export const assetsLoaded = new Event("assetsloaded");
