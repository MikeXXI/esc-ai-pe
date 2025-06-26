import * as BABYLON from "babylonjs";
import { createScene1 } from "./scenes/scene1.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

(async () => {
  const scene = await createScene1(engine, canvas);
  engine.runRenderLoop(() => {
    scene.render();
  });
})();

window.addEventListener("resize", () => {
  engine.resize(); // Redimensionne automatiquement le canvas si la fenêtre change
});