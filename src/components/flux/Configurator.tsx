import { Canvas } from '@react-three/fiber'
import "../../CSS/flux.css";
import Table from './Table';
import { useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'
import { SHAPES } from './Variables';

export interface Shape {
    name: string;
}




const Configurator = () => {

 const [selectedShape, setSelectedShape] = useState<Shape>(SHAPES[0]);
 const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

    return (
        <div className='absolute top-0 left-0 w-screen h-screen'> <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 6], fov: 25, near: 1, far: 20 }}>
            <pointLight position={[1, 1, 1]} intensity={1} />
            <Table selectedMaterial={selectedMaterial} selectedShape={selectedShape} setSelectedShape={setSelectedShape} setSelectedMaterial={setSelectedMaterial}></Table><OrbitControls /></Canvas></div>
        
    )
}

export default Configurator