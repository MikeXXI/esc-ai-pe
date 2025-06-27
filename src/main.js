import * as BABYLON from "babylonjs";
import { createScene1 } from "./scenes/scene1.js";
import { createScene2 } from "./scenes/scene2.js";
import { createScene3 } from "./scenes/scene3.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

let currentScene = null;

// Fonction pour changer de scène proprement
async function switchScene(createSceneFunc) {
  if (currentScene) {
    currentScene.dispose();
  }
  currentScene = await createSceneFunc(engine, canvas);
}

// Lancer la première scène
switchScene(createScene1);

// RenderLoop dynamique
engine.runRenderLoop(() => {
  if (currentScene && currentScene.activeCamera) {
    currentScene.render();
  }
});

window.addEventListener("resize", () => {
  engine.resize(); // Redimensionne automatiquement le canvas si la fenêtre change
});

// Export pour permettre aux autres modules de changer de scène
export { switchScene };