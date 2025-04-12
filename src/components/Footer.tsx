import { useEffect, useRef } from "react";
import "../CSS/footer.css";
import {
  calculateTileWidth,
  getNrOfColumns,
  getScreenWidth,
} from "../assets/Constants";
import Background from "./Background";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const drawGrid = () => {
    if (footerRef.current) {
      const localTileWidth = calculateTileWidth(footerRef.current);
      footerRef.current.style.height = `${getRows() * localTileWidth}px`;
      footerRef.current.style.gridTemplateColumns = `repeat(${getNrOfColumns()}, 1fr)`;
      footerRef.current.style.gridTemplateRows = `repeat(${getRows()}, 1fr)`;
    }
  };

  const handleResize = () => {
    drawGrid();
  };

  useEffect(() => {
    drawGrid();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getRows = () => {
    const width = getScreenWidth();
    if (width >= 1280) {
      return 3;
    }
    if (width >= 1024) {
      return 4;
    }
    if (width >= 768) {
      return 5;
    }
    if (width >= 480) {
      return 6;
    }
    return 7;
  };

  return (
    <footer ref={footerRef} id="footer">
      <Background nrOfRows={getRows()} />
    </footer>
  );
};

export default Footer;
