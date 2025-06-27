import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';

export function createScene3(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const camera3 = new BABYLON.ArcRotateCamera("Camera3", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
  camera3.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("Light3", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  // Ajout des mains (appel à la fonction importée)
  addHand(scene, camera3);

  BABYLON.SceneLoader.Append(
    "/models/",
    "Egyptian_map.glb",
    scene,
    function () {
      console.log("Scene égyptienne chargée !");
    },
    null,
    function (scene, message, exception) {
      console.error("Erreur chargement GLB :", message, exception);
    }
  );

  return scene;
}
