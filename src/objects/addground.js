// src/objects/addGround.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

/**
 * Charge un modèle de sol (ground.glb)
 *
 * @param {BABYLON.Scene}  scene  - La scène BabylonJS
 * 
 */
export async function addGround(scene, camera) {
  try {
    // ───────────────────────────────────────────────────────────────
    // 1) Import du modèle ground.glb (il doit se trouver dans /public/models/)
    // ───────────────────────────────────────────────────────────────
    const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
      "",            // importer tous les meshes
      "/models/",    // dossier
      "ground.glb",    // nom du fichier
      scene
    );

    // Le premier élément du tableau `meshes` est le sol
    // (on suppose qu'il n'y a qu'un seul mesh dans le fichier ground.glb)
    const groundRoot = meshes[0];

    // ───────────────────────────────────────────────────────────────
    // 1) Affichage du sol
    // ───────────────────────────────────────────────────────────────
    // Positionner le sol
    groundRoot.position = new BABYLON.Vector3(0, 0, 0);
    groundRoot.scaling = new BABYLON.Vector3(10, 1, 10); // Mise à l'échelle pour couvrir une grande surface
    groundRoot.rotation = new BABYLON.Vector3(0, 0, 0); // Pas de rotation nécessaire
    groundRoot.checkCollisions = true; // Activer les collisions pour le sol

    // Sol invisible collisionneur sous le sol GLB
    const collisionGround = BABYLON.MeshBuilder.CreateBox("collisionGround", {
      width: 100,
      height: 2, // épaisseur
      depth: 100
    }, scene);
    collisionGround.position = new BABYLON.Vector3(0, -1, 0); // sous le sol GLB
    collisionGround.isVisible = false;
    collisionGround.checkCollisions = true;

  } catch (err) {
    console.error("Erreur lors du chargement ou du clonage de la main :", err);
  }
}
