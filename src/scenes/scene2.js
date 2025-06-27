import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';
import { createScene3 } from './scene3.js';

export function createScene2(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const camera2 = new BABYLON.ArcRotateCamera("Camera2", Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
  camera2.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("Light2", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  // Ajout des mains (appel à la fonction importée)
  addHand(scene, camera2);

  BABYLON.SceneLoader.Append(
    "/models/",
    "env_egypt_map.glb",
    scene,
    function () {
      console.log("Scene égyptienne chargée !");
    },
    null,
    function (scene, message, exception) {
      console.error("Erreur chargement GLB :", message, exception);
    }
  );


  // Cube interactif au centre
    const cube2 = BABYLON.MeshBuilder.CreateBox("cube2", { size: 1 }, scene);
    cube2.position = new BABYLON.Vector3(0, 0.5, 0);
    const cubeMat = new BABYLON.StandardMaterial("cubeMat2", scene);
    cubeMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    cube2.material = cubeMat;
  
    // Activer les collisions du cube
    //cube.checkCollisions = true;
    cube2.actionManager = new BABYLON.ActionManager(scene);
    cube2.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
        const newScene = createScene3(engine, canvas);
        engine.runRenderLoop(() => {
          if (newScene.activeCamera) {
            newScene.render();
          }
        });
      })
    );
  

  return scene;
}
