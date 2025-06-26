# API Flask - Pont entre le jeu et Botpress

Cet API Flask sert de passerelle entre le jeu et le Botpress. L'API reçoit les questions du joueur, les enrichit avec le contexte (salle, environnement), puis interroge Botpress pour fournir une réponse adaptée.

## Arborescence

```
api/
├── app.py
├── requirements.txt
├── bridge/
│   └── routes.py
├── models/
│   └── __init__.py
└── services/
    └── botpress_service.py
```

## Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/MikeXXI/esc-ai-pe.git
   cd esc-ai-pe/api
   ```

2. **Créer un environnement virtuel**  
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Installer les dépendances**  
   ```bash
   pip install -r requirements.txt
   ```

## Lancement de l'API

```bash
python app.py
```

L'API sera accessible sur `http://0.0.0.0:5000/`.

## Utilisation

- **Endpoint principal :**  
  `POST /ask`  
  Permet d'envoyer une question à Botpress avec le contexte du jeu.

  **Exemple de requête :**
  ```json
  {
    "question": "Comment ouvrir la porte ?",
    "environment": "sombre",
    "room": "salle 2"
  }
  ```

  **Réponse :**
  ```json
  {
    "response": "Essayez d'utiliser la clé trouvée sous le tapis."
  }
  ```

## Structure du code

- `app.py` : Point d'entrée de l'application Flask.
- `bridge/routes.py` : Définit les routes de l'API.
- `services/botpress_service.py` : Gère la communication avec Botpress.
- `models/` : (À compléter selon les besoins du projet.)

## Configuration

- Modifier l'URL de Botpress dans `services/botpress_service.py` selon votre déploiement.

---

**Auteur** : Lilian Chardon, Lisa Lucas
**Licence** : MIT
