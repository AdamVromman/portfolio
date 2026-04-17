import { useEffect, useState, type JSX } from "react";
import {
	EnumMaterial,
	EnumSelectablePart,
	EnumTableLeg,
	EnumTableLegsMaterial,
	EnumTableShape,
} from "./Variables";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { pointsToGeometry } from "./Functions";

interface TableLegsProps {
	selectedShape: EnumTableShape;
	selectedMaterial: EnumMaterial | undefined;
	setSelectedMaterialLegs: (
		material: EnumTableLegsMaterial | undefined,
	) => void;
	selectedLegs: EnumTableLeg;
	setSelectedLegs: (legs: EnumTableLeg) => void;
	setSelectedPart: (part: EnumSelectablePart | null) => void;
	selectedPart: EnumSelectablePart | null;
	tableTopDepth: number;
	tableTopWidth: number;
	tableTopHeight: number;
	tableTopStarSize: number;
	tableTopStarAngle: number;
	tableTopStarPoints: number;
	materials: Map<EnumMaterial, THREE.MeshBasicMaterial>;
	setSelectedPartHtml: (html: JSX.Element | null) => void;
	hideMeasurements: boolean;
}

const TableLegs = ({
	selectedShape,
	selectedMaterial,
	selectedLegs,
	setSelectedLegs,
	setSelectedPart,
	selectedPart,
	tableTopDepth,
	tableTopWidth,
	tableTopHeight,
	tableTopStarSize,
	tableTopStarAngle,
	tableTopStarPoints,
	setSelectedMaterialLegs,
	materials,
	setSelectedPartHtml,
	hideMeasurements,
}: TableLegsProps) => {
	const [legHeight, setLegHeight] = useState(1);

	const getLegGeometry = () => {
		if (selectedLegs === EnumTableLeg.ROUND) {
			return new THREE.CylinderGeometry(0.05, 0.02, legHeight, 16);
		} else {
			return new THREE.BoxGeometry(0.05, legHeight, 0.05);
		}
	};

	const clickLeg = () => {
		setSelectedPartHtml(configHtml);
		setSelectedPart(
			selectedPart === EnumSelectablePart.TABLELEGS
				? null
				: EnumSelectablePart.TABLELEGS,
		);
	};

	const calculateLegs = (): JSX.Element[] => {
		const legs: JSX.Element[] = [];
		const geometry = getLegGeometry();
		const edgeGeometry = new THREE.EdgesGeometry(geometry, 0.1);
		const leg = (
			<mesh
				onClick={clickLeg}
				geometry={geometry}
				material={
					materials.get(selectedMaterial as EnumMaterial) ??
					new THREE.MeshBasicMaterial()
				}></mesh>
		);

		const legSelected = (
			<lineSegments geometry={edgeGeometry}>
				<lineBasicMaterial linewidth={100} color="#05df72" />
			</lineSegments>
		);

		switch (selectedShape) {
			case EnumTableShape.RECTANGLE:
				const amountOfLegs = 4 + 2 * Math.floor(tableTopDepth / 3);
				for (let i = 0; i < amountOfLegs; i++) {
					const even = i % 2 ? -1 : 1;
					const positionX = even * (tableTopWidth / 2 - 0.1);
					const positionY = -legHeight / 2 - tableTopHeight / 2;
					const positionZ =
						-(tableTopDepth / 2 - 0.1) +
						(Math.floor(i / 2) * (tableTopDepth - 0.2)) /
							Math.floor((amountOfLegs - 2) / 2);
					legs.push(
						<group
							key={`leg-${i}`}
							position={[positionX, positionY, positionZ]}>
							{leg}
							{selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
						</group>,
					);
				}
				break;
			case EnumTableShape.CIRCLE:
				const amountOfLegs2 = 4 + 2 * Math.floor(tableTopWidth / 2);
				for (let i = 0; i < amountOfLegs2; i++) {
					const angle = (i / amountOfLegs2) * Math.PI * 2;
					const positionX = Math.cos(angle) * (tableTopWidth - 0.1);
					const positionY = -legHeight / 2 - tableTopHeight / 2;
					const positionZ = Math.sin(angle) * (tableTopWidth - 0.1);
					legs.push(
						<group
							key={`leg-${i}`}
							position={[positionX, positionY, positionZ]}>
							{leg}
							{selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
						</group>,
					);
				}
				break;
			case EnumTableShape.STAR:
				const amountOfLegs3 = tableTopStarPoints * 2;
				for (let i = 0; i < amountOfLegs3; i += 2) {
					const angle = ((i + 1) / amountOfLegs3) * Math.PI * 2;
					const radius = tableTopStarSize - (0.2 + tableTopStarSize / 10);
					const positionX = Math.cos(angle) * radius;
					const positionY = -legHeight / 2 - tableTopHeight / 2;
					const positionZ = Math.sin(angle) * radius;
					legs.push(
						<group
							key={`leg-${i}`}
							position={[positionX, positionY, positionZ]}>
							{leg}
							{selectedPart === EnumSelectablePart.TABLELEGS && legSelected}
						</group>,
					);
				}
				break;
		}
		return legs;
	};

	const [legs, setLegs] = useState<JSX.Element[]>(calculateLegs());

	useEffect(() => {
		setLegs((prev) => calculateLegs());
	}, [
		selectedPart,
		selectedLegs,
		tableTopDepth,
		tableTopWidth,
		tableTopHeight,
		selectedShape,
		tableTopStarSize,
		tableTopStarAngle,
		tableTopStarPoints,
		selectedMaterial,
		legHeight,
	]);

	const shapeEnumToSvg = (shape: EnumTableLeg): JSX.Element => {
		switch (shape) {
			case EnumTableLeg.SQUARE:
				return <rect x="17.5" y="17.5" width="15" height="15" />;
			case EnumTableLeg.ROUND:
				return <circle cx="25" cy="25" r="10" />;
			default:
				return <rect x="15" y="15" width="25" height="25" />;
		}
	};

	useEffect(() => {
		setSelectedPartHtml(configHtml);
	}, [selectedMaterial, selectedLegs]);

	const configHtml = (
		<div className="table-config">
			<h3>Table Legs</h3>
			<h2>Shape</h2>
			<div className="flex flex-row gap-4">
				{Object.values(EnumTableLeg).map((shape) => (
					<button
						className={`shape-option ${selectedLegs === shape ? "selected" : ""}`}
						key={shape}
						onClick={() => setSelectedLegs(shape)}>
						<div className="shape-option-svg">
							<svg
								fill={selectedLegs === shape ? "#05df72" : "none"}
								stroke="#05df72"
								viewBox="0 0 50 50"
								width="50"
								height="50">
								{shapeEnumToSvg(shape)}
							</svg>
						</div>
						<span className="shape-option-text">{shape}</span>
					</button>
				))}
			</div>
			<h2>Shape options</h2>
			<div className="flex flex-col gap-2">
				{" "}
				<div className="flex flex-col">
					<label>Height: </label>
					<input
						type="range"
						min="1"
						max="1.2"
						defaultValue={legHeight}
						step={0.01}
						onChange={(e) => {
							setLegHeight(parseFloat(e.target.value));
						}}
					/>
				</div>
			</div>
			<h2>Material</h2>
			<div className="flex flex-row gap-4">
				{Object.values(EnumTableLegsMaterial).map((material) => (
					<button
						className={`shape-option ${selectedMaterial && selectedMaterial.toString() === material ? "selected" : ""}`}
						key={material}
						onClick={() => setSelectedMaterialLegs(material)}>
						<div className="shape-option-svg">
							<img
								src={`/assets/flux/${material}.png`}
								width="50"
								height="50"
							/>
						</div>
						<span className="shape-option-text">{material}</span>
					</button>
				))}
			</div>
		</div>
	);

	const calculateTableHeight = (): THREE.Vector3[] => {
		const linePoints: THREE.Vector3[] = [];

		const startVector = new THREE.Vector3(),
			cornerVectorStart = new THREE.Vector3(),
			cornerVectorEnd = new THREE.Vector3(),
			endVector = new THREE.Vector3();

		switch (selectedShape) {
			case EnumTableShape.RECTANGLE:
				startVector.x = tableTopWidth / 2 + 0.02;
				startVector.y = tableTopHeight / 2 + 0.02;
				startVector.z = -tableTopDepth / 2 - 0.02;

				cornerVectorStart.x = tableTopWidth / 2 + 0.05;
				cornerVectorStart.y = tableTopHeight / 2 + 0.02;
				cornerVectorStart.z = -tableTopDepth / 2 - 0.05;

				cornerVectorEnd.x = tableTopWidth / 2 + 0.05;
				cornerVectorEnd.y = -(tableTopHeight + legHeight) - 0.02;
				cornerVectorEnd.z = -tableTopDepth / 2 - 0.05;

				endVector.x = tableTopWidth / 2 + 0.02;
				endVector.y = -(tableTopHeight + legHeight) - 0.02;
				endVector.z = -tableTopDepth / 2 - 0.02;

				break;
			case EnumTableShape.CIRCLE:
				startVector.x = Math.sin(Math.PI / 4) * (tableTopWidth + 0.1);
				startVector.y = tableTopHeight / 2 + 0.02;
				startVector.z = Math.cos(Math.PI / 4) * (tableTopWidth + 0.1);

				cornerVectorStart.x = Math.sin(Math.PI / 4) * (tableTopWidth + 0.12);
				cornerVectorStart.y = tableTopHeight / 2 + 0.02;
				cornerVectorStart.z = Math.cos(Math.PI / 4) * (tableTopWidth + 0.12);

				cornerVectorEnd.x = Math.sin(Math.PI / 4) * (tableTopWidth + 0.12);
				cornerVectorEnd.y = -(tableTopHeight + legHeight) - 0.02;
				cornerVectorEnd.z = Math.cos(Math.PI / 4) * (tableTopWidth + 0.12);

				endVector.x = Math.sin(Math.PI / 4) * (tableTopWidth + 0.1);
				endVector.y = -(tableTopHeight + legHeight) - 0.02;
				endVector.z = Math.cos(Math.PI / 4) * (tableTopWidth + 0.1);

				break;
			case EnumTableShape.STAR:
				startVector.x = Math.sin(Math.PI / 4) * (tableTopStarSize + 0.1);
				startVector.y = tableTopHeight / 2 + 0.02;
				startVector.z = Math.cos(Math.PI / 4) * (tableTopStarSize + 0.1);

				cornerVectorStart.x = Math.sin(Math.PI / 4) * (tableTopStarSize + 0.12);
				cornerVectorStart.y = tableTopHeight / 2 + 0.02;
				cornerVectorStart.z = Math.cos(Math.PI / 4) * (tableTopStarSize + 0.12);

				cornerVectorEnd.x = Math.sin(Math.PI / 4) * (tableTopStarSize + 0.12);
				cornerVectorEnd.y = -(tableTopHeight + legHeight) - 0.02;
				cornerVectorEnd.z = Math.cos(Math.PI / 4) * (tableTopStarSize + 0.12);

				endVector.x = Math.sin(Math.PI / 4) * (tableTopStarSize + 0.1);
				endVector.y = -(tableTopHeight + legHeight) - 0.02;
				endVector.z = Math.cos(Math.PI / 4) * (tableTopStarSize + 0.1);

				break;
		}

		linePoints.push(startVector, cornerVectorStart, cornerVectorEnd, endVector);

		return linePoints;
	};

	const calculateLegMeasurementPosition = (): [number, number, number] => {
		switch (selectedShape) {
			case EnumTableShape.RECTANGLE:
				return [
					tableTopWidth / 2 + 0.02,
					-(tableTopHeight + legHeight) / 2 - 0.02,
					-tableTopDepth / 2 - 0.02,
				];
			case EnumTableShape.CIRCLE:
				return [
					Math.sin(Math.PI / 4) * (tableTopWidth + 0.1),
					-(tableTopHeight + legHeight) / 2 - 0.02,
					Math.cos(Math.PI / 4) * (tableTopWidth + 0.1),
				];
			case EnumTableShape.STAR:
				return [
					Math.sin(Math.PI / 4) * (tableTopStarSize + 0.1),
					-(tableTopHeight + legHeight) / 2 - 0.02,
					Math.cos(Math.PI / 4) * (tableTopStarSize + 0.1),
				];
			default:
				return [
					tableTopWidth / 2 + 0.02,
					-(tableTopHeight + legHeight) / 2 - 0.02,
					-tableTopDepth / 2 - 0.02,
				];
		}
	};

	return (
		<group>
			{!hideMeasurements && (
				<group>
					<mesh geometry={pointsToGeometry(calculateTableHeight())}>
						<meshBasicMaterial color="#05df72" />
					</mesh>
					<Html position={calculateLegMeasurementPosition()} center>
						<span className="measurement">
							{(tableTopHeight * 100).toFixed(0)}cm +{" "}
							{(legHeight * 100).toFixed(0)}cm ={" "}
							{(tableTopHeight + legHeight).toFixed(2)}m
						</span>
					</Html>
				</group>
			)}

			{legs}
		</group>
	);
};

export default TableLegs;
