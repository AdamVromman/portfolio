import { Html } from "@react-three/drei";
import type { Shape } from "./Configurator";
import TableLegs from "./TableLegs";
import TableTop from "./TableTop";
import { SHAPES } from "./Variables";

interface TableProps {
    selectedShape: Shape;
    selectedMaterial: string | null;
    setSelectedShape: (shape: Shape) => void;
    setSelectedMaterial: (material: string | null) => void;
}

const Table = ({ selectedShape, selectedMaterial, setSelectedShape, setSelectedMaterial }: TableProps) => {
  return <group>
    <Html>
        <div className="flex flex-col">{
            SHAPES.map((shape) => <button key={shape.name} onClick={() => setSelectedShape(shape)}>{shape.name}</button>)
        }</div>
        
    </Html>
    <TableTop selectedShape={selectedShape} selectedMaterial={selectedMaterial}></TableTop>
    <TableLegs selectedShape={selectedShape} selectedMaterial={selectedMaterial}></TableLegs>
  </group>

}

export default Table