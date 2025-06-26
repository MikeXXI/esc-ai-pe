// Importation de la bibliothèque Babylon.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export async function addWall(scene) {
  try {
    const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "wall.glb",
      scene
    );

    const wall = meshes[0];
    

    // Avant
    const frontWall = wall.clone("frontWall");
    frontWall.position = new BABYLON.Vector3(0, 0, 9.5);
    frontWall.rotation = new BABYLON.Vector3(0, 0, 0);
    frontWall.scaling = new BABYLON.Vector3(3.1, 2, 1);
    frontWall.checkCollisions = true; // Activer les collisions pour le mur avant
    // Collisionneur invisible
    const frontWallCollider = BABYLON.MeshBuilder.CreateBox("frontWallCollider", {
      width: 9.3, height: 2, depth: 1
    }, scene);
    frontWallCollider.position = new BABYLON.Vector3(0, 1, 9.5);
    frontWallCollider.isVisible = false;
    frontWallCollider.checkCollisions = true;

    // Arrière
    const backWall = wall.clone("backWall");
    backWall.position = new BABYLON.Vector3(0, 0, -9.5);
    backWall.rotation = new BABYLON.Vector3(0, Math.PI, 0);
    backWall.scaling = new BABYLON.Vector3(3.1, 2, 1);
    backWall.checkCollisions = true; // Activer les collisions pour le mur arrière
    // Collisionneur invisible
    const backWallCollider = BABYLON.MeshBuilder.CreateBox("backWallCollider", {
      width: 9.3, height: 2, depth: 1
    }, scene);
    backWallCollider.position = new BABYLON.Vector3(0, 1, -9.5);
    backWallCollider.isVisible = false;
    backWallCollider.checkCollisions = true;

    // Gauche
    const leftWall = wall.clone("leftWall");
    leftWall.position = new BABYLON.Vector3(-9.5, 0, 0);
    leftWall.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
    leftWall.scaling = new BABYLON.Vector3(3.1, 2, 1);
    leftWall.checkCollisions = true; // Activer les collisions pour le mur gauche
    // Collisionneur invisible
    const leftWallCollider = BABYLON.MeshBuilder.CreateBox("leftWallCollider", {
      width: 1, height: 2, depth: 20
    }, scene);
    leftWallCollider.position = new BABYLON.Vector3(-9.5, 1, 0);
    leftWallCollider.isVisible = false;
    leftWallCollider.checkCollisions = true;

    // Droite
    const rightWall = wall.clone("rightWall");
    rightWall.position = new BABYLON.Vector3(9.5, 0, 0);
    rightWall.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    rightWall.scaling = new BABYLON.Vector3(3.1, 2, 1);
    rightWall.checkCollisions = true; // Activer les collisions pour le mur droit
    // Collisionneur invisible
    const rightWallCollider = BABYLON.MeshBuilder.CreateBox("rightWallCollider", {
      width: 1, height: 2, depth: 20
    }, scene);
    rightWallCollider.position = new BABYLON.Vector3(9.5, 1, 0);
    rightWallCollider.isVisible = false;
    rightWallCollider.checkCollisions = true;

    //wall.setEnabled(false); // Désactiver le mur original pour ne pas l'afficher
    wall.dispose(); // Nettoyer le mesh original

  } catch (err) {
    console.error("Erreur lors du chargement ou du clonage du mur :", err);
  }
}
