import { useEffect, useState, type JSX } from "react";
import { EnumSelectablePart, EnumTableLeg, EnumTableShape } from "./Variables";
import * as THREE from "three";
import { Html } from "@react-three/drei";

interface TableLegsProps {
	selectedShape: EnumTableShape;
	selectedMaterial: string | null;
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
		console.log("clicked leg");
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
			<mesh onClick={clickLeg} geometry={geometry}>
				<meshBasicMaterial color={selectedMaterial || "gray"} />
			</mesh>
		);

		const legSelected = (
			<lineSegments geometry={edgeGeometry}>
				<lineBasicMaterial linewidth={100} color="red" />
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
		console.log("recalculating legs");

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
	]);

	return (
		<group>
			{selectedPart === EnumSelectablePart.TABLELEGS && (
				<Html position={[1, 1, 1]}>
					<h3>Table Legs</h3>
					<div className="flex flex-col">
						{Object.values(EnumTableLeg).map((shape) => (
							<button key={shape} onClick={() => setSelectedLegs(shape)}>
								{shape}
							</button>
						))}
					</div>
				</Html>
			)}
			{legs}
		</group>
	);
};

export default TableLegs;
