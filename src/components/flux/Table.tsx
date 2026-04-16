import { useState, type JSX } from "react";
import TableLegs from "./TableLegs";
import TableTop from "./TableTop";
import {
	EnumMaterial,
	EnumSelectablePart,
	EnumTableLeg,
	EnumTableLegsMaterial,
	EnumTableShape,
	EnumTableTopMaterial,
} from "./Variables";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface TableProps {
	selectedShape: EnumTableShape;
	selectedMaterialTop: EnumMaterial | undefined;
	selectedMaterialLegs: EnumMaterial | undefined;
	setSelectedShape: (shape: EnumTableShape) => void;
	setSelectedMaterialTop: (material: EnumMaterial | undefined) => void;
	setSelectedMaterialLegs: (material: EnumMaterial | undefined) => void;
	setSelectedPart: (part: EnumSelectablePart | null) => void;
	selectedPart: EnumSelectablePart | null;
	selectedLegs: EnumTableLeg;
	setSelectedLegs: (legs: EnumTableLeg) => void;
	materials: Map<EnumMaterial, THREE.MeshBasicMaterial>;
	setSelectedPartHtml: (html: JSX.Element | null) => void;
}

const Table = ({
	selectedShape,
	selectedMaterialTop,
	selectedMaterialLegs,
	setSelectedShape,
	setSelectedMaterialTop,
	setSelectedMaterialLegs,
	setSelectedPart,
	selectedPart,
	selectedLegs,
	setSelectedLegs,
	materials,
	setSelectedPartHtml,
}: TableProps) => {
	const [tableTopDepth, setTableTopDepth] = useState(2);
	const [tableTopWidth, setTableTopWidth] = useState(1);
	const [tableTopHeight, setTableTopHeight] = useState(0.01);
	const [tableTopStarSize, setTableTopStarSize] = useState(1);
	const [tableTopStarAngle, setTableTopStarAngle] = useState(0.5);
	const [tableTopStarPoints, setTableTopStarPoints] = useState(4);

	return (
		<group>
			<TableTop
				selectedPart={selectedPart}
				setSelectedShape={setSelectedShape}
				setSelectedPart={setSelectedPart}
				selectedShape={selectedShape}
				selectedMaterial={selectedMaterialTop}
				setTableTopDepth={setTableTopDepth}
				setTableTopWidth={setTableTopWidth}
				setTableTopHeight={setTableTopHeight}
				tableTopDepth={tableTopDepth}
				tableTopWidth={tableTopWidth}
				tableTopHeight={tableTopHeight}
				tableTopStarSize={tableTopStarSize}
				tableTopStarAngle={tableTopStarAngle}
				tableTopStarPoints={tableTopStarPoints}
				setTableTopStarSize={setTableTopStarSize}
				setTableTopStarAngle={setTableTopStarAngle}
				setTableTopStarPoints={setTableTopStarPoints}
				setSelectedMaterial={setSelectedMaterialTop}
				setSelectedPartHtml={setSelectedPartHtml}
				materials={materials}></TableTop>
			<TableLegs
				selectedShape={selectedShape}
				selectedMaterial={selectedMaterialLegs}
				selectedLegs={selectedLegs}
				setSelectedLegs={setSelectedLegs}
				setSelectedPart={setSelectedPart}
				selectedPart={selectedPart}
				tableTopDepth={tableTopDepth}
				tableTopWidth={tableTopWidth}
				tableTopHeight={tableTopHeight}
				tableTopStarSize={tableTopStarSize}
				tableTopStarAngle={tableTopStarAngle}
				tableTopStarPoints={tableTopStarPoints}
				setSelectedMaterial={setSelectedMaterialLegs}
				setSelectedPartHtml={setSelectedPartHtml}
				materials={materials}></TableLegs>
		</group>
	);
};

export default Table;
