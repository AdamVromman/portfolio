import { useLoader } from "@react-three/fiber";
import type { Shape } from "./Configurator";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { useEffect, useState } from "react";

interface TableTopProps {
    selectedShape: Shape;
    selectedMaterial: string | null;
}


const TableTop = ({ selectedShape, selectedMaterial }: TableTopProps) => {

    const createShape = () => {
const svgData = useLoader(SVGLoader, `/assets/${selectedShape.name}.svg`);

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

  return (
    <mesh castShadow receiveShadow geometry={geometry} scale={0.5}>
      <meshBasicMaterial color={selectedMaterial || "gray"} />
    </mesh>
  );
}

export default TableTop