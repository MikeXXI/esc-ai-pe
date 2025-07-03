import * as BABYLON from "babylonjs";

/**
 * Ajoute l'interface Sphinx (image + boîte de chat) à une scène
 * @param {BABYLON.Scene} scene - La scène BabylonJS
 * @returns {Object} - Objet contenant les références aux éléments DOM pour nettoyage
 */
export function addSphinxInterface(scene) {
  // --- Interface Sphinx en haut à droite ---
  const sphinxContainer = document.createElement('div');
  sphinxContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    cursor: pointer;
  `;

  const sphinxImage = document.createElement('img');
  sphinxImage.src = '/images/sphinx.png';
  sphinxImage.style.cssText = `
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #gold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  `;

  // Boîte de chat (cachée par défaut)
  const chatBox = document.createElement('div');
  chatBox.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    width: 300px;
    height: 400px;
    background: rgba(0,0,0,0.8);
    border: 2px solid #gold;
    border-radius: 10px;
    display: none;
    z-index: 1001;
    padding: 15px;
    color: white;
  `;

  const chatHeader = document.createElement('div');
  chatHeader.innerHTML = '<h3 style="margin: 0 0 10px 0; color: #gold;">Sphinx IA</h3>';
  
  const chatMessages = document.createElement('div');
  chatMessages.style.cssText = `
    height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 5px;
  `;

  const chatInput = document.createElement('input');
  chatInput.type = 'text';
  chatInput.placeholder = 'Tapez votre message...';
  chatInput.style.cssText = `
    width: 90%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background: rgba(255,255,255,0.9);
    color: black;
  `;

  const closeButton = document.createElement('button');
  closeButton.innerHTML = 'X';
  closeButton.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
  `;

  // Assemblage de l'interface
  chatBox.appendChild(closeButton);
  chatBox.appendChild(chatHeader);
  chatBox.appendChild(chatMessages);
  chatBox.appendChild(chatInput);
  sphinxContainer.appendChild(sphinxImage);
  
  document.body.appendChild(sphinxContainer);
  document.body.appendChild(chatBox);

  // Gestion des événements
  let isChatOpen = false;

  sphinxImage.addEventListener('click', () => {
    if (!isChatOpen) {
      chatBox.style.display = 'block';
      chatInput.focus();
      isChatOpen = true;
    }
  });

  closeButton.addEventListener('click', () => {
    chatBox.style.display = 'none';
    isChatOpen = false;
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
      const message = chatInput.value.trim();
      chatMessages.innerHTML += `<div style="margin: 5px 0; padding: 5px; background: rgba(0,255,0,0.2); border-radius: 3px;">Vous: ${message}</div>`;
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Ici tu peux ajouter la logique pour traiter le message
      console.log('Message envoyé:', message);
    }
  });

  // Nettoyage lors du changement de scène
  scene.onDisposeObservable.add(() => {
    if (document.body.contains(sphinxContainer)) {
      document.body.removeChild(sphinxContainer);
    }
    if (document.body.contains(chatBox)) {
      document.body.removeChild(chatBox);
    }
  });

  // Retourner les références pour un nettoyage manuel si nécessaire
  return {
    sphinxContainer,
    chatBox,
    cleanup: () => {
      if (document.body.contains(sphinxContainer)) {
        document.body.removeChild(sphinxContainer);
      }
      if (document.body.contains(chatBox)) {
        document.body.removeChild(chatBox);
      }
    }
  };
}
