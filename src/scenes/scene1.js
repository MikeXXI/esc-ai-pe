// src/scenes/Scene1.js
import * as BABYLON from "babylonjs";

export function createScene1(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  // Camera FPS
  const camera = new BABYLON.UniversalCamera("FPSCam", new BABYLON.Vector3(0, 2, -5), scene);
  camera.attachControl(canvas, true);
  camera.speed = 0.5;
  camera.inertia = 0.7;

  // Lumi�re
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  // Sol
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

  // Murs (4 murs autour)
  const wallMaterial = new BABYLON.StandardMaterial("wallMat", scene);
  wallMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);

  const createWall = (x, z, rotY) => {
    const wall = BABYLON.MeshBuilder.CreateBox("wall", { width: 10, height: 3, depth: 0.2 }, scene);
    wall.position = new BABYLON.Vector3(x, 1.5, z);
    wall.rotation.y = rotY;
    wall.material = wallMaterial;
  };

  createWall(0, 5, 0);       // mur avant
  createWall(0, -5, 0);      // mur arri�re
  createWall(-5, 0, Math.PI/2); // mur gauche
  createWall(5, 0, Math.PI/2);  // mur droit

  // Cube interactif au centre
  const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
  cube.position = new BABYLON.Vector3(0, 0.5, 0);
  const cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
  cubeMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  cube.material = cubeMat;

  return scene;
}