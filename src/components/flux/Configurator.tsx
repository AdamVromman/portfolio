import { Canvas } from '@react-three/fiber'
import "../../CSS/flux.css";
import Table from './Table';
import { useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'
import { EnumSelectablePart, EnumTableLeg, EnumTableShape } from './Variables';
import TableLegs from './TableLegs';

export interface Shape {
    name: string;
}




const Configurator = () => {

 const [selectedShape, setSelectedShape] = useState<EnumTableShape>(EnumTableShape.RECTANGLE);
 const [selectedLegs, setSelectedLegs] = useState<EnumTableLeg>(EnumTableLeg.ROUND);

 const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

 const [selectedPart, setSelectedPart] = useState<EnumSelectablePart | null>(null);

    return (
        <div className='absolute top-0 left-0 w-screen h-screen'> <Canvas gl={{ antialias: true }} camera={{ position: [1, 2, 4], fov: 50, near: 0.1, far: 20 }}>
            <pointLight position={[1, 1, 5]} intensity={50} />
            <Table selectedPart={selectedPart} setSelectedPart={setSelectedPart} selectedMaterial={selectedMaterial} selectedShape={selectedShape} setSelectedShape={setSelectedShape} setSelectedMaterial={setSelectedMaterial} selectedLegs={selectedLegs} setSelectedLegs={setSelectedLegs}></Table><OrbitControls /></Canvas></div>
        
    )
}

export default Configurator