import * as THREE from "three";

export const pointsToGeometry = (points: THREE.Vector3[]) => {
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
