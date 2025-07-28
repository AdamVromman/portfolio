import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { projects } from "./Constants";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera,
  controls: OrbitControls | null = null,
  object: THREE.Mesh | null = null;
let width = 0,
  height = 0;
const frustumSize = 50;
const clock = new THREE.Clock();
let delta;
let time = 0;

const slug =
  (document.querySelector(".single-flying-object") as HTMLElement).dataset
    .slug || "default";
const container = document.getElementById(`single-flying-object-${slug}`);
const project = projects.find((p) => p.slug === slug);

const animate = () => {
  requestAnimationFrame(animate);

  delta = clock.getDelta();
  time += Math.min(delta, 0.1);

  object?.rotation.set(time * 0.1, time * 0.2, time * 0.3);

  controls?.update();

  if (renderer && scene && camera) renderer.render(scene, camera);
};

export const init = () => {
  if (container && project) {
    height = container.getBoundingClientRect().height;
    width = container.getBoundingClientRect().width;
    const aspect = width / height;

    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      200
    );

    const loader = new DRACOLoader();
    loader.setDecoderPath("/assets/draco/");
    loader.preload();

    if (scene) {
      loader.load(
        `/assets/${slug}/${slug}.drc`,
        (geometry) => {
          geometry.center();
          geometry.scale(100, 100, 100);
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(`#${project.color}`),
            roughness: 0,
            metalness: 1,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, 0);
          object = mesh;
          scene.add(mesh);
        },
        (xhr) => {
          console.log(
            `Loading ${slug}... ${Math.round(
              (xhr.loaded / xhr.total) * 100
            )}% loaded`
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }

    new RGBELoader()
      .setPath("/")
      .load("assets/background.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      });

    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;

    console.log(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.insertAdjacentElement("afterbegin", renderer.domElement);

    requestAnimationFrame(animate);
  }
};
