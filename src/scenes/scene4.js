import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { addHand } from '../objects/addhand.js';
// Tu peux déclarer ta caméra ici pour y accéder plus bas
let camera4;

export function createScene4(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  // Caméra
  camera4 = new BABYLON.ArcRotateCamera(
    "Camera4",
    Math.PI / 2,
    Math.PI / 2,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera4.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("Light4", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  // Chargement de la statue
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
    }
  );

  // Chargement du nez
  BABYLON.SceneLoader.Append(
    "/models/",
    "sphinx_nose_scale.glb",
    scene,
    function (scene) {
      const nose = scene.meshes.find(mesh =>
        mesh.name === "__root__" || mesh.name.toLowerCase().includes("nose")
      );
      if (nose) {
        nose.normalizeToUnitCube();
        nose.scaling = new BABYLON.Vector3(1, 1, 1);
        nose.position = new BABYLON.Vector3(-10.25, -11.5, 0); // position de départ à gauche
        nose.rotation = new BABYLON.Vector3(0, -Math.PI, 0);

        const mat = new BABYLON.StandardMaterial("noseMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0, 0, 0);
        nose.material = mat;

        // Animation du nez : va de x = -10.25 à x = 5, sur 5 secondes (300 frames)
        const animation = new BABYLON.Animation(
          "noseSlide",
          "position.x",
          60,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        animation.setKeys([
          { frame: 0, value: -15 },
          { frame: 300, value: -10.25 }
        ]);

        const easing = new BABYLON.SineEase();
        easing.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        animation.setEasingFunction(easing);

        nose.animations = [animation];

        scene.beginAnimation(nose, 0, 300, false, 1, () => {
          console.log("Animation terminée !");

          // Rotation caméra vers la gauche (90°)
          camera4.alpha -= Math.PI / 2;

          // Lecture audio
          const audio = new Audio("/sounds/sphinx_voice.mp3");
          audio.play().catch(err => console.error("Erreur lecture audio :", err));
        });
      }
    }
  );

  return scene;
}