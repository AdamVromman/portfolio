import { Canvas } from "@react-three/fiber";
import "../../CSS/flux.css";
import Table from "./Table";
import { useEffect, useState, type JSX } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import {
	EnumMaterial,
	EnumSelectablePart,
	EnumTableLeg,
	EnumTableShape,
} from "./Variables";

const Configurator = () => {
	// Table Top Shape
	const [selectedShape, setSelectedShape] = useState<EnumTableShape>(
		EnumTableShape.RECTANGLE,
	);

	// Table Legs Shape
	const [selectedLegs, setSelectedLegs] = useState<EnumTableLeg>(
		EnumTableLeg.ROUND,
	);

	// Html Inputs to change either the legs/top
	const [selectedPartHtml, setSelectedPartHtml] = useState<JSX.Element | null>(
		null,
	);

	// List of available materials already loaded
	const [materials, setMaterials] = useState<
		Map<EnumMaterial, THREE.MeshBasicMaterial>
	>(new Map());

	// Currently selected material for legs
	const [selectedMaterialLegs, setSelectedMaterialLegs] = useState<
		EnumMaterial | undefined
	>(undefined);

	// Currently selected material for top
	const [selectedMaterialTop, setSelectedMaterialTop] = useState<
		EnumMaterial | undefined
	>(undefined);

	// Currently selected part to customize
	const [selectedPart, setSelectedPart] = useState<EnumSelectablePart | null>(
		null,
	);

	// Texture loader
	const loadManager = new THREE.LoadingManager();
	const loader = new THREE.TextureLoader(loadManager);

	const [hideMeasurements, setHideMeasurements] = useState(false);

	// Load all textures on component mount and set default materials
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
						hideMeasurements={hideMeasurements}
						setSelectedPartHtml={(html) => setSelectedPartHtml((prev) => html)}
						materials={materials}
						selectedMaterialLegs={selectedMaterialLegs}
						setSelectedMaterialLegs={setSelectedMaterialLegs}
						selectedMaterialTop={selectedMaterialTop}
						setSelectedMaterialTop={setSelectedMaterialTop}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						selectedShape={selectedShape}
						setSelectedShape={setSelectedShape}
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
			<div className="absolute z-10 top-10 left-10 flex flex-col items-center gap-4">
				<button
					className="button"
					onClick={() => setHideMeasurements(!hideMeasurements)}>
					{hideMeasurements ? "Show Measurements" : "Hide Measurements"}
				</button>
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
