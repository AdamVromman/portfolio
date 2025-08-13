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
  ["club-sofa", { xs: 116, sm: 133, md: 123, lg: 113, xl: 111 }],
  ["train-world", { xs: 102, sm: 114, md: 86, lg: 115, xl: 113 }],
  ["kickstarter-video", { xs: 102, sm: 114, md: 86, lg: 115, xl: 113 }],
  ["transfo-intiem", { xs: 102, sm: 126, md: 95, lg: 117, xl: 113 }],
  ["all-eyes-on-gaza", { xs: 105, sm: 118, md: 119, lg: 141, xl: 147 }],
  ["qausal", { xs: 96, sm: 118, md: 115, lg: 147, xl: 151 }],
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
    color: "de0d00",
    year: 2023,
  },
  {
    name: "Kickstarter Video",
    slug: "kickstarter-video",
    color: "FF0000",
    year: 2023,
  },
  {
    name: "Transfo Intiem",
    slug: "transfo-intiem",
    color: "750ee9",
    year: 2024,
  },
  {
    name: "All Eyes on Gaza",
    slug: "all-eyes-on-gaza",
    color: "03a33b",
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

export enum Language {
  EN = "en",
  NL = "nl",
}
