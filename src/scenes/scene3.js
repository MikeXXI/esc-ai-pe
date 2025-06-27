import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';

export async function createScene3(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.2, 0); // gravité douce

  // Camera FPS (UniversalCamera pour collisions et gravité)
  const camera = new BABYLON.UniversalCamera("FPSCam3", new BABYLON.Vector3(2, 5, 2), scene);
  camera.attachControl(canvas, true);
  camera.speed = 0.5;
  camera.inertia = 0.7;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

  camera.onCollide = function () {
    if (camera.position.y < 1.1) camera.position.y = 1.1;
  };

  await addHand(scene, camera);
  camera.setTarget(new BABYLON.Vector3(0, 5, 0));

  // Lumière principale
  const light = new BABYLON.HemisphericLight("Light3", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.8;

  // Chargement du décor principal
  const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/models/",
    "Egyptian_map.glb",
    scene
  );
  meshes.forEach(mesh => {
    mesh.checkCollisions = true;
    mesh.freezeWorldMatrix(); // Optimisation : fige la matrice si statique
  });

  // Crée un sol invisible pour collisions
  const invisibleGround = BABYLON.MeshBuilder.CreateBox("invisibleGround", {
    width: 28,
    depth: 28,
    height: 0.5
  }, scene);
  invisibleGround.position = new BABYLON.Vector3(0, 1, 0); // Y=0.25 pour coller au sol
  invisibleGround.isVisible = false;
  invisibleGround.checkCollisions = true;

  // Murs invisibles pour empêcher la sortie de la carte
  const wallThickness = 0.5;
  const wallHeight = 5;
  const mapSize = 28;
  const wallY = 2.75; // hauteur du centre du mur (sol + wallHeight/2)

  // Mur Nord
  const wallNorth = BABYLON.MeshBuilder.CreateBox("wallNorth", {
    width: mapSize,
    height: wallHeight,
    depth: wallThickness
  }, scene);
  wallNorth.position = new BABYLON.Vector3(0, wallY, -mapSize / 2);
  wallNorth.isVisible = false;
  wallNorth.checkCollisions = true;

  // Mur Sud
  const wallSouth = BABYLON.MeshBuilder.CreateBox("wallSouth", {
    width: mapSize,
    height: wallHeight,
    depth: wallThickness
  }, scene);
  wallSouth.position = new BABYLON.Vector3(0, wallY, (mapSize / 2) - 6);
  wallSouth.isVisible = false;
  wallSouth.checkCollisions = true;

  // Mur Est
  const wallEast = BABYLON.MeshBuilder.CreateBox("wallEast", {
    width: wallThickness,
    height: wallHeight,
    depth: mapSize
  }, scene);
  wallEast.position = new BABYLON.Vector3((mapSize / 2) - 7, wallY, 0);
  wallEast.isVisible = false;
  wallEast.checkCollisions = true;

  // Mur Ouest
  const wallWest = BABYLON.MeshBuilder.CreateBox("wallWest", {
    width: wallThickness,
    height: wallHeight,
    depth: mapSize
  }, scene);
  wallWest.position = new BABYLON.Vector3(-mapSize / 2, wallY, 0);
  wallWest.isVisible = false;
  wallWest.checkCollisions = true;

  // Optimisation : activer le culling sur tous les meshes
  meshes.forEach(mesh => mesh.alwaysSelectAsActiveMesh = false);

  return scene;
}
