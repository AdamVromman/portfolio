import { useEffect, useState, type JSX } from "react";
import { EnumSelectablePart, EnumTableLeg, EnumTableShape } from "./Variables";
import * as THREE from 'three';

interface TableLegsProps {
    selectedShape: EnumTableShape;
    selectedMaterial: string | null;
    selectedLegs: EnumTableLeg;
    setSelectedLegs: (legs: EnumTableLeg) => void;
    setSelectedPart: (part: EnumSelectablePart | null) => void;
    selectedPart: EnumSelectablePart | null;
    tableTopScaleX: number;
    tableTopScaleY: number;
    tableTopScaleZ: number;
}

const RoundTableLeg = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);


const SquareTableLeg = new THREE.BoxGeometry(0.1, 1, 0.1);


const TableLegs = ({ selectedShape, selectedMaterial, selectedLegs, setSelectedLegs, setSelectedPart, selectedPart, tableTopScaleX, tableTopScaleY, tableTopScaleZ }: TableLegsProps) => {

    const clickLeg = () => {
        console.log("clicked leg")
        setSelectedPart(selectedPart === EnumSelectablePart.TABLELEGS ? null : EnumSelectablePart.TABLELEGS);
       
    }

    const calculateLegs = (): JSX.Element[] => {
        const legs: JSX.Element[] = [];
        const geometry = selectedLegs === EnumTableLeg.ROUND ? RoundTableLeg : SquareTableLeg
        const edgeGeometry = new THREE.EdgesGeometry(geometry, 0.1);
        const leg = <mesh onClick={clickLeg} geometry={geometry}>
            <meshBasicMaterial color={selectedMaterial || "gray"} />
        </mesh>

        const legSelected = <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial linewidth={100} color="red" />
            </lineSegments>
        if (selectedShape === EnumTableShape.RECTANGLE) {
            // Calculate round legs
            legs.push(<group  key="leg1" position={[-0.45, -0.5, -0.45]}>
                {leg}
                {selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
            </group>);
            legs.push(<group key="leg2" position={[0.45, -0.5, -0.45]}>
                {leg}
                {selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
            </group>);
            legs.push(<group key="leg3" position={[-0.45, -0.5, 0.45]}>
                {leg}
                {selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
            </group>);
            legs.push(<group key="leg4" position={[0.45, -0.5, 0.45]}>
                {leg}
                {selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
            </group>);
        }
        return legs;
    }

    const [legs, setLegs] = useState<JSX.Element[]>(calculateLegs());

    

    useEffect(() => {

        console.log("recalculating legs")

        setLegs((prev) => calculateLegs());

    }, [selectedPart]);

    return <group>
        {legs}
    </group>
}


export default TableLegs