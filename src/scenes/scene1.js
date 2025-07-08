// src/scenes/scene1.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { addHand } from "../objects/addhand.js";
import { createScene2 } from "./scene2.js";
import { switchScene } from "../main.js";
import { addSphinxInterface } from "../objects/addSphinx.js"; 

export async function createScene1(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.1, 0); // gravité douce
  scene.name = "A1";
  engine.getRenderingCanvas().tabIndex = 1; // pour éviter certains bugs clavier

  // Camera FPS
  const camera = new BABYLON.UniversalCamera("FPSCam", new BABYLON.Vector3(5, 22, 5), scene);
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

  await addHand(scene, camera);

  // Lumière
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 22, 0), scene);

  // Portail interactif (remplace le cube) — on le cache au début
  const portalImport = await BABYLON.SceneLoader.ImportMeshAsync(
    "", "/models/enigma_1/", "statuette_isis.glb", scene
  );
  const portalMeshes = portalImport.meshes;
  portalMeshes.forEach(mesh => {
    mesh.position = new BABYLON.Vector3(0, 10, -5);
    mesh.checkCollisions = true;
    mesh.isVisible = false; // caché au début
  });

  camera.setTarget(new BABYLON.Vector3(5, 22, 0));

  const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
    "",            // importer tous les meshes
    "/models/",    // dossier
    "Egyptian_map.glb", // nom du fichier
    scene
  );
  // Optionnel : activer les collisions sur tous les meshes importés
  meshes.forEach(mesh => mesh.checkCollisions = true);
  meshes.position = new BABYLON.Vector3(0, 0, 0);

  // Liste des statuettes à enchaîner
  const enigmaStatuettes = [
    "statuette_hippo.glb",
    "statuette_falcon.glb",
    "statuette_axe.glb",
    "statuette_cross.glb",
    "statuette_isis.glb"
  ];
  const statuettePositions = [
    new BABYLON.Vector3(0, 15, 8),   // statuette_hippo
    new BABYLON.Vector3(1, 21.6, -3.5),    // statuette_falcon
    new BABYLON.Vector3(-1, 18.9, 2),    // statuette_axe
    new BABYLON.Vector3(-6.5, 21, 2),    // statuette_cross
    new BABYLON.Vector3(0, 10, -5)       // statuette_isis (exemple position, à ajuster)
  ];

  let statuetteMeshes = [];
  let clickSequence = [];
  const correctOrder = [
    "statuette_hippo.glb",
    "statuette_falcon.glb",
    "statuette_axe.glb",
    "statuette_cross.glb",
    "statuette_isis.glb"
  ];
  let successCube = null;

  for (let i = 0; i < enigmaStatuettes.length; i++) {
    const file = enigmaStatuettes[i];
    try {
      const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "", "/models/enigma_1/", file, scene
      );
      result.meshes.forEach(mesh => {
        mesh.position = statuettePositions[i];
        mesh.checkCollisions = true;
        mesh.isVisible = true; // Toutes visibles dès le début
        // Réduction de la taille pour la statuette_axe
        if (file === "statuette_axe.glb") {
          mesh.scaling = new BABYLON.Vector3(0.06, 0.06, 0.06);
          mesh.rotation = new BABYLON.Vector3(0, Math.PI / 0.6, 0);
        }
        // Ajout d'une rotation pour la statuette_hippo
        if (file === "statuette_hippo.glb") {
          mesh.rotation = new BABYLON.Vector3(0, Math.PI / 0.8, 1);
        }
        // // Ajout d'une rotation pour la statuette_hippo
        // if (file === "statuette_isis.glb") {
        //   mesh.rotation = new BABYLON.Vector3(0, Math.PI / 0.2, 1);
        // }
        mesh.actionManager = new BABYLON.ActionManager(scene);
        mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            // Ajoute le nom du fichier à la séquence de clics
            clickSequence.push(file);
            // Vérifie la séquence
            for (let j = 0; j < clickSequence.length; j++) {
              if (clickSequence[j] !== correctOrder[j]) {
                clickSequence = [];
                // Optionnel : feedback visuel/sonore d'erreur
                return;
              }
            }
            // Si la séquence est complète et correcte
            if (clickSequence.length === correctOrder.length) {
              // Passe à la scène suivante
              switchScene(createScene2);
            }
          })
        );
      });
      statuetteMeshes.push(result.meshes);
    } catch (e) {
      console.error("Erreur chargement statuette:", file, e);
      statuetteMeshes.push([]); // pour garder l'index aligné
    }
  }

  // Rendre le portail interactif (après la boucle)
  portalMeshes.forEach(mesh => {
    if (mesh.name !== "__root__") {
      mesh.actionManager = new BABYLON.ActionManager(scene);
      mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
          switchScene(createScene2);
        })
      );
    }
  });

  // Crée un sol invisible juste sous la caméra, à la hauteur du dessus de la carte
  const invisibleGround = BABYLON.MeshBuilder.CreateBox("invisibleGround", {
    width: 28, // adapte à la taille de ta carte
    depth: 28,
    height: 0.5
  }, scene);
  invisibleGround.position = new BABYLON.Vector3(0, 21, 0); // adapte Y à la hauteur du dessus de la carte
  invisibleGround.isVisible = false;
  invisibleGround.checkCollisions = true;

  // Murs invisibles pour empêcher la sortie de la carte
  const wallThickness = 0.5;
  const wallHeight = 5;
  const mapSize = 30; // adapte à la taille de ta carte
  const wallY = 23.5; // hauteur du mur (au-dessus du sol)

  // Mur Nord
  const wallNorth = BABYLON.MeshBuilder.CreateBox("wallNorth", {
    width: mapSize,
    height: wallHeight,
    depth: wallThickness
  }, scene);
  wallNorth.position = new BABYLON.Vector3(0, wallY, -mapSize/2);
  wallNorth.isVisible = false;
  wallNorth.checkCollisions = true;

  // Mur Sud
  const wallSouth = BABYLON.MeshBuilder.CreateBox("wallSouth", {
    width: mapSize,
    height: wallHeight,
    depth: wallThickness
  }, scene);
  wallSouth.position = new BABYLON.Vector3(0, wallY, (mapSize/2) - 7);
  wallSouth.isVisible = false;
  wallSouth.checkCollisions = true;

  // Mur Est
  const wallEast = BABYLON.MeshBuilder.CreateBox("wallEast", {
    width: wallThickness,
    height: wallHeight,
    depth: mapSize
  }, scene);
  wallEast.position = new BABYLON.Vector3((mapSize/2) - 7, wallY, 0);
  wallEast.isVisible = false;
  wallEast.checkCollisions = true;

  // Mur Ouest
  const wallWest = BABYLON.MeshBuilder.CreateBox("wallWest", {
    width: wallThickness,
    height: wallHeight,
    depth: mapSize
  }, scene);
  wallWest.position = new BABYLON.Vector3(-mapSize/2, wallY, 0);
  wallWest.isVisible = false;
  wallWest.checkCollisions = true;

  addSphinxInterface(scene);

  return scene;  
}

