import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';

export function createScene2(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera("Camera2", Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("Light2", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  // Ajout des mains (appel à la fonction importée)
  addHand(scene, camera);

  BABYLON.SceneLoader.Append(
    "/models/",
    "scene_parking.glb",
    scene,
    function () {
      console.log("Scene parking chargée !");
    },
    null,
    function (scene, message, exception) {
      console.error("Erreur chargement GLB :", message, exception);
    }
  );

  return scene;
}
