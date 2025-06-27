import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';

export function createScene4(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  // Caméra
  const camera4 = new BABYLON.ArcRotateCamera(
    "Camera4",
    Math.PI / 2,
    Math.PI / 4,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera4.attachControl(canvas, true);

  // Lumière
  const light = new BABYLON.HemisphericLight("Light4", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  // Ajout des mains
  // addHand(scene, camera4);

  // Chargement de la statue (très petite)
  BABYLON.SceneLoader.Append(
    "/models/",
    "sphinx_statue_scale.glb",
    scene,
    function (scene) {
      const statue = scene.meshes.find(mesh =>
        mesh.name === "__root__" || mesh.name.toLowerCase().includes("sphinx")
      );
      if (statue) {
        statue.scaling = new BABYLON.Vector3(1, 1, 1);
        statue.position = new BABYLON.Vector3(0, 0, 0);
      }
      console.log("Statue chargée !");
    },
    null,
    function (scene, message, exception) {
      console.error("Erreur chargement statue :", message, exception);
    }
  );

  // Chargement du nez (très grand avec normalisation)
  BABYLON.SceneLoader.Append(
    "/models/",
    "sphinx_nose_scale.glb",
    scene,
    function (scene) {
      const nose = scene.meshes.find(mesh =>
        mesh.name === "__root__" || mesh.name.toLowerCase().includes("nose")
      );
      if (nose) {
        // Redimensionne à une unité standard
        nose.normalizeToUnitCube();

        // Applique un grand scaling
        nose.scaling = new BABYLON.Vector3(1, 1, 1);

        // Position du nez
        nose.position = new BABYLON.Vector3(-10.25, -11.5, 0);
        nose.rotation = new BABYLON.Vector3(0, -Math.PI, 0);

        // Optionnel : matériau rouge pétant
        const mat = new BABYLON.StandardMaterial("noseMat", scene);
        mat.diffuseColor = new BABYLON.Color3(1, 0, 0);
        nose.material = mat;

        // Debug visuel
        console.log("Bounding box du nez :", nose.getBoundingInfo().boundingBox.extendSize);
      }
      console.log("Nez du sphinx chargé !");
    },
    null,
    function (scene, message, exception) {
      console.error("Erreur chargement nez :", message, exception);
    }
  );

  return scene;
}