import type RAPIER from "@dimforge/rapier3d-compat";
import {
  NR_OF_COLUMNS_1280,
  NR_OF_COLUMNS_1024,
  NR_OF_COLUMNS_768,
  NR_OF_COLUMNS_480,
  NR_OF_COLUMNS,
} from "./Constants";
import type { FlyingObject, Project } from "./Interfaces";
import gsap from "gsap";

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

export let hoveringBody: FlyingObject | undefined = undefined;
export let previousVel: RAPIER.Vector3 | undefined = undefined;

export const setPreviousVel = (vector: RAPIER.Vector) => {
  previousVel = vector;
};

export const handleMouseIn = (project: Project, flyingObject: FlyingObject) => {
  homeTimeline.reverse();
  hoveringBody = flyingObject;
  gsap.to(`.home_video.${project.slug}`, {
    delay: 0.3,
    duration: 0.2,
    opacity: 1,
  });

  gsap.to("#background", {
    duration: 0.2,
    opacity: 0.1,
  });

  document.documentElement.style.setProperty(
    "--color-active",
    `#${project.color}`
  );
};

export const handleMouseOut = (
  project: Project,
  flyingObject: FlyingObject
) => {
  homeTimeline.play();
  gsap.to(`.home_video.${project.slug}`, {
    duration: 0.2,
    opacity: 0,
  });
  gsap.to("#background", {
    duration: 0.2,
    opacity: 1,
  });
  hoveringBody = undefined;
  if (previousVel) {
    flyingObject.body.setLinvel(previousVel, true);
    previousVel = undefined;
  }

  document.documentElement.style.setProperty("--color-active", "#4000ff");
};
