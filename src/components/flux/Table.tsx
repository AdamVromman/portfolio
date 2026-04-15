import { useState } from "react";
import TableLegs from "./TableLegs";
import TableTop from "./TableTop";
import { EnumSelectablePart, EnumTableLeg, EnumTableShape } from "./Variables";
import { Html } from "@react-three/drei";
import { set } from "astro:schema";

interface TableProps {
	selectedShape: EnumTableShape;
	selectedMaterial: string | null;
	setSelectedShape: (shape: EnumTableShape) => void;
	setSelectedMaterial: (material: string | null) => void;
	setSelectedPart: (part: EnumSelectablePart | null) => void;
	selectedPart: EnumSelectablePart | null;
	selectedLegs: EnumTableLeg;
	setSelectedLegs: (legs: EnumTableLeg) => void;
}

const Table = ({
	selectedShape,
	selectedMaterial,
	setSelectedShape,
	setSelectedMaterial,
	setSelectedPart,
	selectedPart,
	selectedLegs,
	setSelectedLegs,
}: TableProps) => {
	const [tableTopDepth, setTableTopDepth] = useState(2);
	const [tableTopWidth, setTableTopWidth] = useState(1);
	const [tableTopHeight, setTableTopHeight] = useState(0.01);
	const [starSize, setStarSize] = useState(1);
	const [starAngle, setStarAngle] = useState(0.5);
	const [starPoints, setStarPoints] = useState(4);

	return (
		<group>
			<Html>{selectedPart}</Html>
			<TableTop
				selectedPart={selectedPart}
				setSelectedShape={setSelectedShape}
				setSelectedPart={setSelectedPart}
				selectedShape={selectedShape}
				selectedMaterial={selectedMaterial}
				setTableTopDepth={setTableTopDepth}
				setTableTopWidth={setTableTopWidth}
				setTableTopHeight={setTableTopHeight}
				tableTopDepth={tableTopDepth}
				tableTopWidth={tableTopWidth}
				tableTopHeight={tableTopHeight}
				starSize={starSize}
				starAngle={starAngle}
				starPoints={starPoints}
				setStarSize={setStarSize}
				setStarAngle={setStarAngle}
				setStarPoints={setStarPoints}></TableTop>
			<TableLegs
				selectedShape={selectedShape}
				selectedMaterial={selectedMaterial}
				selectedLegs={selectedLegs}
				setSelectedLegs={setSelectedLegs}
				setSelectedPart={setSelectedPart}
				selectedPart={selectedPart}
				tableTopDepth={tableTopDepth}
				tableTopWidth={tableTopWidth}
				tableTopHeight={tableTopHeight}></TableLegs>
		</group>
	);
};

export default Table;
