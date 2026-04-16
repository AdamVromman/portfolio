import * as THREE from "three";
import { useEffect, useState, type JSX } from "react";
import {
	EnumMaterial,
	EnumSelectablePart,
	EnumTableShape,
	EnumTableTopMaterial,
} from "./Variables";
import { Html } from "@react-three/drei";

interface TableTopProps {
	selectedShape: EnumTableShape;
	materials: Map<EnumMaterial, THREE.MeshBasicMaterial>;
	selectedMaterial: EnumMaterial;
	setSelectedPart: (part: EnumSelectablePart | null) => void;
	selectedPart: EnumSelectablePart | null;
	setSelectedShape: (shape: EnumTableShape) => void;
	setTableTopDepth: (depth: number) => void;
	setTableTopWidth: (width: number) => void;
	setTableTopHeight: (height: number) => void;
	tableTopDepth: number;
	tableTopWidth: number;
	tableTopHeight: number;
	setTableTopStarSize: (radius: number) => void;
	setTableTopStarAngle: (radius: number) => void;
	setTableTopStarPoints: (points: number) => void;
	tableTopStarSize: number;
	tableTopStarAngle: number;
	tableTopStarPoints: number;
	setSelectedMaterial: (material: EnumTableTopMaterial) => void;
	setSelectedPartHtml: (html: JSX.Element | null) => void;
}

const TableTop = ({
	selectedShape,
	selectedMaterial,
	setSelectedPart,
	selectedPart,
	setSelectedShape,
	setTableTopDepth,
	setTableTopWidth,
	setTableTopHeight,
	tableTopDepth,
	tableTopWidth,
	tableTopHeight,
	tableTopStarSize,
	tableTopStarAngle,
	tableTopStarPoints,
	setTableTopStarSize,
	setTableTopStarAngle,
	setTableTopStarPoints,
	setSelectedMaterial,
	materials,
	setSelectedPartHtml,
}: TableTopProps) => {
	const calculateStarShape = () => {
		const shape = new THREE.Shape();
		const angleStep = (Math.PI * 2) / (tableTopStarPoints * 2);
		const angle = 0;
		const radius = tableTopStarSize * tableTopStarAngle;
		shape.currentPoint = new THREE.Vector2(
			Math.cos(angle) * radius,
			Math.sin(angle) * radius,
		);
		for (let i = 0; i <= tableTopStarPoints * 2; i++) {
			const angle = i * angleStep;
			const radius =
				i % 2 === 0 ? tableTopStarSize * tableTopStarAngle : tableTopStarSize;
			shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
		}
		return shape;
	};

	const getGeometry = ():
		| THREE.BoxGeometry
		| THREE.CylinderGeometry
		| THREE.ExtrudeGeometry => {
		if (selectedShape === EnumTableShape.RECTANGLE) {
			return new THREE.BoxGeometry(
				tableTopWidth,
				tableTopHeight,
				tableTopDepth,
			);
		}
		if (selectedShape === EnumTableShape.CIRCLE) {
			return new THREE.CylinderGeometry(
				tableTopWidth,
				tableTopWidth,
				tableTopHeight,
				100,
			);
		}

		if (selectedShape === EnumTableShape.STAR) {
			return new THREE.ExtrudeGeometry(calculateStarShape(), {
				depth: tableTopHeight,
				bevelEnabled: false,
			}).rotateX(Math.PI / 2);
		}

		return new THREE.BoxGeometry(tableTopWidth, tableTopHeight, tableTopDepth);
	};

	const [geometry, setGeometry] = useState<
		THREE.BoxGeometry | THREE.CylinderGeometry | THREE.ExtrudeGeometry
	>(getGeometry());

	useEffect(() => {
		setGeometry(getGeometry());
	}, [selectedShape]);

	const getEdgeGeometry = () => {
		const edgeGeometry = new THREE.EdgesGeometry(geometry, 15);

		const lines = new THREE.LineSegments(
			edgeGeometry,
			new THREE.LineBasicMaterial({ color: "#05df72" }),
		);

		return lines.geometry;
	};

	useEffect(() => {
		setGeometry(getGeometry());
	}, [
		tableTopDepth,
		tableTopWidth,
		tableTopHeight,
		tableTopStarSize,
		tableTopStarAngle,
		tableTopStarPoints,
	]);

	const shapeEnumToSvg = (shape: EnumTableShape): JSX.Element => {
		switch (shape) {
			case EnumTableShape.RECTANGLE:
				return <rect x="12.5" y="12.5" width="25" height="25" />;
			case EnumTableShape.CIRCLE:
				return <circle cx="25" cy="25" r="15" />;
			case EnumTableShape.STAR:
				return (
					<polygon points="25,5 30,20 45,20 32.5,30 37.5,45 25,35 12.5,45 17.5,30 5,20 20,20" />
				);
			default:
				return <rect x="15" y="15" width="25" height="25" />;
		}
	};

	const configHtml = (
		<div className="table-config">
			<h3>Table Top</h3>
			<h2>Shape</h2>
			<div className="flex flex-row gap-4">
				{Object.values(EnumTableShape).map((shape) => (
					<button
						className={`shape-option ${selectedShape === shape ? "selected" : ""}`}
						key={shape}
						onClick={() => setSelectedShape(shape)}>
						<div className="shape-option-svg">
							<svg
								fill={selectedShape === shape ? "#05df72" : "none"}
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
				{selectedShape === EnumTableShape.STAR && (
					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<label>Size: </label>
							<input
								type="range"
								min="1"
								max="4"
								defaultValue={tableTopStarSize}
								step={0.1}
								onChange={(e) => {
									setTableTopStarSize(parseFloat(e.target.value));
								}}
							/>
						</div>
						<div className="flex flex-col">
							<label>Angle: </label>
							<input
								type="range"
								min="0.5"
								max="0.9"
								defaultValue={tableTopStarAngle}
								step={0.1}
								onChange={(e) => {
									setTableTopStarAngle(parseFloat(e.target.value));
								}}
							/>
						</div>
						<div className="flex flex-col">
							<label>star points: </label>
							<input
								type="range"
								min="4"
								max="10"
								defaultValue={tableTopStarPoints}
								step={1}
								onChange={(e) => {
									setTableTopStarPoints(parseFloat(e.target.value));
								}}
							/>
						</div>
						<div className="flex flex-col">
							<label>Height: </label>
							<input
								type="range"
								min="0.01"
								max="0.1"
								defaultValue={tableTopHeight}
								step={0.005}
								onChange={(e) => {
									setTableTopHeight(parseFloat(e.target.value));
								}}
							/>
						</div>
					</div>
				)}
				{selectedShape === EnumTableShape.RECTANGLE && (
					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<label>Width: </label>
							<input
								type="range"
								min="1"
								max="3"
								defaultValue={tableTopWidth}
								step={0.1}
								onChange={(e) => {
									setTableTopWidth(parseFloat(e.target.value));
								}}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col">
								<label>Depth: </label>
								<input
									type="range"
									min="2"
									max="6"
									defaultValue={tableTopDepth}
									step={0.1}
									onChange={(e) => {
										setTableTopDepth(parseFloat(e.target.value));
									}}
								/>
							</div>
						</div>
						<div className="flex flex-col">
							<label>Height: </label>
							<input
								type="range"
								min="0.01"
								max="0.1"
								defaultValue={tableTopHeight}
								step={0.005}
								onChange={(e) => {
									setTableTopHeight(parseFloat(e.target.value));
								}}
							/>
						</div>
					</div>
				)}
				{selectedShape === EnumTableShape.CIRCLE && (
					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<label>Width: </label>
							<input
								type="range"
								min="1"
								max="3"
								defaultValue={tableTopWidth}
								step={0.1}
								onChange={(e) => {
									setTableTopWidth(parseFloat(e.target.value));
								}}
							/>
						</div>
						<div className="flex flex-col">
							<label>Height: </label>
							<input
								type="range"
								min="0.01"
								max="0.1"
								defaultValue={tableTopHeight}
								step={0.005}
								onChange={(e) => {
									setTableTopHeight(parseFloat(e.target.value));
								}}
							/>
						</div>
					</div>
				)}
			</div>
			<h2>Material options</h2>
			<div className="flex flex-row gap-4">
				{Object.values(EnumTableTopMaterial).map((material) => (
					<button
						className={`shape-option ${selectedMaterial === material ? "selected" : ""}`}
						key={material}
						onClick={() => setSelectedMaterial(material)}>
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

	const calculateTableDepthLine = () => {
		let linePoints = [];

		const startVector = new THREE.Vector3(
			-tableTopWidth / 2 - 0.1,
			0,
			tableTopDepth / 2,
		);

		const cornerVectorStart = new THREE.Vector3(
			-tableTopWidth / 2 - 0.15,
			0,
			tableTopDepth / 2,
		);

		const cornerVectorEnd = new THREE.Vector3(
			-tableTopWidth / 2 - 0.15,
			0,
			-tableTopDepth / 2,
		);

		const endVector = new THREE.Vector3(
			-tableTopWidth / 2 - 0.1,
			0,
			-tableTopDepth / 2,
		);

		linePoints.push(startVector, cornerVectorStart, cornerVectorEnd, endVector);

		return pointsToGeometry(linePoints);
	};

	const calculateTableWidthLine = () => {
		let linePoints = [];

		const startVector = new THREE.Vector3(
			-tableTopWidth / 2,
			0,
			tableTopDepth / 2 + 0.1,
		);

		const cornerVectorStart = new THREE.Vector3(
			-tableTopWidth / 2,
			0,
			tableTopDepth / 2 + 0.15,
		);

		const cornerVectorEnd = new THREE.Vector3(
			tableTopWidth / 2,
			0,
			tableTopDepth / 2 + 0.15,
		);

		const endVector = new THREE.Vector3(
			tableTopWidth / 2,
			0,
			tableTopDepth / 2 + 0.1,
		);

		linePoints.push(startVector, cornerVectorStart, cornerVectorEnd, endVector);

		return pointsToGeometry(linePoints);
	};

	const pointsToGeometry = (points: THREE.Vector3[]) => {
		const curvePath = new THREE.CurvePath();
		points.forEach((point, index) => {
			if (index < points.length - 1) {
				const nextPoint = points[index + 1];
				const curve = new THREE.LineCurve3(point, nextPoint);
				curvePath.add(curve);
			}
		});

		var tubeGeometry = new THREE.TubeGeometry(curvePath, 64, 0.005, 64, false);
		return tubeGeometry;
	};

	return (
		<group>
			{selectedPart === EnumSelectablePart.TABLETOP && (
				<>
					<group>
						<mesh geometry={calculateTableWidthLine()}>
							<meshBasicMaterial color="#05df72" />
						</mesh>
						<Html position={[0, 0, tableTopDepth / 2 + 0.3]} center>
							<span className="measurement">{tableTopWidth}m</span>
						</Html>
					</group>
					<group>
						<mesh geometry={calculateTableDepthLine()}>
							<meshBasicMaterial color="#05df72" />
						</mesh>
						<Html position={[-tableTopWidth / 2 - 0.3, 0, 0]} center>
							<span className="measurement">{tableTopDepth}m</span>
						</Html>
					</group>
				</>
			)}

			<mesh
				onClick={() => {
					console.log(selectedPart);
					setSelectedPartHtml(configHtml);
					setSelectedPart(
						selectedPart === EnumSelectablePart.TABLETOP
							? null
							: EnumSelectablePart.TABLETOP,
					);
				}}
				castShadow
				receiveShadow
				geometry={geometry}
				material={
					materials.get(selectedMaterial as EnumMaterial) ??
					new THREE.THREE.MeshBasicMaterial()
				}></mesh>
			{selectedPart === EnumSelectablePart.TABLETOP && (
				<lineSegments geometry={getEdgeGeometry()}>
					<lineBasicMaterial color="#05df72" />
				</lineSegments>
			)}
		</group>
	);
};

export default TableTop;
