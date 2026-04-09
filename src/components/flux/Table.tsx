import { Html } from "@react-three/drei";
import type { Shape } from "./Configurator";
import TableLegs from "./TableLegs";
import TableTop from "./TableTop";
import { EnumSelectablePart, EnumTableLeg, EnumTableShape } from "./Variables";

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
  return <group>
    <TableTop selectedPart={selectedPart} setSelectedShape={setSelectedShape} setSelectedPart={setSelectedPart} selectedShape={selectedShape} selectedMaterial={selectedMaterial}></TableTop>
    <TableLegs selectedShape={selectedShape} selectedMaterial={selectedMaterial} selectedLegs={selectedLegs} setSelectedLegs={setSelectedLegs   }></TableLegs>
  </group>

}

export default Table