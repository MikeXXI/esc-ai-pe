import * as BABYLON from "babylonjs";
import { createScene1 } from "./scenes/Scene1";

const canvas = document.createElement("canvas");
canvas.id = "renderCanvas";
document.body.appendChild(canvas);

const engine = new BABYLON.Engine(canvas, true);
let scene = createScene1(engine, canvas);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});