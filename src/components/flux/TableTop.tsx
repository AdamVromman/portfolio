import { useLoader } from "@react-three/fiber";
import type { Shape } from "./Configurator";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { useEffect, useState } from "react";
import { EnumSelectablePart, EnumTableShape } from "./Variables";
import { Html } from "@react-three/drei/web/Html";

interface TableTopProps {
    selectedShape: EnumTableShape;
    selectedMaterial: string | null;
    setSelectedPart: (part: EnumSelectablePart | null) => void;
    selectedPart: EnumSelectablePart | null;
    setSelectedShape: (shape: EnumTableShape) => void;
    setTableTopScaleX: (scale: number) => void;
    setTableTopScaleY: (scale: number) => void;
      setTableTopScaleZ: (scale: number) => void;
    tableTopScaleX: number;
    tableTopScaleY: number;
    tableTopScaleZ: number;
}


const TableTop = ({ selectedShape, selectedMaterial, setSelectedPart, selectedPart, setSelectedShape, setTableTopScaleX, setTableTopScaleY, setTableTopScaleZ, tableTopScaleX, tableTopScaleY, tableTopScaleZ }: TableTopProps) => {

    const createShape = () => {
const svgData = useLoader(SVGLoader, `/assets/${selectedShape}.svg`);

  const shapes = svgData.paths.flatMap((path) => path.toShapes(true));

  const localGeometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: false,
  });

  return localGeometry;
    }

    const [geometry, setGeometry] = useState<THREE.ExtrudeGeometry>(createShape());

    
   

  useEffect(() => {

    const localGeometry = createShape();
 
  localGeometry.center();

    setGeometry(localGeometry);


  }, [selectedShape]);

  const getEdgeGeometry = () => {
    const edgeGeometry = new THREE.EdgesGeometry(geometry, 15);

    const lines = new THREE.LineSegments(edgeGeometry, new THREE.LineBasicMaterial({ color: "red" }));

    return lines.geometry ;
  }

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
     {
 selectedPart === EnumSelectablePart.TABLETOP && (
    <Html position={[1,1,1]}>
        <div className="flex flex-col">{
            Object.values(EnumTableShape).map((shape) => <button key={shape} onClick={() => setSelectedShape(shape)}>{shape}</button>)
        }</div>
        
        
          <div><input type="range" min="1" max="3" defaultValue={1} step={0.01} onChange={(e) => {
            e.preventDefault();
            setTableTopScaleX(parseFloat(e.target.value))}} />
            <input type="range" min="1" max="3" defaultValue={1} step={0.01} onChange={(e) => {
            e.preventDefault();
            setTableTopScaleY(parseFloat(e.target.value))}} />
            <input type="range" min="1" max="3" defaultValue={1} step={0.01} onChange={(e) => {
            e.preventDefault();
            setTableTopScaleZ(parseFloat(e.target.value))}} />
            </div>
        
        
    </Html>
 )
    }
    <mesh scale={[tableTopScaleX, tableTopScaleY, tableTopScaleZ]}  onClick={() => {
      console.log(selectedPart)
      setSelectedPart(selectedPart === EnumSelectablePart.TABLETOP ? null : EnumSelectablePart.TABLETOP)}} castShadow receiveShadow geometry={geometry}>
      <meshBasicMaterial color={selectedMaterial || "gray"} />
    </mesh>
    {
        selectedPart === EnumSelectablePart.TABLETOP && (
            <lineSegments scale={[tableTopScaleX, tableTopScaleY, tableTopScaleZ]} geometry={getEdgeGeometry()}>
                <lineBasicMaterial linewidth={100} color="red" />
            </lineSegments>
        )
    }
    </group>

  );
}

export default TableTop