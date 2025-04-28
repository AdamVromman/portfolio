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
  const gridContainer = document.getElementById("grid-calculator");
  if (gridContainer)
    return Math.floor(gridContainer.clientWidth / getNrOfColumns());
  return 0;
};

export const calculateNrOfRows = (localTileWidth: number) => {
  const container = document.getElementById("grid-calculator");
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
export let selectedProject: Project | undefined = undefined;

export const setSelectedProject = (project: Project | undefined) => {
  selectedProject = project;
};

export const setPreviousVel = (vector: RAPIER.Vector) => {
  previousVel = vector;
};

export const toProjectPage = () => {
  console.log("toProjectPage");
  if (selectedProject) {
    document.documentElement.style.setProperty(
      "--color-active",
      `#${selectedProject.color}`
    );
    const timeline = gsap.timeline();

    timeline
      .to(
        `.grid_cell.bottom .grid_cell_container`,
        {
          duration: 0.3,
          y: "100%",
          ease: "power3.in",
        },
        "0"
      )
      .to(
        `.grid_cell.top .grid_cell_container`,
        {
          duration: 0.3,
          y: "-100%",
          ease: "power3.in",
        },
        "<"
      )
      .to(
        `.grid_cell.left .grid_cell_container`,
        {
          duration: 0.3,
          x: "-100%",
          ease: "power3.in",
        },
        "<"
      )
      .to(
        `.grid_cell.right .grid_cell_container`,
        {
          duration: 0.3,
          x: "100%",
          ease: "power3.in",
        },
        "<"
      )
      .to(
        `.home_video.${selectedProject.slug}`,
        {
          delay: 0.3,
          duration: 0.2,
          opacity: 1,
        },
        "<"
      )
      .to(
        `#flying-objects`,
        {
          scale: 0,
        },
        "<"
      )
      .fromTo(
        "#project-page",
        {
          opacity: 0,
          y: "50",
        },
        {
          opacity: 1,
          y: "0",
          duration: 0.5,
          ease: "power4.out",
        }
      ),
      "<-=0.5";
  }
};

export const handleMouseIn = (key: string) => {
  if (!selectedProject) {
    const project = projects.find((project) => project.slug === key);
    const flyingObject = dynamicBodies.find(
      (flyingObject) => flyingObject.slug === key
    );
    if (project && flyingObject) {
      hoveringBody = flyingObject;

      const timeline = gsap.timeline();

      document.documentElement.style.setProperty(
        "--color-active",
        `#${project.color}`
      );

      timeline
        .to(
          ".grid_cell.home_grid_title h1.page-title",
          {
            y: "-100%",
            duration: 0.3,
            ease: "power3.in",
            overwrite: true,
          },
          "0"
        )
        .to(
          `.grid_cell.home_grid_title .page-title.sub.${project.slug}`,
          {
            y: "0%",
            duration: 0.3,
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.bottom:not(.ignore-move-out) .grid_cell_container`,
          {
            y: "0",
          },
          {
            duration: 0.3,
            y: "100%",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.top:not(.ignore-move-out) .grid_cell_container`,
          {
            y: "0",
          },
          {
            duration: 0.3,
            y: "-100%",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.left:not(.ignore-move-out) .grid_cell_container`,
          {
            x: "0",
          },
          {
            duration: 0.3,
            x: "-100%",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.right:not(.ignore-move-out) .grid_cell_container`,
          {
            x: "0",
          },
          {
            duration: 0.3,
            x: "100%",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .to(
          `.home_video.${project.slug}`,
          {
            delay: 0.3,
            duration: 0.2,
            opacity: 1,
            overwrite: true,
          },
          "<"
        )
        .to(
          ".background_svg_line.line_vertical:not(.background_project-page)",
          {
            duration: 0.5,
            attr: { y2: "0%" },
            ease: "power4.out",
            overwrite: true,
          },
          "<"
        )
        .to(
          ".background_svg_line.line_horizontal:not(.background_project-page)",
          {
            duration: 0.5,
            attr: { x2: "0%" },
            ease: "power4.out",
            overwrite: true,
          },
          "<"
        );
    }
  }
};

export const handleMouseOut = (key: string) => {
  if (!selectedProject) {
    document.documentElement.style.setProperty("--color-active", "#4000ff");
    const project = projects.find((project) => project.slug === key);
    const flyingObject = dynamicBodies.find(
      (flyingObject) => flyingObject.slug === key
    );
    if (project && flyingObject) {
      const timeline = gsap.timeline();

      timeline
        .to(
          ".grid_cell.home_grid_title h1.page-title",
          {
            y: "0",
            duration: 0.3,
            ease: "power3.in",
            overwrite: true,
          },
          "0"
        )
        .to(
          `.grid_cell.home_grid_title .page-title.sub.${project.slug}`,
          {
            y: "100%",
            duration: 0.3,
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.bottom:not(.ignore-move-out) .grid_cell_container`,
          {
            y: "100%",
          },
          {
            duration: 0.3,
            y: "0",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.top:not(.ignore-move-out) .grid_cell_container`,
          {
            y: "-100%",
          },
          {
            duration: 0.3,
            y: "0",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.left:not(.ignore-move-out) .grid_cell_container`,
          {
            x: "-100%",
          },
          {
            duration: 0.3,
            x: "0",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )
        .fromTo(
          `.grid_cell.right:not(.ignore-move-out) .grid_cell_container`,
          {
            x: "100%",
          },
          {
            duration: 0.3,
            x: "0",
            ease: "power3.in",
            overwrite: true,
          },
          "<"
        )

        .to(
          "#background",
          {
            duration: 0.2,
            opacity: 1,
            overwrite: true,
          },
          "<"
        )
        .to(
          ".background_svg_line.line_vertical:not(.background_project-page)",
          {
            duration: 0.5,
            attr: { y2: "100%" },
            ease: "power4.out",
            overwrite: true,
          },
          "<"
        )
        .to(
          ".background_svg_line.line_horizontal:not(.background_project-page)",
          {
            duration: 0.5,
            attr: { x2: "100%" },
            ease: "power4.out",
            overwrite: true,
          },
          "<"
        )
        .to(
          `.home_video.${project.slug}`,
          {
            duration: 0.2,
            opacity: 0,
            overwrite: true,
          },
          ">"
        );
      hoveringBody = undefined;
      if (previousVel) {
        flyingObject.body.setLinvel(previousVel, true);
        previousVel = undefined;
      }
    }
  }
};
