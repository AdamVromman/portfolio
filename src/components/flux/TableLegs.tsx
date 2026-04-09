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
    tableTopDepth: number;
    tableTopWidth: number;
    tableTopHeight: number;
}


const TableLegs = ({ selectedShape, selectedMaterial, selectedLegs, setSelectedLegs, setSelectedPart, selectedPart, tableTopDepth, tableTopWidth, tableTopHeight }: TableLegsProps) => {

        const [legHeight, setLegHeight] = useState(1);

        const getLegGeometry = () => {
            if (selectedLegs === EnumTableLeg.ROUND) {
                return new THREE.CylinderGeometry(0.05, 0.02, legHeight, 16);
            } else {
                return new THREE.BoxGeometry(0.1, legHeight, 0.1);
            }
        }

    const clickLeg = () => {
        console.log("clicked leg")
        setSelectedPart(selectedPart === EnumSelectablePart.TABLELEGS ? null : EnumSelectablePart.TABLELEGS);
       
    }

    const calculateLegs = (): JSX.Element[] => {
        const legs: JSX.Element[] = [];
        const geometry = getLegGeometry();
        const edgeGeometry = new THREE.EdgesGeometry(geometry, 0.1);
        const leg = <mesh onClick={clickLeg} geometry={geometry}>
            <meshBasicMaterial color={selectedMaterial || "gray"} />
        </mesh>

        const legSelected = <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial linewidth={100} color="red" />
            </lineSegments>
        if (selectedShape === EnumTableShape.RECTANGLE) {
            const amountOfLegs = 4 + (2 * Math.floor(tableTopDepth / 3));
                for (let i = 0; i < amountOfLegs; i++) {

                    const even = i % 2 ? -1 : 1;
                    const positionX = even * (tableTopWidth / 2 - 0.1)
                    const positionY = -legHeight / 2 - (tableTopHeight / 2);
                    const positionZ = -(tableTopDepth / 2 - 0.1) + (Math.floor(i / 2) * (tableTopDepth - 0.2) / Math.floor((amountOfLegs - 2) / 2));
            legs.push(<group  key={`leg-${i}`} position={[positionX, positionY, positionZ]}>
                {leg}
                {selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
            </group>);
                }
  
            
        } else if (selectedShape === EnumTableShape.CIRCLE) {
            const amountOfLegs = 4 + 2 *  Math.floor(tableTopWidth / 2);
            for (let i = 0; i < amountOfLegs; i++) {
                const angle = (i / amountOfLegs) * Math.PI * 2;
                const positionX = Math.cos(angle) * (tableTopWidth - 0.1);
                const positionY = -legHeight / 2 - (tableTopHeight / 2);
                const positionZ = Math.sin(angle) * (tableTopWidth - 0.1);
                legs.push(<group key={`leg-${i}`} position={[positionX, positionY, positionZ]}>
                    {leg}
                    {selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
                </group>);
            }
        }
        return legs;
    }

    const [legs, setLegs] = useState<JSX.Element[]>(calculateLegs());

    

    useEffect(() => {

        console.log("recalculating legs")

        setLegs((prev) => calculateLegs());

    }, [selectedPart, selectedLegs, tableTopDepth, tableTopWidth, tableTopHeight, selectedShape]);

    return <group>
        {legs}
    </group>
}


export default TableLegs