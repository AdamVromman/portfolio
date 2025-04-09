import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import "../CSS/background.css";
import gsap from "gsap";
import { LineDirection, LineType } from "../assets/Constants";

const Background = () => {
  const NR_OF_COLUMNS = 15;

  const backgroundSVGRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useGSAP(
    () => {
      timelineRef.current = gsap.timeline();
    },
    { scope: backgroundSVGRef }
  );

  const [tileWidth, setTileWidth] = useState(0);

  const calculateTileWidth = () => {
    if (backgroundSVGRef.current) {
      const localTileWidth =
        backgroundSVGRef.current.clientWidth / (NR_OF_COLUMNS + 1);
      setTileWidth(localTileWidth);
      console.log("Tile Width: ", localTileWidth);
      return localTileWidth;
    }
    return 0;
  };

  const drawBackground = () => {
    if (backgroundSVGRef.current) {
      backgroundSVGRef.current.textContent = "";

      drawLines(LineDirection.VERTICAL, LineType.MAIN);
      drawLines(LineDirection.HORIZONTAL, LineType.MAIN);
      drawLines(LineDirection.VERTICAL, LineType.SUB);
      drawLines(LineDirection.HORIZONTAL, LineType.SUB);
    }
  };

  const drawLines = (lineDirection: LineDirection, lineType: LineType) => {
    if (backgroundSVGRef.current) {
      const heightOrWidth =
        lineDirection === LineDirection.VERTICAL ? "width" : "height";
      const localTileWidth = calculateTileWidth();
      const width = backgroundSVGRef.current.clientWidth;
      const height = backgroundSVGRef.current.clientHeight;
      const svgNS = "http://www.w3.org/2000/svg";

      const mainLine = document.createElementNS(svgNS, "rect");
      mainLine.classList.add("background_svg_line");

      if (lineDirection === LineDirection.VERTICAL) {
        mainLine.classList.add("line_vertical");
        mainLine.setAttribute("y", "0");
        mainLine.setAttribute("height", "0");
      } else {
        mainLine.classList.add("line_horizontal");
        mainLine.setAttribute("x", "0");
        mainLine.setAttribute("width", "0");
      }

      if (lineType === LineType.MAIN) {
        mainLine.classList.add("line_main");
        mainLine.setAttribute(heightOrWidth, "2px");
      } else if (lineType === LineType.SUB) {
        mainLine.classList.add("line_sub");
        mainLine.setAttribute(heightOrWidth, "1px");
      }

      for (
        let i = 0;
        i < NR_OF_COLUMNS + (lineType === LineType.MAIN ? 0 : 1);
        i++
      ) {
        const line = mainLine.cloneNode() as SVGElement;
        line.setAttribute(
          lineDirection === LineDirection.VERTICAL ? "x" : "y",
          `${
            localTileWidth / (lineType === LineType.MAIN ? 1 : 2) +
            localTileWidth * i
          }px`
        );
        line.setAttribute(
          lineDirection === LineDirection.VERTICAL ? "y" : "x",
          "0"
        );
        backgroundSVGRef.current.appendChild(line);
        gsap.to(line, {
          duration: 1,
          attr:
            lineDirection === LineDirection.VERTICAL
              ? { height: "100%" }
              : { width: "100%" },
          delay: 0.05 * i,
          ease: "power4.out",
        });
      }
    }
  };

  useEffect(() => {
    calculateTileWidth();
    drawBackground();
    window.addEventListener("resize", () => {
      calculateTileWidth();
      drawBackground();
    });

    return () => {
      window.removeEventListener("resize", calculateTileWidth);
    };
  }, []);

  return (
    <div id="background">
      <svg ref={backgroundSVGRef} id="background_svg"></svg>
    </div>
  );
};

export default Background;
