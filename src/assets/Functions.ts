import type RAPIER from "@dimforge/rapier3d-compat";
import {
  NR_OF_COLUMNS_1280,
  NR_OF_COLUMNS_1024,
  NR_OF_COLUMNS_768,
  NR_OF_COLUMNS_480,
  NR_OF_COLUMNS,
  projects,
  dynamicBodies,
  ROWS_PER_PROJECT_PER_SCREENSIZE,
} from "./Constants";
import type { FlyingObject, Project } from "./Interfaces";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export const calculateTileWidth = (from: string) => {
  const gridContainer = document.getElementById("grid-calculator");
  // console.log("from: ", from);
  // console.log("grid: ", gridContainer?.clientWidth);
  // console.log("body: ", document.body.clientWidth);
  // console.log("documentElement: ", document.documentElement.clientWidth);
  // console.log("--------------------");
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
      return Math.max(nrOfRows, 22);
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

export const justifyParagraphs = () => {
  // const justifiedParagraphs = document.querySelectorAll<HTMLElement>(
  //   ".justified-paragraph"
  // );
  // justifiedParagraphs.forEach((paragraph) => {
  //   const height = paragraph.getBoundingClientRect().height;
  //   const parentHeight =
  //     paragraph.parentElement?.getBoundingClientRect().height ?? 0;
  //   const heightDiff = parentHeight - height;
  //   paragraph.style.padding = `${heightDiff / 4}px`;
  // });
};

export const getFooterRows = () => {
  const width = getScreenWidth();
  if (width >= 1280) {
    return 6;
  }
  if (width >= 1024) {
    return 8;
  }
  if (width >= 768) {
    return 10;
  }
  if (width >= 480) {
    return 12;
  }
  return 12;
};

export const getProjectRowsPerScreenSize = () => {
  const key = document.getElementById("grid-container")?.classList[0];
  const screenWidth = getScreenWidth();
  if (key) {
    if (screenWidth >= 1280) {
      return ROWS_PER_PROJECT_PER_SCREENSIZE.get(key)?.xl || 0;
    } else if (screenWidth >= 1024) {
      return ROWS_PER_PROJECT_PER_SCREENSIZE.get(key)?.lg || 0;
    } else if (screenWidth >= 768) {
      return ROWS_PER_PROJECT_PER_SCREENSIZE.get(key)?.md || 0;
    } else if (screenWidth >= 480) {
      return ROWS_PER_PROJECT_PER_SCREENSIZE.get(key)?.sm || 0;
    }

    return ROWS_PER_PROJECT_PER_SCREENSIZE.get(key)?.xs || 0;
  }
  return 0;
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

export const loadHomePage = () => {
  console.log("loadHomePage");
  drawHomeGrid(true);
  const duration = 0.75;

  const stagger: gsap.StaggerVars = {
    each: 0.05,
    from: "center",
    ease: "power1.out",
  };
  const ease = "power1.inOut";
  const timeline = gsap
    .timeline()
    .to(
      ".background_svg_dot.background_svg_dot_odd",
      {
        duration: 1,
        attr: { r: `1px` },
        stagger: {
          each: 0.003,
          from: "random",
          ease: "power1.in",
        },
        ease: "elastic.out",
      },
      "<"
    )
    .to(
      ".background_svg_dot.background_svg_dot_even",
      {
        duration: 1,
        attr: { r: `1px` },
        stagger: {
          each: 0.003,
          from: "random",
          ease: "power1.in",
        },
        ease: "elastic.out",
      },
      "<"
    )
    .to(
      ".background_svg_line.line_vertical.line_main",
      {
        duration: duration,
        attr: { y2: "100%", y1: "0%" },
        ease: ease,
        stagger: stagger,
      },
      ">-=1"
    )
    .to(
      ".background_svg_line.line_vertical.line_sub",
      {
        duration: duration,
        attr: { y2: "100%", y1: "0%" },
        ease: ease,
        stagger: stagger,
      },
      "<"
    )
    .to(
      ".background_svg_line.line_horizontal.line_main",
      {
        duration: duration,
        attr: { x2: "100%", x1: "0%" },
        ease: ease,
        stagger: stagger,
      },
      "<"
    )
    .to(
      ".background_svg_line.line_horizontal.line_sub",
      {
        duration: duration,
        attr: { x2: "100%", x1: "0%" },
        ease: ease,
        stagger: stagger,
      },
      "<"
    )
    .to(
      ".background_svg_dot",
      {
        duration: 0.5,
        attr: { r: `0` },
        stagger: {
          amount: 0.5,
          from: "random",
        },
      },
      ">"
    )
    .from(
      ".grid_cell.bottom .grid_cell_container",
      {
        duration: 1,
        y: "100%",
        ease: "power4.out",
      },
      "<"
    )
    .from(
      ".grid_cell.top .grid_cell_container",
      {
        duration: 1,
        y: "-100%",
        ease: "power4.out",
      },
      "<"
    )
    .from(
      ".grid_cell.left .grid_cell_container",
      {
        duration: 1,
        x: "-100%",
        ease: "power4.out",
      },
      "<+=0.5"
    )
    .from(
      ".grid_cell.right .grid_cell_container",
      {
        duration: 1,
        x: "100%",
        ease: "power4.out",
      },
      "<"
    );
};

export const loadProjectPage = () => {
  //loadHomePage();
  console.log("loadProjectPage");
  drawHomeGrid(true);
  drawProjectPageGrid();
  if (selectedProject) {
    document.documentElement.style.setProperty(
      "--color-active",
      `#${selectedProject.color}`
    );
    const timeline = gsap.timeline({
      onComplete: justifyParagraphs,
      delay: 3.7,
    });

    timeline
      .to(".home", {
        y: "-100vw",
        duration: 1,
        ease: "power4.out",
      })
      .from(
        ".project-page",
        {
          y: "100vw",
          duration: 1,
          ease: "power4.out",
        },
        "<"
      );
  }
};

export const navigateToHomePage = () => {
  console.log("navigateToHomePage");
  drawHomeGrid(true);
  if (!selectedProject) {
    document.documentElement.style.setProperty("--color-active", "#4000ff");
    const timeline = gsap.timeline();

    timeline
      .to(
        ".home",
        {
          y: "0",
          duration: 1,
          ease: "power4.out",
        },
        "0"
      )
      .to(
        ".grid_cell.home_grid_title h1.page-title",
        {
          y: "0",
          duration: 0.3,
          ease: "power3.in",
          overwrite: true,
        },
        ">"
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
        ".background",
        {
          duration: 0.2,
          opacity: 1,
          overwrite: true,
        },
        "<"
      )
      .to(
        ".background_svg_line.line_vertical:not(.not-animated)",
        {
          duration: 1,
          opacity: 1,
          attr: { y2: "100%", y1: "0%" },
          ease: "power4.out",
          overwrite: true,
        },
        "<"
      )
      .to(
        ".background_svg_line.line_horizontal:not(.not-animated)",
        {
          duration: 1,
          opacity: 1,
          attr: { x2: "100%", x1: "0%" },
          ease: "power4.out",
          overwrite: true,
        },
        "<"
      );
  }
};

export const navigateToProjectPage = () => {
  console.log("navigateToProjectPage");
  drawProjectPageGrid();
  if (selectedProject) {
    document.documentElement.style.setProperty(
      "--color-active",
      `#${selectedProject.color}`
    );
    const timeline = gsap.timeline({
      onComplete: justifyParagraphs,
    });

    timeline
      .to(".home", {
        y: "-100vw",
        duration: 1,
        ease: "power4.out",
      })
      .from(
        ".project-page",
        {
          y: "100vw",
          duration: 1,
          ease: "power4.out",
        },
        "<"
      );
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
        // .fromTo(
        //   `.grid_cell.bottom:not(.ignore-move-out) .grid_cell_container`,
        //   {
        //     y: "0",
        //   },
        //   {
        //     duration: 0.3,
        //     y: "100%",
        //     ease: "power3.in",
        //     overwrite: true,
        //   },
        //   "<"
        // )
        // .fromTo(
        //   `.grid_cell.top:not(.ignore-move-out) .grid_cell_container`,
        //   {
        //     y: "0",
        //   },
        //   {
        //     duration: 0.3,
        //     y: "-100%",
        //     ease: "power3.in",
        //     overwrite: true,
        //   },
        //   "<"
        // )
        // .fromTo(
        //   `.grid_cell.left:not(.ignore-move-out) .grid_cell_container`,
        //   {
        //     x: "0",
        //   },
        //   {
        //     duration: 0.3,
        //     x: "-100%",
        //     ease: "power3.in",
        //     overwrite: true,
        //   },
        //   "<"
        // )
        // .fromTo(
        //   `.grid_cell.right:not(.ignore-move-out) .grid_cell_container`,
        //   {
        //     x: "0",
        //   },
        //   {
        //     duration: 0.3,
        //     x: "100%",
        //     ease: "power3.in",
        //     overwrite: true,
        //   },
        //   "<"
        // )
        // .to(
        //   ".background_svg_line.line_vertical:not(.not-animated)",
        //   {
        //     duration: 1,
        //     opacity: 0,
        //     attr: { y2: "50%", y1: "50%" },
        //     ease: "power4.out",
        //     overwrite: true,
        //     // stagger: {
        //     //   each: 0.01,
        //     //   from: "start",
        //     //   ease: "power1.out",
        //     // },
        //   },
        //   "<"
        // )
        // .to(
        //   ".background_svg_line.line_horizontal:not(.not-animated)",
        //   {
        //     duration: 1,
        //     opacity: 0,
        //     attr: { x2: "50%", x1: "50%" },
        //     ease: "power4.out",
        //     overwrite: true,
        //     // stagger: {
        //     //   each: 0.01,
        //     //   from: "start",
        //     //   ease: "power1.out",
        //     // },
        //   },
        //   "<"
        // )
        .to(
          `.home_video.${project.slug}`,
          {
            duration: 0.3,
            y: "0%",
            overwrite: true,
          },
          ">"
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
          `.home_video.${project.slug}`,
          {
            duration: 0.3,
            y: "100%",
            overwrite: true,
          },
          ">"
        )
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
        );
      // .fromTo(
      //   `.grid_cell.bottom:not(.ignore-move-out) .grid_cell_container`,
      //   {
      //     y: "100%",
      //   },
      //   {
      //     duration: 0.3,
      //     y: "0",
      //     ease: "power3.in",
      //     overwrite: true,
      //   },
      //   "<"
      // )
      // .fromTo(
      //   `.grid_cell.top:not(.ignore-move-out) .grid_cell_container`,
      //   {
      //     y: "-100%",
      //   },
      //   {
      //     duration: 0.3,
      //     y: "0",
      //     ease: "power3.in",
      //     overwrite: true,
      //   },
      //   "<"
      // )
      // .fromTo(
      //   `.grid_cell.left:not(.ignore-move-out) .grid_cell_container`,
      //   {
      //     x: "-100%",
      //   },
      //   {
      //     duration: 0.3,
      //     x: "0",
      //     ease: "power3.in",
      //     overwrite: true,
      //   },
      //   "<"
      // )
      // .fromTo(
      //   `.grid_cell.right:not(.ignore-move-out) .grid_cell_container`,
      //   {
      //     x: "100%",
      //   },
      //   {
      //     duration: 0.3,
      //     x: "0",
      //     ease: "power3.in",
      //     overwrite: true,
      //   },
      //   "<"
      // )

      // .to(
      //   "#background",
      //   {
      //     duration: 0.2,
      //     opacity: 1,
      //     overwrite: true,
      //   },
      //   "<"
      // )
      // .to(
      //   ".background_svg_line.line_vertical:not(.not-animated)",
      //   {
      //     duration: 1,
      //     opacity: 1,
      //     attr: { y2: "100%", y1: "0%" },
      //     ease: "power4.out",
      //     overwrite: true,
      //     // stagger: {
      //     //   each: 0.01,
      //     //   from: "random",
      //     //   ease: "power1.out",
      //     // },
      //   },
      //   "<"
      // )
      // .to(
      //   ".background_svg_line.line_horizontal:not(.not-animated)",
      //   {
      //     duration: 1,
      //     opacity: 1,
      //     attr: { x2: "100%", x1: "0%" },
      //     ease: "power4.out",
      //     overwrite: true,
      //     // stagger: {
      //     //   each: 0.01,
      //     //   from: "random",
      //     //   ease: "power1.out",
      //     // },
      //   },
      //   "<"
      // );
      hoveringBody = undefined;
      if (previousVel) {
        flyingObject.body.setLinvel(previousVel, true);
        previousVel = undefined;
      }
    }
  }
};

export const isHomePage = () => {
  return !document.getElementById("grid-container") !== undefined;
};

export const drawProjectPageGrid = () => {
  const projectPages = document.getElementsByClassName(
    "project-page-container"
  );
  for (let projectPage of projectPages as HTMLCollectionOf<HTMLElement>) {
    if (projectPage) {
      const projectPageGrid = projectPage.querySelector(
        ".project-page_grid"
      ) as HTMLElement;
      const localTileWidth = calculateTileWidth("ProjectPage.drawGrid");
      projectPage.style.width = `${getNrOfColumns() * localTileWidth}px`;
      if (projectPageGrid) {
        projectPageGrid.style.gridTemplateColumns = `repeat(${getNrOfColumns()}, ${localTileWidth}px)`;
        projectPageGrid.style.gridTemplateRows = `repeat(${getProjectRowsPerScreenSize()}, ${localTileWidth}px)`;
      }
    }
  }

  const backgrounds = document.getElementsByClassName(
    "background_project-page"
  );

  if (backgrounds) {
    for (let background of backgrounds as HTMLCollectionOf<HTMLElement>) {
      const linesGroup = background.querySelector(
        ".background_project-page_lines-group"
      );

      if (linesGroup) {
        const localTileWidth = calculateTileWidth("ProjectPage.drawLines");
        const nrOfRows = getProjectRowsPerScreenSize();
        background.style.width = `${getNrOfColumns() * localTileWidth}px`;
        background.style.height = `${nrOfRows * localTileWidth}px`;
        linesGroup.textContent = "";

        const svgNS = "http://www.w3.org/2000/svg";

        for (let i = 0; i < getNrOfColumns() / 2 - 1; i++) {
          const line = document.createElementNS(svgNS, "line");
          const x = `${localTileWidth * 2 + localTileWidth * 2 * i}px`;
          line.classList.add("background_svg_line");
          line.classList.add("not-animated");
          line.classList.add("line_vertical");
          line.classList.add("line_main");
          line.setAttribute("height", "0");
          line.setAttribute("x1", x);
          line.setAttribute("x2", x);
          line.setAttribute("y1", "0%");
          linesGroup.appendChild(line);
          line.setAttribute("y2", "100%");
        }

        for (let i = 0; i < nrOfRows / 2 - 1; i++) {
          const line = document.createElementNS(svgNS, "line");
          const y = `${localTileWidth * 2 + localTileWidth * 2 * i}px`;
          line.classList.add("background_svg_line");
          line.classList.add("not-animated");
          line.classList.add("line_horizontal");
          line.classList.add("line_main");
          line.setAttribute("y1", y);
          line.setAttribute("y2", y);
          line.setAttribute("x1", "0");
          linesGroup.appendChild(line);
          line.setAttribute("x2", "100%");
        }

        const rect = document.createElementNS(svgNS, "rect");
        rect.classList.add("background_svg_rect");
        rect.setAttribute("x", "0");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "720");
        rect.setAttribute("fill", "url(#background-gradient)");

        linesGroup.appendChild(rect);

        const rect2 = document.createElementNS(svgNS, "rect");
        rect2.classList.add("background_svg_rect");
        rect2.setAttribute("x", "0");
        rect2.setAttribute("y", "720");
        rect2.setAttribute("width", "100%");
        rect2.setAttribute("height", "100%");
        rect2.setAttribute("fill", "#eeeeee");

        linesGroup.appendChild(rect2);

        for (let i = 0; i < getNrOfColumns() / 2; i++) {
          const line = document.createElementNS(svgNS, "line");
          const x = `${localTileWidth + localTileWidth * 2 * i}px`;
          line.classList.add("background_svg_line");
          line.classList.add("not-animated");
          line.classList.add("line_vertical");
          line.classList.add("line_sub");
          line.setAttribute("x1", x);
          line.setAttribute("x2", x);
          line.setAttribute("y1", "0");
          line.setAttribute("stroke-dasharray", "4");
          linesGroup.appendChild(line);
          line.setAttribute("y2", "100%");
        }

        for (let i = 0; i < nrOfRows / 2; i++) {
          const line = document.createElementNS(svgNS, "line");
          const y = `${localTileWidth + localTileWidth * 2 * i}px`;
          line.classList.add("background_svg_line");
          line.classList.add("not-animated");
          line.classList.add("line_horizontal");
          line.classList.add("line_sub");
          line.setAttribute("stroke-dasharray", "4");
          line.setAttribute("y1", y);
          line.setAttribute("y2", y);
          line.setAttribute("x1", "0");
          linesGroup.appendChild(line);
          line.setAttribute("x2", "100%");
        }
      }
    }
  }
};

export const drawHomeGrid = (animated: boolean) => {
  const homes = document.getElementsByClassName("home");
  const backgrounds = document.getElementsByClassName("background");

  for (let home of homes as HTMLCollectionOf<HTMLElement>) {
    const localTileWidth = calculateTileWidth("Home.handleResize");
    const nrOfRows = calculateNrOfRows(localTileWidth);
    home.style.width = `${getNrOfColumns() * localTileWidth}px`;
    home.style.height = `${nrOfRows * localTileWidth}px`;

    const homeGrid = home.querySelector(".home_grid") as HTMLElement;
    if (homeGrid) {
      const localTileWidth = calculateTileWidth("Home.drawGrid");
      const nrOfRows = calculateNrOfRows(localTileWidth);

      homeGrid.style.gridTemplateColumns = `repeat(${getNrOfColumns()}, ${localTileWidth}px)`;
      homeGrid.style.gridTemplateRows = `repeat(${nrOfRows}, ${localTileWidth}px)`;
    }
  }

  const svgNS = "http://www.w3.org/2000/svg";
  const localTileWidth = calculateTileWidth("Home.drawDots");
  const nrOfRows = calculateNrOfRows(localTileWidth);
  const nrOfColumns = getNrOfColumns();
  const dotsGroups = document.getElementsByClassName("starting-animation-dots");
  for (let dotsGroup of dotsGroups as HTMLCollectionOf<HTMLElement>) {
    dotsGroup.textContent = "";
    for (let i = 0; i < nrOfRows; i++) {
      for (let j = 0; j < nrOfColumns; j++) {
        const dot = document.createElementNS(svgNS, "circle");
        dot.classList.add("background_svg_dot");
        if (i % 2 === 0 || j % 2 === 0) {
          dot.classList.add("background_svg_dot_even");
        } else {
          dot.classList.add("background_svg_dot_odd");
        }
        dot.setAttribute("cx", `${j * localTileWidth}px`);
        dot.setAttribute("cy", `${i * localTileWidth}px`);
        dot.setAttribute("r", `0`);
        dotsGroup.appendChild(dot);
      }
    }
  }

  for (let background of backgrounds as HTMLCollectionOf<HTMLElement>) {
    const linesGroup = background.querySelector(
      ".background_home_lines-group"
    ) as HTMLElement;
    const localTileWidth = calculateTileWidth("Home.drawLines");
    const nrOfRows = calculateNrOfRows(localTileWidth);
    background.style.width = `${getNrOfColumns() * localTileWidth}px`;
    background.style.height = `${nrOfRows * localTileWidth}px`;
    linesGroup.textContent = "";
    const svgNS = "http://www.w3.org/2000/svg";

    for (let i = 0; i < getNrOfColumns() / 2 - 1; i++) {
      const line = document.createElementNS(svgNS, "line");
      const x = `${localTileWidth * 2 * (i + 1)}px`;
      line.classList.add("background_svg_line");
      line.classList.add("line_vertical");
      line.classList.add("line_main");
      line.setAttribute("height", "0");
      line.setAttribute("x1", x);
      line.setAttribute("x2", x);
      line.setAttribute("y1", "50%");
      line.setAttribute("y2", "50%");
      linesGroup.appendChild(line);
    }

    for (let i = 0; i < getNrOfColumns() / 2; i++) {
      const line = document.createElementNS(svgNS, "line");
      const x = `${localTileWidth + localTileWidth * 2 * i}px`;
      line.classList.add("background_svg_line");
      line.classList.add("line_vertical");
      line.classList.add("line_sub");
      line.setAttribute("x1", x);
      line.setAttribute("x2", x);
      line.setAttribute("y1", "50%");
      line.setAttribute("y2", "50%");
      line.setAttribute("stroke-dasharray", "4");
      linesGroup.appendChild(line);
    }

    for (let i = 0; i < nrOfRows / 2 - 1; i++) {
      const line = document.createElementNS(svgNS, "line");
      const y = `${localTileWidth * 2 * (i + 1)}px`;
      line.classList.add("background_svg_line");
      line.classList.add("line_horizontal");
      line.classList.add("line_main");
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("x1", "50%");
      line.setAttribute("x2", "50%");
      linesGroup.appendChild(line);
    }

    for (let i = 0; i < nrOfRows / 2; i++) {
      const line = document.createElementNS(svgNS, "line");
      const y = `${localTileWidth + localTileWidth * 2 * i}px`;
      line.classList.add("background_svg_line");
      line.classList.add("line_horizontal");
      line.classList.add("line_sub");
      line.setAttribute("stroke-dasharray", "4");
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("x1", "50%");
      line.setAttribute("x2", "50%");
      linesGroup.appendChild(line);
    }
  }

  if (animated) {
  } else {
  }
};
