// src/scenes/scene1.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { addHand } from "../objects/addhand.js";
import { addWall } from "../objects/addwall.js";
import { addGround } from "../objects/addground.js";

export function createScene1(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;


  // Camera FPS
  const camera = new BABYLON.UniversalCamera("FPSCam", new BABYLON.Vector3(0, 2, -5), scene);
  camera.attachControl(canvas, true);
  // let inputMap = {};
  // scene.actionManager = new BABYLON.ActionManager(scene);
  // scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
  //   BABYLON.ActionManager.OnKeyDownTrigger,
  //   evt => inputMap[evt.sourceEvent.key.toLowerCase()] = true
  // ));

  scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnKeyUpTrigger,
    evt => inputMap[evt.sourceEvent.key.toLowerCase()] = false
  ));

  camera.speed = 0.5;
  camera.inertia = 0.7;

  // Activer les collisions de la caméra
  camera.checkCollisions = true;
  //camera.applyGravity = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1); // Ellipsoïde pour les collisions de la caméra

  // Ajout des mains (appel à la fonction importée)
  addHand(scene, camera);

  // Lumière
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  // Sol
  addGround(scene, camera);

  // Murs (4 murs autour)
  addWall(scene);

  // Cube interactif au centre
  const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
  cube.position = new BABYLON.Vector3(0, 0.5, 0);
  const cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
  cubeMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  cube.material = cubeMat;

 


  return scene;  
}

