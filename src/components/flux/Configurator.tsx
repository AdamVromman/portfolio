import { Canvas, useThree } from "@react-three/fiber";
import "../../CSS/flux.css";
import Table from "./Table";
import { useEffect, useRef, useState, type JSX } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import {
	EnumMaterial,
	EnumSelectablePart,
	EnumTableLeg,
	EnumTableLegsMaterial,
	EnumTableShape,
	EnumTableTopMaterial,
} from "./Variables";

export interface Shape {
	name: string;
}

const Configurator = () => {
	const [selectedShape, setSelectedShape] = useState<EnumTableShape>(
		EnumTableShape.RECTANGLE,
	);
	const [selectedLegs, setSelectedLegs] = useState<EnumTableLeg>(
		EnumTableLeg.ROUND,
	);

	const [selectedPartHtml, setSelectedPartHtml] = useState<JSX.Element | null>(
		null,
	);

	const [materials, setMaterials] = useState<
		Map<EnumMaterial, THREE.MeshBasicMaterial>
	>(new Map());

	const [selectedMaterialLegs, setSelectedMaterialLegs] = useState<
		EnumMaterial | undefined
	>(undefined);
	const [selectedMaterialTop, setSelectedMaterialTop] = useState<
		EnumMaterial | undefined
	>(undefined);

	const [selectedPart, setSelectedPart] = useState<EnumSelectablePart | null>(
		null,
	);

	const loadManager = new THREE.LoadingManager();
	const loader = new THREE.TextureLoader(loadManager);

	useEffect(() => {
		const materials = new Map<EnumMaterial, THREE.MeshBasicMaterial>();
		Object.values(EnumMaterial).forEach((shape) => {
			materials.set(
				shape,
				new THREE.MeshBasicMaterial({
					map: loader.load(
						`/assets/flux/${shape}.png`,
						(texture) => {
							texture.anisotropy = 16;
							texture.wrapS = THREE.RepeatWrapping;
							texture.wrapT = THREE.RepeatWrapping;
							texture.repeat.set(1, 1);
						},

						(err) => {
							console.error(`Error loading texture for ${shape}:`, err);
						},
					),
				}),
			);
		});

		setMaterials(materials);
		setSelectedMaterialLegs(EnumMaterial.DARK_WOOD);
		setSelectedMaterialTop(EnumMaterial.DARK_WOOD);
	}, []);

	return (
		<>
			<div className="absolute z-0 top-0 left-0 w-screen h-screen">
				{" "}
				<Canvas
					gl={{ antialias: true }}
					camera={{
						position: [1, 2, 4],
						fov: 50,
						near: 0.1,
						far: 20,
					}}>
					<pointLight position={[1, 1, 5]} intensity={50} />
					<Table
						setSelectedPartHtml={setSelectedPartHtml}
						materials={materials}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						selectedMaterialLegs={selectedMaterialLegs}
						selectedMaterialTop={selectedMaterialTop}
						selectedShape={selectedShape}
						setSelectedShape={setSelectedShape}
						setSelectedMaterialLegs={setSelectedMaterialLegs}
						setSelectedMaterialTop={setSelectedMaterialTop}
						selectedLegs={selectedLegs}
						setSelectedLegs={setSelectedLegs}></Table>
					<OrbitControls
						enablePan={false}
						minZoom={0.1}
						maxZoom={1}
						minAzimuthAngle={-Math.PI / 2}
						maxAzimuthAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 6}
						maxPolarAngle={Math.PI - Math.PI / 1.9}
					/>
				</Canvas>
			</div>
			<div className="absolute z-10 top-10 left-10 w-full h-full pointer-events-none">
				{selectedPartHtml ? (
					selectedPartHtml
				) : (
					<div className="select-part-text">Select a part to customize</div>
				)}
			</div>
		</>
	);
};

export default Configurator;
