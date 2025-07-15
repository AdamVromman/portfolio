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
  ["train-world", { xs: 98, sm: 110, md: 84, lg: 113, xl: 111 }],
  ["transfo-intiem", { xs: 98, sm: 120, md: 93, lg: 115, xl: 111 }],
  ["all-eyes-on-gaza", { xs: 101, sm: 114, md: 117, lg: 139, xl: 145 }],
  ["qausal", { xs: 94, sm: 116, md: 115, lg: 115, xl: 111 }],
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
  {
    name: "All Eyes on Gaza",
    slug: "all-eyes-on-gaza",
    color: "009736",
    year: 2025,
  },
  {
    name: "Qausal",
    slug: "qausal",
    color: "FF7700",
    year: 2025,
  },
];

export const dynamicBodies: FlyingObject[] = [];

export const assetsLoaded = new Event("assetsloaded");
