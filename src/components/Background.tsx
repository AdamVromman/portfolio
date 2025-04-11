import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import "../CSS/background.css";
import gsap from "gsap";
import { NR_OF_COLUMNS } from "../assets/Constants";

const Background = () => {
  const backgroundSVGRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      timelineRef.current = gsap.timeline();
    },
    { scope: backgroundSVGRef }
  );

  const calculateTileWidth = () => {
    if (backgroundSVGRef.current) {
      const localTileWidth =
        backgroundSVGRef.current.clientWidth / NR_OF_COLUMNS;
      return localTileWidth;
    }
    return 0;
  };

  const drawLines = contextSafe((animated: boolean = false) => {
    if (backgroundSVGRef.current) {
      backgroundSVGRef.current.textContent = "";
      const localTileWidth = calculateTileWidth();
      const NR_OF_ROWS = Math.floor((window.innerHeight - 30) / localTileWidth);
      backgroundSVGRef.current.setAttribute(
        "height",
        `${NR_OF_ROWS * localTileWidth}px`
      );
      const svgNS = "http://www.w3.org/2000/svg";

      for (let i = 0; i < NR_OF_COLUMNS + 1; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_vertical");
        line.classList.add("line_main");
        line.setAttribute("height", "0");
        line.setAttribute("width", "2px");
        line.setAttribute(
          "x",
          `${localTileWidth * i - (2 / (NR_OF_COLUMNS + 1)) * i}px`
        );
        line.setAttribute("y", "0");
        backgroundSVGRef.current.appendChild(line);
        if (animated) {
          timelineRef.current?.to(
            line,
            {
              duration: 1,
              attr: { height: "100%" },
              ease: "power4.out",
            },
            "<0.01"
          );
        } else {
          line.setAttribute("height", "100%");
        }
      }

      for (let i = 0; i < NR_OF_COLUMNS; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_vertical");
        line.classList.add("line_sub");
        line.setAttribute("height", "0");
        line.setAttribute("width", "0.5px");
        line.setAttribute(
          "x",
          `${
            localTileWidth / 2 + localTileWidth * i - (1 / NR_OF_COLUMNS) * i
          }px`
        );
        line.setAttribute("y", "0");
        backgroundSVGRef.current.appendChild(line);
        if (animated) {
          timelineRef.current?.to(
            line,
            {
              duration: 1,
              attr: { height: "100%" },
              ease: "power4.out",
            },
            "<0.01"
          );
        } else line.setAttribute("height", "100%");
      }

      for (let i = 0; i < NR_OF_ROWS + 1; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_horizontal");
        line.classList.add("line_main");
        line.setAttribute("width", "0");
        line.setAttribute("height", "2px");
        line.setAttribute(
          "y",
          `${localTileWidth * i - (2 / (NR_OF_ROWS + 1)) * i}px`
        );
        line.setAttribute("x", "0");
        backgroundSVGRef.current.appendChild(line);
        if (animated) {
          timelineRef.current?.to(
            line,
            {
              duration: 1,
              attr: { width: "100%" },
              ease: "power4.out",
            },
            "<0.01"
          );
        } else line.setAttribute("width", "100%");
      }

      for (let i = 0; i < NR_OF_ROWS; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_horizontal");
        line.classList.add("line_sub");
        line.setAttribute("width", "0");
        line.setAttribute("height", "0.5px");
        line.setAttribute(
          "y",
          `${localTileWidth / 2 + localTileWidth * i - (1 / NR_OF_ROWS) * i}px`
        );
        line.setAttribute("x", "0");
        backgroundSVGRef.current.appendChild(line);
        if (animated) {
          timelineRef.current?.to(
            line,
            {
              duration: 1,
              attr: { width: "100%" },
              ease: "power4.out",
            },
            "<0.01"
          );
        } else line.setAttribute("width", "100%");
      }
    }
  });

  const onResize = () => {
    calculateTileWidth();
    drawLines();
  };

  useEffect(() => {
    calculateTileWidth();
    drawLines(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div id="background">
      <svg ref={backgroundSVGRef} id="background_svg"></svg>
    </div>
  );
};

export default Background;
