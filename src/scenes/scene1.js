import * as BABYLON from "babylonjs";

export function createScene1(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.UniversalCamera("cam1", new BABYLON.Vector3(0, 2, -10), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

  // Mur simple
  const wall = BABYLON.MeshBuilder.CreateBox("wall", { width: 10, height: 3, depth: 0.2 }, scene);
  wall.position.z = 5;
  wall.position.y = 1.5;

  // Cube
  const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
  cube.position.x = 0;
  cube.position.y = 1;
  cube.position.z = -4;

  return scene;
}