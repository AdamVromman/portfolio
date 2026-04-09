import type { JSX } from "react";
import type { Shape } from "./Configurator";
import { EnumTableLeg, EnumTableShape } from "./Variables";

interface TableLegsProps {
    selectedShape: EnumTableShape;
    selectedMaterial: string | null;
    selectedLegs: EnumTableLeg;
    setSelectedLegs: (legs: EnumTableLeg) => void;
}

const RoundTableLeg = () => {
    return <mesh>
        <cylinderGeometry args={[0.05, 0.05, 1, 32]} />
        <meshBasicMaterial color="brown" />
    </mesh>
}

const SquareTableLeg = () => {
    return <mesh>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshBasicMaterial color="brown" />
    </mesh>
}


const TableLegs = ({ selectedShape, selectedMaterial, selectedLegs, setSelectedLegs }: TableLegsProps) => {

    const calculateLegs = (): JSX.Element[] => {
        const legs: JSX.Element[] = [];
        if (selectedLegs === EnumTableLeg.ROUND) {
            // Calculate round legs
        }
        return legs;
    }


    return <group>
        {calculateLegs()}
    </group>
}


export default TableLegs