import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import "../CSS/background.css";
import gsap from "gsap";
import { calculateTileWidth, getNrOfColumns } from "../assets/Constants";

interface BackgroundProps {
  nrOfRows: number;
}

const Background = ({ nrOfRows }: BackgroundProps) => {
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

      for (let i = 0; i < nrOfRows + 1; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_horizontal");
        line.classList.add("line_main");
        line.setAttribute("width", "0");
        line.setAttribute("height", "2px");
        line.setAttribute(
          "y",
          `${localTileWidth * i - (2 / (nrOfRows + 1)) * i}px`
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

      for (let i = 0; i < nrOfRows; i++) {
        const line = document.createElementNS(svgNS, "rect");
        line.classList.add("background_svg_line");
        line.classList.add("line_horizontal");
        line.classList.add("line_sub");
        line.setAttribute("width", "0");
        line.setAttribute("height", "0.5px");
        line.setAttribute(
          "y",
          `${localTileWidth / 2 + localTileWidth * i - (1 / nrOfRows) * i}px`
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
    drawLines();
  };

  useEffect(() => {
    drawLines(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [nrOfRows]);

  return (
    <div ref={backgroundRef} id="background">
      <svg ref={backgroundSVGRef} id="background_svg"></svg>
    </div>
  );
};

export default Background;
