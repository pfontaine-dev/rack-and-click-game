# 🖥️ Rack & Click Game

Un jeu incrémental (idle/clicker game) avec un thème datacenter/serveurs. Cliquez sur les racks pour générer des PU (Processing Units), achetez des améliorations et débloquez des succès !

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 Aperçu du jeu

- **Thème** : Datacenter / Serveurs / Tech
- **Monnaie** : PU (Processing Units)
- **Mécaniques** : Clic manuel + génération passive + améliorations + succès

## ✨ Fonctionnalités

### 🖱️ Gameplay
- ✅ Système de clic avec animation visuelle (+PU)
- ✅ Génération passive de PU/s
- ✅ Pouvoir de clic évolutif (×1, ×2, ×5...)
- ✅ Multiplicateurs globaux
- ✅ Gains hors ligne calculés automatiquement

### 🛒 Boutique
- 5 items disponibles avec effets croissants
- Prix évolutif (+15% à chaque achat)
- Affichage du nombre possédé
- Génération de PU/s

### ⚡ Améliorations
- 5 améliorations uniques
- Système de prérequis
- Améliorations permanentes
- Boost de clic et multiplicateurs

### 🏆 Succès
- 5 succès débloquables
- Notifications popup animées
- Suivi de progression
- Interface dédiée

### 💾 Sauvegarde
- Sauvegarde automatique (toutes les 5 secondes)
- LocalStorage natif
- Export JSON manuel
- Import de sauvegarde
- Réinitialisation complète

## 📁 Structure du projet

```
rack-click-game/
├── index.html                  # Structure HTML principale
├── README.md                   # Documentation
│
├── css/
│   ├── main.css               # Styles globaux et layout
│   ├── neon-effects.css       # Effets lumineux néon
│   ├── datacenter.css         # Styles serveurs et racks
│   ├── click-animation.css    # Animations de clic
│   ├── store.css              # Styles boutique
│   ├── upgrades.css           # Styles améliorations
│   ├── modals.css             # Styles fenêtres modales
│   └── achievements.css       # Styles succès
│
└── js/
    ├── main.js                # Point d'entrée et boucle
    ├── game.js                # Logique du jeu (classe Game)
    ├── ui.js                  # Interface utilisateur (classe UI)
    └── config.js              # Configuration (items, upgrades, etc.)
```

## 🚀 Installation

### Méthode 1 : Téléchargement direct
```bash
# Cloner ou télécharger le projet
git clone https://github.com/votre-username/rack-click-game.git
cd rack-click-game

# Ouvrir index.html dans votre navigateur
# Pas de serveur requis !
```

### Méthode 2 : Serveur local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js
npx serve

# Avec PHP
php -S localhost:8000
```

Puis ouvrir : `http://localhost:8000`

## 🎯 Comment jouer

### Démarrage
1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur les racks de serveurs pour gagner des PU
3. Achetez des items dans la boutique (section du bas)
4. Débloquez des améliorations (panneau de droite)

### Progression
- **Début** : Cliquez pour gagner 1 PU par clic
- **Boutique** : Achetez des serveurs pour générer des PU/s
- **Améliorations** : Augmentez votre pouvoir de clic
- **Succès** : Débloquez les 5 succès disponibles

### Stratégie
1. Commencez par cliquer pour accumuler ~50 PU
2. Achetez quelques "Serveur basique" (0.1 PU/s chacun)
3. Économisez pour "Clic renforcé I" (100 PU)
4. Continuez à alterner entre boutique et améliorations
5. Visez l'Auto-clicker (1000 PU) pour 10 PU/s passif

## ⚙️ Configuration

### Fichier `js/config.js`

#### Paramètres du jeu
```javascript
export const gameConfig = {
  saveInterval: 5000,        // Sauvegarde auto (ms)
  tickRate: 100,            // Mise à jour du jeu (ms)
  priceMultiplier: 1.15,    // Augmentation des prix
  localStorageKey: "rackClickGameSave"
};
```

#### Ajouter un item
```javascript
{
  id: "mon_item",
  name: "Mon Item",
  basePrice: 1000,
  owned: 0,
  effect: { type: "pus", value: 10 },
  description: "+10 PU/s"
}
```

#### Ajouter une amélioration
```javascript
{
  id: "mon_upgrade",
  name: "Mon Amélioration",
  price: 5000,
  owned: false,
  effect: { type: "click", value: 3 },
  description: "+3 PU par clic",
  requires: "autre_upgrade_id"  // optionnel
}
```

#### Ajouter un succès
```javascript
{
  id: "mon_succes",
  name: "Mon Succès",
  description: "Faire quelque chose",
  condition: (game) => game.totalClicks >= 1000,
  unlocked: false
}
```

## 🎨 Personnalisation

### Couleurs principales
```css
/* Vert néon principal */
--primary: #00ff00;

/* Orange succès */
--achievement: #f97316;

/* Fond sombre */
--bg-dark: #0a0f14;
--bg-light: #0e1a24;
```

### Police
Le jeu utilise **Share Tech Mono** (monospace tech).
Pour changer :
```css
body {
  font-family: 'Votre Police', monospace;
}
```

## 🔧 Développement

### Architecture
- **ES6 Modules** : Import/export natifs
- **Classes** : Game (logique) + UI (interface)
- **Séparation** : Configuration dans fichier dédié

### Ajouter une fonctionnalité

1. **Nouvelle mécanique de jeu**
   - Modifier `js/game.js` (classe Game)
   - Ajouter méthodes et propriétés

2. **Nouvel élément d'interface**
   - Modifier `js/ui.js` (classe UI)
   - Ajouter HTML si nécessaire

3. **Nouveau style**
   - Créer un fichier CSS thématique
   - L'inclure dans `index.html`

### Debug
Ouvrir la console (F12) et vérifier :
```javascript
// État du jeu
console.log(game);

// Forcer une sauvegarde
game.save();

// Ajouter des PU manuellement
game.pu += 10000;
ui.update();
```

## 📊 Mécaniques du jeu

### Formules

**Prix évolutif :**
```
Prix = PrixDeBase × (1.15 ^ NombrePossédé)
```

**PU par seconde :**
```
PU/s = (Σ Items × Effets) × Multiplicateur
```

**Gains hors ligne :**
```
GainsHorsLigne = PU/s × TempsAbsence(secondes)
```

## 💾 Gestion des sauvegardes

### LocalStorage
Sauvegarde automatique toutes les 5 secondes dans :
```
localStorage.rackClickGameSave
```

### Export JSON
Bouton "Exporter la sauvegarde" dans Paramètres :
- Télécharge un fichier `.json`
- Contient toute la progression
- Peut être partagé ou sauvegardé

### Import JSON
Bouton "Importer la sauvegarde" dans Paramètres :
- Sélectionner le fichier `.json`
- Écrase la sauvegarde actuelle
- Recharge la page automatiquement

### Réinitialisation
Bouton rouge "Réinitialiser le jeu" :
- ⚠️ Supprime toute progression
- Demande confirmation
- Recharge la page

## 🐛 Problèmes connus

### Le compteur ne s'actualise pas
- Vérifier qu'il n'y a qu'un seul `id="counter"` dans le HTML
- Vérifier que les fichiers JS sont bien en `type="module"`

### Les animations ne fonctionnent pas
- Vérifier que tous les fichiers CSS sont chargés
- Ouvrir la console pour voir les erreurs

### La sauvegarde ne marche pas
- Vérifier que localStorage n'est pas désactivé
- Tester en navigation privée (peut bloquer localStorage)

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Idées d'améliorations futures

- [ ] Plus d'items et d'améliorations
- [ ] Système de prestige
- [ ] Multiples datacenters
- [ ] Mini-jeux bonus
- [ ] Classement en ligne
- [ ] Thèmes de couleur alternatifs
- [ ] Mode sombre/clair
- [ ] Sons et effets audio
- [ ] Statistiques détaillées
- [ ] Graphiques de progression

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Créé avec ❤️ pour apprendre le développement de jeux incrémentaux.

## 🙏 Remerciements

- Inspiration : Cookie Clicker, Adventure Capitalist
- Design : Style cyberpunk/néon/terminal
- Police : Share Tech Mono (Google Fonts)

---

**Bon jeu ! 🎮✨**

Pour toute question ou suggestion : [Créer une issue](https://github.com/pfontaine-dev/rack-click-game/issues)