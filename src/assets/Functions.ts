import type RAPIER from "@dimforge/rapier3d-compat";
import {
  NR_OF_COLUMNS_1280,
  NR_OF_COLUMNS_1024,
  NR_OF_COLUMNS_768,
  NR_OF_COLUMNS_480,
  NR_OF_COLUMNS,
  projects,
  dynamicBodies,
} from "./Constants";
import type { FlyingObject, Project } from "./Interfaces";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export const calculateTileWidth = () => {
  const gridContainer = document.getElementById("grid-container");
  if (gridContainer)
    return Math.floor(gridContainer.clientWidth / getNrOfColumns());
  return 0;
};

export const calculateNrOfRows = (localTileWidth: number) => {
  const container = document.getElementById("grid-container");
  if (container) {
    const screenWidth = getScreenWidth();
    const nrOfRows =
      Math.floor((container.clientHeight - 30) / localTileWidth / 2) * 2;
    if (screenWidth >= 1280) {
      return Math.max(nrOfRows, 14);
    }
    if (screenWidth >= 1024) {
      return Math.max(nrOfRows, 12);
    }
    if (screenWidth >= 768) {
      return Math.max(nrOfRows, 14);
    }
    if (screenWidth >= 480) {
      return Math.max(nrOfRows, 16);
    }
    return Math.max(nrOfRows, 16);
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

export let hoveringBody: FlyingObject | undefined = undefined;
export let previousVel: RAPIER.Vector3 | undefined = undefined;

export const setPreviousVel = (vector: RAPIER.Vector) => {
  previousVel = vector;
};

export const handleMouseIn = (key: string) => {
  const project = projects.find((project) => project.slug === key);
  const flyingObject = dynamicBodies.find(
    (flyingObject) => flyingObject.slug === key
  );
  if (project && flyingObject) {
    document.documentElement.style.setProperty(
      "--color-active",
      `#${project.color}`
    );

    gsap.to(".grid_cell.home_grid_title .grid_cell_container", {
      backgroundColor: `#${project.color}`,
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(".grid_cell.home_grid_title .page-title", {
      color: "#eee",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(".grid_cell.home_grid_title .page-title.sub", {
      color: "#eee",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(".grid_cell.home_grid_title h1.page-title", {
      y: "-100%",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(`.grid_cell.home_grid_title .page-title.sub.${project.slug}`, {
      y: "0%",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.fromTo(
      `.grid_cell.bottom:not(.ignore-move-out) .grid_cell_container`,
      {
        y: "0",
      },
      {
        duration: 0.3,
        y: "100%",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.fromTo(
      `.grid_cell.top:not(.ignore-move-out) .grid_cell_container`,
      {
        y: "0",
      },
      {
        duration: 0.3,
        y: "-100%",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.fromTo(
      `.grid_cell.left:not(.ignore-move-out) .grid_cell_container`,
      {
        x: "0",
      },
      {
        duration: 0.3,
        x: "-100%",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.fromTo(
      `.grid_cell.right:not(.ignore-move-out) .grid_cell_container`,
      {
        x: "0",
      },
      {
        duration: 0.3,
        x: "100%",
        ease: "power3.in",
        overwrite: true,
      }
    );
    hoveringBody = flyingObject;
    gsap.to(`.home_video.${project.slug}`, {
      delay: 0.3,
      duration: 0.2,
      opacity: 1,
      overwrite: true,
    });

    gsap.to("#background", {
      duration: 0.2,
      opacity: 0.1,
      overwrite: true,
    });
  }
};

export const handleMouseOut = (key: string) => {
  document.documentElement.style.setProperty("--color-active", "#4000ff");
  const project = projects.find((project) => project.slug === key);
  const flyingObject = dynamicBodies.find(
    (flyingObject) => flyingObject.slug === key
  );
  if (project && flyingObject) {
    gsap.to(".grid_cell.home_grid_title .grid_cell_container", {
      backgroundColor: "#eee",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(".grid_cell.home_grid_title .page-title", {
      color: "#4000ff",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(".grid_cell.home_grid_title .page-title.sub", {
      color: "#4000ff",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(".grid_cell.home_grid_title h1.page-title", {
      y: "0",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.to(`.grid_cell.home_grid_title .page-title.sub.${project.slug}`, {
      y: "100%",
      duration: 0.3,
      ease: "power3.in",
      overwrite: true,
    });

    gsap.fromTo(
      `.grid_cell.bottom:not(.ignore-move-out) .grid_cell_container`,
      {
        y: "100%",
      },
      {
        duration: 0.3,
        y: "0",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.fromTo(
      `.grid_cell.top:not(.ignore-move-out) .grid_cell_container`,
      {
        y: "-100%",
      },
      {
        duration: 0.3,
        y: "0",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.fromTo(
      `.grid_cell.left:not(.ignore-move-out) .grid_cell_container`,
      {
        x: "-100%",
      },
      {
        duration: 0.3,
        x: "0",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.fromTo(
      `.grid_cell.right:not(.ignore-move-out) .grid_cell_container`,
      {
        x: "100%",
      },
      {
        duration: 0.3,
        x: "0",
        ease: "power3.in",
        overwrite: true,
      }
    );
    gsap.to(`.home_video.${project.slug}`, {
      duration: 0.2,
      opacity: 0,
      overwrite: true,
    });
    gsap.to("#background", {
      duration: 0.2,
      opacity: 1,
      overwrite: true,
    });
    hoveringBody = undefined;
    if (previousVel) {
      flyingObject.body.setLinvel(previousVel, true);
      previousVel = undefined;
    }
  }
};
