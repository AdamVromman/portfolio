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
}


const TableTop = ({ selectedShape, selectedMaterial, setSelectedPart, selectedPart, setSelectedShape }: TableTopProps) => {

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
    <>
     {
 selectedPart === EnumSelectablePart.TABLETOP && (
    <Html>
        <div className="flex flex-col">{
            Object.values(EnumTableShape).map((shape) => <button key={shape} onClick={() => setSelectedShape(shape)}>{shape}</button>)
        }</div>
        
    </Html>
 )
    }
    <mesh onClick={() => setSelectedPart(selectedPart === EnumSelectablePart.TABLETOP ? null : EnumSelectablePart.TABLETOP)} castShadow receiveShadow geometry={geometry} scale={0.5}>
      <meshBasicMaterial color={selectedMaterial || "gray"} />
    </mesh>
    {
        selectedPart === EnumSelectablePart.TABLETOP && (
            <lineSegments geometry={getEdgeGeometry()} scale={0.502}>
                <lineBasicMaterial linewidth={100} color="red" />
            </lineSegments>
        )
    }
    </>

  );
}

export default TableTop