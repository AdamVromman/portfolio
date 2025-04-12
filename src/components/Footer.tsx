import { useEffect, useRef } from "react";
import "../CSS/footer.css";
import {
  calculateNrOfRows,
  calculateTileWidth,
  getNrOfColumns,
} from "../assets/Constants";
import Background from "./Background";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const drawGrid = () => {
    if (footerRef.current) {
      const localTileWidth = calculateTileWidth(footerRef.current);
      const NR_OF_ROWS = 4;
      footerRef.current.style.height = `${NR_OF_ROWS * localTileWidth}px`;
      footerRef.current.style.gridTemplateColumns = `repeat(${getNrOfColumns()}, 1fr)`;
      footerRef.current.style.gridTemplateRows = `repeat(${NR_OF_ROWS}, 1fr)`;
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

  return (
    <footer ref={footerRef} id="footer">
      <Background />
    </footer>
  );
};

export default Footer;
