import { useState, type JSX } from "react";
import TableLegs from "./TableLegs";
import TableTop from "./TableTop";
import {
	EnumMaterial,
	EnumSelectablePart,
	EnumTableLeg,
	EnumTableShape,
} from "./Variables";
import * as THREE from "three";

interface TableProps {
	hideMeasurements: boolean;
	setSelectedPartHtml: (html: JSX.Element | null) => void;

	materials: Map<EnumMaterial, THREE.MeshBasicMaterial>;

	selectedShape: EnumTableShape;
	setSelectedShape: (shape: EnumTableShape) => void;

	selectedMaterialTop: EnumMaterial | undefined;
	setSelectedMaterialTop: (material: EnumMaterial | undefined) => void;

	selectedMaterialLegs: EnumMaterial | undefined;
	setSelectedMaterialLegs: (material: EnumMaterial | undefined) => void;

	setSelectedPart: (part: EnumSelectablePart | null) => void;
	selectedPart: EnumSelectablePart | null;

	selectedLegs: EnumTableLeg;
	setSelectedLegs: (legs: EnumTableLeg) => void;
}

const Table = ({
	hideMeasurements,
	setSelectedPartHtml,
	materials,
	selectedShape,
	setSelectedShape,
	selectedMaterialTop,
	setSelectedMaterialTop,
	selectedMaterialLegs,
	setSelectedMaterialLegs,
	setSelectedPart,
	selectedPart,
	selectedLegs,
	setSelectedLegs,
}: TableProps) => {
	// Rectangle and Circle shape specific
	const [tableTopWidth, setTableTopWidth] = useState(1);

	// Rectangle shape specific
	const [tableTopDepth, setTableTopDepth] = useState(2);

	// Star shape specific
	const [tableTopStarSize, setTableTopStarSize] = useState(1);
	const [tableTopStarAngle, setTableTopStarAngle] = useState(0.5);
	const [tableTopStarPoints, setTableTopStarPoints] = useState(4);

	// All shapes
	const [tableTopHeight, setTableTopHeight] = useState(0.01);

	return (
		<group>
			<TableTop
				hideMeasurements={hideMeasurements}
				setSelectedPartHtml={setSelectedPartHtml}
				materials={materials}
				selectedMaterial={selectedMaterialTop}
				setSelectedMaterialTop={setSelectedMaterialTop}
				// Currently selected table top shape
				selectedShape={selectedShape}
				setSelectedShape={setSelectedShape}
				// Currently selected part
				selectedPart={selectedPart}
				setSelectedPart={setSelectedPart}
				// Rectangle and Circle specific props
				tableTopWidth={tableTopWidth}
				setTableTopWidth={setTableTopWidth}
				// Rectangle specific props
				tableTopDepth={tableTopDepth}
				setTableTopDepth={setTableTopDepth}
				// Star specific props
				tableTopStarSize={tableTopStarSize}
				setTableTopStarSize={setTableTopStarSize}
				tableTopStarAngle={tableTopStarAngle}
				setTableTopStarAngle={setTableTopStarAngle}
				tableTopStarPoints={tableTopStarPoints}
				setTableTopStarPoints={setTableTopStarPoints}
				// All shapes
				tableTopHeight={tableTopHeight}
				setTableTopHeight={setTableTopHeight}></TableTop>
			<TableLegs
				hideMeasurements={hideMeasurements}
				setSelectedPartHtml={setSelectedPartHtml}
				materials={materials}
				selectedMaterial={selectedMaterialLegs}
				setSelectedMaterialLegs={setSelectedMaterialLegs}
				// Currently selected table top shape for leg position
				selectedShape={selectedShape}
				// Currently selected legs
				selectedLegs={selectedLegs}
				setSelectedLegs={setSelectedLegs}
				// Currently selected part
				selectedPart={selectedPart}
				setSelectedPart={setSelectedPart}
				// Pass table top dimensions to legs for measurement display and leg position
				tableTopDepth={tableTopDepth}
				tableTopWidth={tableTopWidth}
				tableTopHeight={tableTopHeight}
				tableTopStarSize={tableTopStarSize}
				tableTopStarAngle={tableTopStarAngle}
				tableTopStarPoints={tableTopStarPoints}></TableLegs>
		</group>
	);
};

export default Table;
