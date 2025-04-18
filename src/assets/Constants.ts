import type RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import { gsap } from "gsap";

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

export const calculateTileWidth = (container: HTMLElement) => {
  return container.clientWidth / getNrOfColumns();
};

export const calculateNrOfRows = (localTileWidth: number) => {
  const container = document.getElementById("home");
  if (container) {
    const screenWidth = getScreenWidth();
    const NR_OF_ROWS = Math.floor(
      (container.clientHeight - 30) / localTileWidth
    );
    if (screenWidth >= 1280) {
      return Math.max(NR_OF_ROWS, 7);
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
  if (typeof window !== "undefined") {
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

export interface FlyingObject {
  mesh: THREE.Object3D;
  body: RAPIER.RigidBody;
  element: HTMLAnchorElement;
}

export interface Project {
  slug: string;
  color: string;
}

export const projects: Project[] = [
  {
    slug: "train-world",
    color: "de2217",
  },
  {
    slug: "club-sofa",
    color: "3aab94",
  },
];

export const homeTimeline = gsap
  .timeline({
    paused: true,
  })
  .from(
    ".grid_cell.bottom .grid_cell_container",
    {
      duration: 0.3,
      y: "100%",
      ease: "power3.in",
    },
    0
  )
  .from(
    ".grid_cell.top .grid_cell_container",
    {
      duration: 0.3,
      y: "-100%",
      ease: "power3.in",
    },
    0
  )
  .from(
    ".grid_cell.left .grid_cell_container",
    {
      duration: 0.3,
      x: "-100%",
      ease: "power3.in",
    },
    0
  )
  .from(
    ".grid_cell.right .grid_cell_container",
    {
      duration: 0.3,
      x: "100%",
      ease: "power3.in",
    },
    0
  );
