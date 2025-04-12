import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import "../CSS/background.css";
import gsap from "gsap";
import {
  calculateNrOfRows,
  calculateTileWidth,
  getNrOfColumns,
} from "../assets/Constants";
import BouncingIcon from "./BouncingIcon";

const Background = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const backgroundSVGRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      timelineRef.current = gsap.timeline();
    },
    { scope: backgroundSVGRef }
  );

  const drawLines = contextSafe((animated: boolean = false) => {
    if (backgroundSVGRef.current && backgroundRef.current) {
      backgroundSVGRef.current.textContent = "";
      const localTileWidth = calculateTileWidth(backgroundRef.current);
      const NR_OF_ROWS = calculateNrOfRows(localTileWidth);
      const svgNS = "http://www.w3.org/2000/svg";

      for (let i = 0; i < getNrOfColumns() + 1; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_vertical");
        line.classList.add("line_main");
        line.setAttribute("height", "0");
        line.setAttribute("width", "2px");
        line.setAttribute(
          "x",
          `${localTileWidth * i - (2 / (getNrOfColumns() + 1)) * i}px`
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

      for (let i = 0; i < getNrOfColumns(); i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_vertical");
        line.classList.add("line_sub");
        line.setAttribute("height", "0");
        line.setAttribute("width", "0.5px");
        line.setAttribute(
          "x",
          `${
            localTileWidth / 2 + localTileWidth * i - (1 / getNrOfColumns()) * i
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
    if (backgroundRef.current) {
      backgroundRef.current.style.height = `${
        calculateNrOfRows(calculateTileWidth(backgroundRef.current)) *
        calculateTileWidth(backgroundRef.current)
      }px`;
    }
    drawLines();
  };

  // const sizeImages = () => {
  //   const images = document.querySelectorAll(".background_bouncing-icons img");
  //   images.forEach((image) => {
  //     const tileWidth = calculateTileWidth(backgroundRef.current);
  //     image.setAttribute("width", `${tileWidth}px`);
  //     image.setAttribute("height", `${tileWidth}px`);
  //   });
  // };

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.height = `${
        calculateNrOfRows(calculateTileWidth(backgroundRef.current)) *
        calculateTileWidth(backgroundRef.current)
      }px`;
    }

    drawLines(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={backgroundRef} id="background">
      <svg ref={backgroundSVGRef} id="background_svg"></svg>
      {/* <div className="background_bouncing-icons">
        <BouncingIcon>
          <img
            width={calculateTileWidth(backgroundRef.current)}
            src="train-world-logo.svg"
            alt="Train World Logo"
          />
        </BouncingIcon>
      </div> */}
    </div>
  );
};

export default Background;
