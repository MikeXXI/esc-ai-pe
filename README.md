# esc-ai-pe

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-2.0.0-brightgreen?style=flat-square)

## Description du projet

**esc-ai-pe** est un projet innovant qui utilise des modèles 3D pour créer des scènes interactives. Ce projet est conçu pour démontrer des capacités d'intelligence artificielle à travers des objets et des environnements virtuels. Il permet aux utilisateurs d'explorer des scènes variées, telles que des environnements cyberpunk et des parkings, tout en interagissant avec des objets comme des murs et des mains.

### Fonctionnalités clés
- Intégration de modèles 3D variés.
- Scènes interactives avec des objets manipulables.
- Utilisation de JavaScript moderne et de Vite pour un développement rapide.

## Tech Stack

| Technologie      | Description                          |
|------------------|--------------------------------------|
| ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square) | Langage de programmation utilisé.   |
| ![Vite](https://img.shields.io/badge/Vite-2.0.0-brightgreen?style=flat-square) | Outil de construction pour le développement rapide. |

## Instructions d'installation

### Prérequis
- Node.js (version 12 ou supérieure)
- npm (généralement installé avec Node.js)

### Guide d'installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/MikeXXI/esc-ai-pe.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd esc-ai-pe
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```

### Configuration de l'environnement
Aucune variable d'environnement spécifique n'est requise pour ce projet.

## Utilisation

Pour exécuter le projet, utilisez la commande suivante :
```bash
npm run dev
```
Cela lancera le serveur de développement et vous pourrez accéder à l'application à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du projet

Voici un aperçu de la structure du projet :

```
esc-ai-pe/
├── public/
│   ├── images/                 # Contient les images utilisées dans le projet
│   │   ├── javascript.svg
│   │   └── vite.svg
│   └── models/                 # Modèles 3D utilisés dans les scènes
│       ├── ground.glb
│       ├── hand.glb
│       ├── scene_cyberpunk.glb
│       ├── scene_parking.glb
│       ├── sphinx_nose.glb
│       ├── sphinx_statue.glb
│       └── wall.glb
├── src/
│   ├── api/                    # Logique d'API pour l'intelligence artificielle
│   │   └── ia.js
│   ├── objects/                # Scripts pour ajouter des objets dans les scènes
│   │   ├── addground.js
│   │   ├── addhand.js
│   │   └── addwall.js
│   ├── scenes/                 # Scripts pour gérer les différentes scènes
│   │   ├── scene1.js
│   │   ├── scene2.js
│   │   └── scene3.js
│   ├── main.js                 # Point d'entrée principal de l'application
│   └── style.css               # Styles CSS pour l'application
├── .gitignore                  # Fichiers à ignorer par Git
├── index.html                  # Fichier HTML principal
├── package-lock.json           # Fichier de verrouillage des dépendances
└── package.json                # Fichier de configuration des dépendances
```

### Explication des fichiers principaux
- **index.html** : Le fichier HTML principal qui charge l'application.
- **main.js** : Le point d'entrée de l'application qui initialise les scènes et les objets.
- **style.css** : Fichier de styles pour l'application.
- **api/ia.js** : Contient la logique d'intelligence artificielle.
- **objects/** : Contient des scripts pour ajouter des objets 3D dans les scènes.
- **scenes/** : Contient des scripts pour gérer différentes scènes interactives.

## Contribuer

Les contributions sont les bienvenues ! Veuillez suivre ces étapes pour contribuer :
1. Forkez le projet.
2. Créez votre branche (`git checkout -b feature/YourFeature`).
3. Commitez vos modifications (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/YourFeature`).
5. Ouvrez une Pull Request.

Nous apprécions toutes les contributions et suggestions pour améliorer ce projet !
