import type RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

export enum LineDirection {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export enum LineType {
  MAIN = "main",
  SUB = "sub",
}

export interface FlyingObject {
  mesh: THREE.Object3D;
  body: RAPIER.RigidBody;
  element: HTMLAnchorElement;
}

export interface Project {
  name: string;
  slug: string;
  color: string;
}
