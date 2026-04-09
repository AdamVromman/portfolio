import { useState } from "react";
import TableLegs from "./TableLegs";
import TableTop from "./TableTop";
import { EnumSelectablePart, EnumTableLeg, EnumTableShape } from "./Variables";
import { Html } from "@react-three/drei";

interface TableProps {
    selectedShape: EnumTableShape;
    selectedMaterial: string | null;
    setSelectedShape: (shape: EnumTableShape) => void;
    setSelectedMaterial: (material: string | null) => void;
    setSelectedPart: (part: EnumSelectablePart | null) => void;
    selectedPart: EnumSelectablePart | null;
    selectedLegs: EnumTableLeg;
    setSelectedLegs: (legs: EnumTableLeg) => void;
}

const Table = ({ selectedShape, selectedMaterial, setSelectedShape, setSelectedMaterial, setSelectedPart, selectedPart, selectedLegs, setSelectedLegs }: TableProps) => {

  const [tableTopScaleX, setTableTopScaleX] = useState(1);
  const [tableTopScaleY, setTableTopScaleY] = useState(1);
  const [tableTopScaleZ, setTableTopScaleZ] = useState(1);


  return <group>
    <Html>{selectedPart}</Html>
    <TableTop selectedPart={selectedPart} setSelectedShape={setSelectedShape} setSelectedPart={setSelectedPart} selectedShape={selectedShape} selectedMaterial={selectedMaterial} setTableTopScaleX={setTableTopScaleX} setTableTopScaleY={setTableTopScaleY} setTableTopScaleZ={setTableTopScaleZ} tableTopScaleX={tableTopScaleX} tableTopScaleY={tableTopScaleY} tableTopScaleZ={tableTopScaleZ}></TableTop>
    <TableLegs  selectedShape={selectedShape} selectedMaterial={selectedMaterial} selectedLegs={selectedLegs} setSelectedLegs={setSelectedLegs   } setSelectedPart={setSelectedPart} selectedPart={selectedPart} tableTopScaleX={tableTopScaleX} tableTopScaleY={tableTopScaleY} tableTopScaleZ={tableTopScaleZ}></TableLegs>
  </group>

}

export default Table