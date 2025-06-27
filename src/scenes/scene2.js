import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';
import { createScene3 } from './scene3.js';
import { switchScene } from '../main.js';

export async function createScene2(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const camera2 = new BABYLON.ArcRotateCamera("Camera2", 0, 0, 5, BABYLON.Vector3.Zero(), scene);
  camera2.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("Light2", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Ajout des mains (appel à la fonction importée)
  addHand(scene, camera2);  


  const cubeImport = await BABYLON.SceneLoader.ImportMeshAsync(
    "",            // importer tous les meshess
    "/models/",    // dossier
    "cube_demo.glb", // nom du fichier
    scene
  );
  const cubeMeshes = cubeImport.meshes;
  cubeMeshes.forEach(mesh => {
    mesh.position = new BABYLON.Vector3(0, 0, 0);
    mesh.checkCollisions = true;
    mesh.isVisible = true;
    if (mesh.name !== "__root__") {
      mesh.actionManager = new BABYLON.ActionManager(scene);
      mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
          switchScene(createScene3);
        })
      );
    }

  });

  const cube2 = BABYLON.MeshBuilder.CreateBox("cube2", { size: 1.5 }, scene);
  cube2.position = new BABYLON.Vector3(2.5, 2, 0);
  const cubeMat = new BABYLON.StandardMaterial("cubeMat2", scene);
  cubeMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  cube2.material = cubeMat;

  // Centrer la caméra sur le cube
  camera2.setTarget(new BABYLON.Vector3(2.5, 2, 0));


  return scene;
}
