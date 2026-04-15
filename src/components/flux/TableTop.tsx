import * as THREE from "three";
import { useEffect, useState } from "react";
import { EnumSelectablePart, EnumTableShape } from "./Variables";
import { Html } from "@react-three/drei/web/Html";
import type { size } from "astro:schema";

interface TableTopProps {
	selectedShape: EnumTableShape;
	selectedMaterial: string | null;
	setSelectedPart: (part: EnumSelectablePart | null) => void;
	selectedPart: EnumSelectablePart | null;
	setSelectedShape: (shape: EnumTableShape) => void;
	setTableTopDepth: (depth: number) => void;
	setTableTopWidth: (width: number) => void;
	setTableTopHeight: (height: number) => void;
	tableTopDepth: number;
	tableTopWidth: number;
	tableTopHeight: number;
	setStarSize: (radius: number) => void;
	setStarAngle: (radius: number) => void;
	setStarPoints: (points: number) => void;
	starSize: number;
	starAngle: number;
	starPoints: number;
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
	starSize,
	starAngle,
	starPoints,
	setStarSize,
	setStarAngle,
	setStarPoints,
}: TableTopProps) => {
	const calculateStarShape = () => {
		const shape = new THREE.Shape();
		const angleStep = (Math.PI * 2) / (starPoints * 2);
		const angle = 0;
		const radius = starSize * starAngle;
		shape.currentPoint = new THREE.Vector2(
			Math.cos(angle) * radius,
			Math.sin(angle) * radius,
		);
		for (let i = 0; i <= starPoints * 2; i++) {
			const angle = i * angleStep;
			const radius = i % 2 === 0 ? starSize * starAngle : starSize;
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
			new THREE.LineBasicMaterial({ color: "red" }),
		);

		return lines.geometry;
	};

	useEffect(() => {
		setGeometry(getGeometry());
	}, [
		tableTopDepth,
		tableTopWidth,
		tableTopHeight,
		starSize,
		starAngle,
		starPoints,
	]);

	return (
		<group>
			{selectedPart === EnumSelectablePart.TABLETOP && (
				<Html position={[1, 1, 1]}>
					<div className="flex flex-col">
						{Object.values(EnumTableShape).map((shape) => (
							<button key={shape} onClick={() => setSelectedShape(shape)}>
								{shape}
							</button>
						))}
					</div>

					<div>
						{selectedShape === EnumTableShape.STAR && (
							<>
								<label>Size: </label>
								<input
									type="range"
									min="1"
									max="4"
									defaultValue={starSize}
									step={0.1}
									onDrag={(e) => {
										e.preventDefault();
									}}
									onChange={(e) => {
										setStarSize(parseFloat(e.target.value));
									}}
								/>
								<label>Angle: </label>
								<input
									type="range"
									min="0.5"
									max="0.9"
									defaultValue={starAngle}
									step={0.1}
									onDrag={(e) => {
										e.preventDefault();
									}}
									onChange={(e) => {
										setStarAngle(parseFloat(e.target.value));
									}}
								/>
								<label>star points: </label>
								<input
									type="range"
									min="4"
									max="10"
									defaultValue={starPoints}
									step={1}
									onDrag={(e) => {
										e.preventDefault();
									}}
									onChange={(e) => {
										setStarPoints(parseFloat(e.target.value));
									}}
								/>
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
							</>
						)}
						{selectedShape === EnumTableShape.RECTANGLE && (
							<>
								<label>Width: </label>
								<input
									type="range"
									min="1"
									max="3"
									defaultValue={tableTopWidth}
									step={0.1}
									onDrag={(e) => {
										e.preventDefault();
									}}
									onChange={(e) => {
										setTableTopWidth(parseFloat(e.target.value));
									}}
								/>
								{selectedShape === EnumTableShape.RECTANGLE && (
									<>
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
									</>
								)}

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
							</>
						)}
						{selectedShape === EnumTableShape.CIRCLE && (
							<>
								<label>Width: </label>
								<input
									type="range"
									min="1"
									max="3"
									defaultValue={tableTopWidth}
									step={0.1}
									onDrag={(e) => {
										e.preventDefault();
									}}
									onChange={(e) => {
										setTableTopWidth(parseFloat(e.target.value));
									}}
								/>
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
							</>
						)}
					</div>
				</Html>
			)}
			<mesh
				onClick={() => {
					console.log(selectedPart);
					setSelectedPart(
						selectedPart === EnumSelectablePart.TABLETOP
							? null
							: EnumSelectablePart.TABLETOP,
					);
				}}
				castShadow
				receiveShadow
				geometry={geometry}>
				<meshBasicMaterial color={selectedMaterial || "gray"} />
			</mesh>
			{selectedPart === EnumSelectablePart.TABLETOP && (
				<lineSegments geometry={getEdgeGeometry()}>
					<lineBasicMaterial linewidth={100} color="red" />
				</lineSegments>
			)}
		</group>
	);
};

export default TableTop;
