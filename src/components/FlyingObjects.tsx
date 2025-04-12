import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface FlyingObjectsProps {
  width: number;
  height: number;
}

const FlyingObjects = ({ width, height }: FlyingObjectsProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5).normalize();
      scene.add(directionalLight);

      const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      scene.add(hemisphereLight);

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(width, height);
      canvasRef.current.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);

      // Instantiate a loader
      const loader = new DRACOLoader();

      // Specify path to a folder containing WASM/JS decoding libraries.
      loader.setDecoderPath("/node_modules/three/examples/jsm/libs/draco/");

      // Optional: Pre-fetch Draco WASM/JS module.
      loader.preload();

      // Load a Draco geometry
      loader.load(
        // resource URL
        "/qausal.drc",
        // called when the resource is loaded
        function (geometry) {
          const material = new THREE.MeshStandardMaterial({
            color: 0x2a35c9,
            roughness: 0,
            metalness: 1,
          });
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        },
        // called as loading progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log("An error happened");
        }
      );

      camera.position.set(0.2, 1, 0.2);
      controls.update();

      const animate = () => {
        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(animate);
    }
  }, [width, height]);

  return (
    <div
      ref={canvasRef}
      className="absolute w-full h-full top-0 left-0 p-15 z-10"
    ></div>
  );
};

export default FlyingObjects;
