import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';
import { addSphinxInterface } from "../objects/addSphinx.js"; 
import { createScene4 } from "./scene4.js";
import { switchScene } from "../main.js";

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

  // Chargement de la porte égyptienne
  const doorImport = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/models/",
    "Egyptian_map_door.glb",
    scene
  );
  doorImport.meshes.forEach(mesh => {
    mesh.position = new BABYLON.Vector3(-3.70, 0, 0); // Position à ajuster selon tes besoins
    mesh.rotation = new BABYLON.Vector3(0, 0, 0); // Rotation de 90° autour de Y
    mesh.checkCollisions = true;
  });
  let doorMeshes = doorImport.meshes;

  // Chargement du nez du sphinx
  const noseImport = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/models/enigma_2/",
    "sphinx_nose_scale.glb",
    scene
  );
  noseImport.meshes.forEach(mesh => {
    mesh.position = new BABYLON.Vector3(-10, 13.70, -6.30); // Position à ajuster selon tes besoins
    mesh.rotation = new BABYLON.Vector3(1.70, 6.87, -4.10); // Rotation de 90° autour de Y
    mesh.checkCollisions = true;
    
    // Rendre le nez cliquable
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        switchScene(createScene4);
      })
    );
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

  // --- Contrôle de montée de la caméra avec la touche espace ---
  let isRising = false;
  const maxY = 10; // Hauteur maximale de la caméra
  const riseSpeed = 0.5; // Vitesse de montée

  // Contrôles pour déplacer la porte
  let doorPosition = new BABYLON.Vector3(-3.70, 0, 0);
  let doorRotation = new BABYLON.Vector3(0, 0, 0);
  const moveSpeed = 0.1;
  const rotationSpeed = 0.1;

  window.addEventListener('keydown', function (e) {
    // Contrôles existants pour la caméra
    if (e.code === 'Space' && !isRising && camera.position.y < maxY) {
      isRising = true;
      scene.onBeforeRenderObservable.add(riseCamera);
    }
  });

  function riseCamera() {
    if (camera.position.y < maxY) {
      camera.position.y += riseSpeed;
      if (camera.position.y > maxY) camera.position.y = maxY;
    } else {
      scene.onBeforeRenderObservable.removeCallback(riseCamera);
      isRising = false;
    }
  }

  // Animation de la porte
  function animateDoor() {
    const targetX = -3.70 + 1; // déplacement latéral de 5 unités
    const anim = new BABYLON.Animation(
      "doorMove",
      "position.x",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    anim.setKeys([
      { frame: 0, value: doorMeshes[0].position.x },
      { frame: 60, value: targetX }
    ]);
    doorMeshes.forEach(mesh => {
      mesh.animations = [anim];
      scene.beginAnimation(mesh, 0, 60, false);
    });
  }

  // Ajout de l'interface Sphinx avec callback
  addSphinxInterface(scene, (message) => {
    if (message.trim().toLowerCase() === "vert") {
      animateDoor();
    }
  });

  return scene;
}
