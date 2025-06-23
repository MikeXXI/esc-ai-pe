// src/objects/addHand.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

/**
 * Charge un seul modèle de main (hand.glb) et génère
 * une main gauche + une main droite (miroir) attachées à la caméra.
 *
 * @param {BABYLON.Scene}  scene  - La scène BabylonJS
 * @param {BABYLON.Camera} camera - La caméra FPS (ou autre) à laquelle coller les mains
 */
export async function addHand(scene, camera) {
  try {
    // ───────────────────────────────────────────────────────────────
    // 1) Import du modèle hand.glb (il doit se trouver dans /public/models/)
    // ───────────────────────────────────────────────────────────────
    const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
      "",            // importer tous les meshes
      "/models/",    // dossier
      "hand.glb",    // nom du fichier
      scene
    );

    // Le premier élément du tableau `meshes` est la main
    // (on suppose qu'il n'y a qu'un seul mesh dans le fichier hand.glb)
    const rightRoot = meshes[0];

    // ───────────────────────────────────────────────────────────────
    // 2) MAIN DROITE  (on garde le modèle original)
    // ───────────────────────────────────────────────────────────────
    rightRoot.parent   = camera;
    rightRoot.position = new BABYLON.Vector3(0.35, -0.4, 1.1);  // gauche / bas / avant
    rightRoot.scaling  = new BABYLON.Vector3( 0.6,  0.6, 0.6); // mise à l’échelle
    rightRoot.rotation = new BABYLON.Vector3(0.3, -2, 0); // rotation pour une meilleure orientation

    // ───────────────────────────────────────────────────────────────
    // 3) MAIN GAUCHE (clone + miroir sur l’axe X)
    // ───────────────────────────────────────────────────────────────
    const leftRoot = rightRoot.clone("leftHand");
    leftRoot.parent   = camera;
    leftRoot.position = new BABYLON.Vector3(-0.35, -0.4,  1.1); // droite / bas / avant
    leftRoot.scaling  = new BABYLON.Vector3( -0.6, 0.6, 0.6); // scaling X négatif = effet miroir
    leftRoot.rotation = new BABYLON.Vector3(0.3, 2, 0); // rotation pour une meilleure orientation


  } catch (err) {
    console.error("Erreur lors du chargement ou du clonage de la main :", err);
  }
}
