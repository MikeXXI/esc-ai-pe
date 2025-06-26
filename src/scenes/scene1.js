// src/scenes/scene1.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { addHand } from "../objects/addhand.js";
import { addWall } from "../objects/addwall.js";
import { addGround } from "../objects/addground.js";
import { createScene2 } from "./scene2.js";

export async function createScene1(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.1, 0); // gravité plus douce
  engine.getRenderingCanvas().tabIndex = 1; // pour éviter certains bugs clavier

  // Camera FPS
  const camera = new BABYLON.UniversalCamera("FPSCam", new BABYLON.Vector3(0, 2, -5), scene);
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

  // Attendre le chargement des objets
  await addGround(scene, camera);
  await addWall(scene);
  await addHand(scene, camera);

  // Lumière
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  // Cube interactif au centre
  const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
  cube.position = new BABYLON.Vector3(0, 0.5, 0);
  const cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
  cubeMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  cube.material = cubeMat;

  // Activer les collisions du cube
  cube.checkCollisions = true;
  cube.actionManager = new BABYLON.ActionManager(scene);
  cube.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      const newScene = createScene2(engine, canvas);
      engine.runRenderLoop(() => {
        if (newScene.activeCamera) {
          newScene.render();
        }
      });
    })
  );

  return scene;  
}

