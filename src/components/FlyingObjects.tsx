import { use, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface FlyingObjectsProps {
  height: number;
}

const projects = ["qausal"];

const FlyingObjects = ({ height }: FlyingObjectsProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [controls, setControls] = useState<OrbitControls | null>(null);
  const [flyingObjects, setFlyingObjects] = useState<THREE.Mesh[]>([]);

  const createFlyingObject = (scene: THREE.Scene) => {
    const loader = new DRACOLoader();
    loader.setDecoderPath("/node_modules/three/examples/jsm/libs/draco/");
    loader.preload();

    const meshes: THREE.Mesh[] = [];

    projects.forEach((project, index) => {
      loader.load(
        `/${project}.drc`,
        (geometry) => {
          const material = new THREE.MeshStandardMaterial({
            color: 0x2a35c9,
            roughness: 0,
            metalness: 1,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, 0);
          meshes.push(mesh);
          scene?.add(mesh);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );
    });

    setFlyingObjects((prev) => [...prev, ...meshes]);
  };

  const onWindowResize = () => {
    if (renderer && camera && canvasRef.current) {
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth - 30, height);
    }
  };

  const init = () => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      setScene(scene);
      const camera = new THREE.PerspectiveCamera(
        75,
        (window.innerWidth - 30) / (window.innerHeight - 30),
        0.1,
        1000
      );
      setCamera(camera);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);

      const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      scene.add(hemisphereLight);

      createFlyingObject(scene);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      setRenderer(renderer);
      renderer.setSize(window.innerWidth - 30, height);
      canvasRef.current.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      setControls(controls);

      camera.position.set(0.2, 1, 0.2);
      controls.update();
    }
  };

  const render = () => {
    if (renderer && scene && camera) renderer.render(scene, camera);
  };

  const animate = () => {
    if (controls) {
      controls.update();
    }
    requestAnimationFrame(animate);
    render();
  };

  useEffect(() => {
    onWindowResize();
  }, [height]);

  useEffect(() => {
    init();
    requestAnimationFrame(animate);

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="absolute w-full h-full top-0 left-0 p-15 z-10"
    ></div>
  );
};

export default FlyingObjects;
