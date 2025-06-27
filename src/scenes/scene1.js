// src/scenes/scene1.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { addHand } from "../objects/addhand.js";
import { createScene2 } from "./scene2.js";
import { switchScene } from "../main.js";

export async function createScene1(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.1, 0); // gravité douce
  engine.getRenderingCanvas().tabIndex = 1; // pour éviter certains bugs clavier

  // Camera FPS
  const camera = new BABYLON.UniversalCamera("FPSCam", new BABYLON.Vector3(5, 22, 5), scene);
  camera.attachControl(canvas, true);  

  camera.speed = 0.5;
  camera.inertia = 0.7;

  // Activer les collisions de la caméra
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1); // Ellipsoïde pour les collisions de la caméra

  camera.onCollide = function(collidedMesh) {
    if (camera.position.y < 1.1) {
      camera.position.y = 1.1; // force la caméra à rester au-dessus du sol
    }
  };

  await addHand(scene, camera);

  // Lumière
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 22, 0), scene);

  // Portail interactif (remplace le cube)
  const portalImport = await BABYLON.SceneLoader.ImportMeshAsync(
    "",            // importer tous les meshess
    "/models/",    // dossier
    "egyptian_statue.glb", // nom du fichier
    scene
  );
  const portalMeshes = portalImport.meshes;
  // Positionner le portail à la même position que le cube d'origine
  portalMeshes.forEach(mesh => {
    mesh.position = new BABYLON.Vector3(0, 10, -5);
    mesh.checkCollisions = true;
    mesh.isVisible = true;
    if (mesh.name !== "__root__") {
      mesh.actionManager = new BABYLON.ActionManager(scene);
      mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
          switchScene(createScene2);
        })
      );
    }
  });
 
  camera.setTarget(new BABYLON.Vector3(5, 22, 0));

  const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
    "",            // importer tous les meshes
    "/models/",    // dossier
    "Egyptian_map.glb", // nom du fichier
    scene
  );
  // Optionnel : activer les collisions sur tous les meshes importés
  meshes.forEach(mesh => mesh.checkCollisions = true);
  meshes.position = new BABYLON.Vector3(0, 0, 0);

  // Crée un sol invisible juste sous la caméra, à la hauteur du dessus de la carte
  const invisibleGround = BABYLON.MeshBuilder.CreateBox("invisibleGround", {
    width: 28, // adapte à la taille de ta carte
    depth: 28,
    height: 0.5
  }, scene);
  invisibleGround.position = new BABYLON.Vector3(0, 21, 0); // adapte Y à la hauteur du dessus de la carte
  invisibleGround.isVisible = false;
  invisibleGround.checkCollisions = true;

  // Murs invisibles pour empêcher la sortie de la carte
  const wallThickness = 0.5;
  const wallHeight = 5;
  const mapSize = 30; // adapte à la taille de ta carte
  const wallY = 23.5; // hauteur du mur (au-dessus du sol)

  // Mur Nord
  const wallNorth = BABYLON.MeshBuilder.CreateBox("wallNorth", {
    width: mapSize,
    height: wallHeight,
    depth: wallThickness
  }, scene);
  wallNorth.position = new BABYLON.Vector3(0, wallY, -mapSize/2);
  wallNorth.isVisible = false;
  wallNorth.checkCollisions = true;

  // Mur Sud
  const wallSouth = BABYLON.MeshBuilder.CreateBox("wallSouth", {
    width: mapSize,
    height: wallHeight,
    depth: wallThickness
  }, scene);
  wallSouth.position = new BABYLON.Vector3(0, wallY, (mapSize/2) - 7);
  wallSouth.isVisible = false;
  wallSouth.checkCollisions = true;

  // Mur Est
  const wallEast = BABYLON.MeshBuilder.CreateBox("wallEast", {
    width: wallThickness,
    height: wallHeight,
    depth: mapSize
  }, scene);
  wallEast.position = new BABYLON.Vector3((mapSize/2) - 7, wallY, 0);
  wallEast.isVisible = false;
  wallEast.checkCollisions = true;

  // Mur Ouest
  const wallWest = BABYLON.MeshBuilder.CreateBox("wallWest", {
    width: wallThickness,
    height: wallHeight,
    depth: mapSize
  }, scene);
  wallWest.position = new BABYLON.Vector3(-mapSize/2, wallY, 0);
  wallWest.isVisible = false;
  wallWest.checkCollisions = true;


  return scene;  
}

