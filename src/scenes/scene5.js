import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';
import { addSphinxInterface } from "../objects/addSphinx.js"; 

export async function createScene5(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.2, 0); // gravité douce

  // Camera FPS (UniversalCamera pour collisions et gravité)
  const camera = new BABYLON.UniversalCamera("FPSCam5", new BABYLON.Vector3(2, 5, 2), scene);
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
  const light = new BABYLON.HemisphericLight("Light5", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.8;

  // Chargement du décor principal (corrigé : nom du fichier sans espace)
  const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "models/",
    "statuette_pharaon.glb",
    scene
  );
  meshes.forEach(mesh => {
    mesh.checkCollisions = true;
    mesh.freezeWorldMatrix(); // Optimisation : fige la matrice si statique
  });



  addSphinxInterface(scene);

  return scene;
}
