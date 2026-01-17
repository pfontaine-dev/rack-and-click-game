import { storeItems, upgradeItems, achievements, gameConfig } from './config.js';

export class Game {
  constructor() {
    this.pu = 0; // PU actuels
    this.totalPU = 0; // PU gagnés au total
    this.clickPower = 1; // PU par clic
    this.basePS = 0; // PU par seconde de base
    this.multiplier = 1; // Multiplicateur global
    this.totalClicks = 0;
    this.totalPurchases = 0;
    this.upgradesOwned = 0; // Nombre d'upgrades possédés
    this.items = {}; // Raccourci pour accéder aux items par ID
    this.storeItems = JSON.parse(JSON.stringify(storeItems));
    this.upgradeItems = JSON.parse(JSON.stringify(upgradeItems));
    this.achievements = JSON.parse(JSON.stringify(achievements));
    this.lastTick = Date.now();
    
    // Initialiser le raccourci items
    this.updateItemsShortcut();
  }

  // Raccourci pour accéder aux items par ID
  updateItemsShortcut() {
    this.items = {};
    this.storeItems.forEach(item => {
      this.items[item.id] = item.owned;
    });
  }

  // Vérifier si on possède un upgrade
  hasUpgrade(upgradeId) {
    const upgrade = this.upgradeItems.find(u => u.id === upgradeId);
    return upgrade ? upgrade.owned : false;
  }

  // Calcul des PU/s
  getPUS() {
    let pus = this.basePS;
    let itemMultiplier = 1;
    
    // Ajouter les PU/s de chaque item
    this.storeItems.forEach(item => {
      if (item.effect.type === "pus") {
        pus += item.owned * item.effect.value;
      } else if (item.effect.type === "multiplier") {
        // Les multiplicateurs des items s'empilent
        itemMultiplier *= Math.pow(item.effect.value, item.owned);
      }
    });

    // Ajouter les PU/s des améliorations
    this.upgradeItems.forEach(upgrade => {
      if (upgrade.owned && upgrade.effect.type === "pus") {
        pus += upgrade.effect.value;
      }
    });

    // Appliquer les multiplicateurs (items + upgrades)
    pus *= itemMultiplier * this.multiplier;

    return pus;
  }

  // Mise à jour du multiplicateur
  updateMultiplier() {
    this.multiplier = 1;
    this.upgradeItems.forEach(upgrade => {
      if (upgrade.owned && upgrade.effect.type === "multiplier") {
        this.multiplier *= upgrade.effect.value;
      }
    });
  }

  // Mise à jour du pouvoir de clic
  updateClickPower() {
    this.clickPower = 1;
    this.upgradeItems.forEach(upgrade => {
      if (upgrade.owned && upgrade.effect.type === "click") {
        this.clickPower += upgrade.effect.value;
      }
    });
  }

  // Clic
  click() {
    this.pu += this.clickPower;
    this.totalPU += this.clickPower;
    this.totalClicks++;
    this.checkAchievements();
  }

  // Calcul du prix d'un item
  getItemPrice(item) {
    return Math.floor(item.basePrice * Math.pow(gameConfig.priceMultiplier, item.owned));
  }

  // Achat d'un item de la boutique
  buyStoreItem(itemId) {
    const item = this.storeItems.find(i => i.id === itemId);
    if (!item) return false;

    const price = this.getItemPrice(item);
    if (this.pu >= price) {
      this.pu -= price;
      item.owned++;
      this.totalPurchases++;
      this.updateItemsShortcut();
      this.checkAchievements();
      return true;
    }
    return false;
  }

  // Achat d'une amélioration
  buyUpgrade(upgradeId) {
    const upgrade = this.upgradeItems.find(u => u.id === upgradeId);
    if (!upgrade) return false;
    if (upgrade.owned) return false;

    // Vérifier les prérequis
    if (upgrade.requires) {
      const required = this.upgradeItems.find(u => u.id === upgrade.requires);
      if (!required || !required.owned) return false;
    }

    if (this.pu >= upgrade.price) {
      this.pu -= upgrade.price;
      upgrade.owned = true;
      this.upgradesOwned++;
      this.totalPurchases++;
      this.updateClickPower();
      this.updateMultiplier();
      this.checkAchievements();
      return true;
    }
    return false;
  }

  // Tick du jeu (appelé régulièrement)
  tick() {
    const now = Date.now();
    const delta = (now - this.lastTick) / 1000; // Delta en secondes
    this.lastTick = now;

    const pus = this.getPUS();
    const gained = pus * delta;
    this.pu += gained;
    this.totalPU += gained;
    
    this.checkAchievements();
  }

  // Vérification des succès
  checkAchievements() {
    // Importer les conditions depuis config
    import('./config.js').then(module => {
      const achievementTemplates = module.achievements;
      
      this.achievements.forEach((achievement, index) => {
        const template = achievementTemplates.find(t => t.id === achievement.id);
        if (template && !achievement.unlocked && template.condition(this)) {
          achievement.unlocked = true;
          this.showAchievementNotification(achievement);
        }
      });
    });
  }

  showAchievementNotification(achievement) {
    // Cette fonction sera implémentée dans ui.js
    if (window.showAchievementNotification) {
      window.showAchievementNotification(achievement);
    }
  }

  // Sauvegarde
  save() {
    const saveData = {
      pu: this.pu,
      totalPU: this.totalPU,
      clickPower: this.clickPower,
      basePS: this.basePS,
      multiplier: this.multiplier,
      totalClicks: this.totalClicks,
      totalPurchases: this.totalPurchases,
      upgradesOwned: this.upgradesOwned,
      storeItems: this.storeItems,
      upgradeItems: this.upgradeItems,
      achievements: this.achievements.map(a => ({ id: a.id, unlocked: a.unlocked })),
      timestamp: Date.now()
    };
    localStorage.setItem(gameConfig.localStorageKey, JSON.stringify(saveData));
  }

  // Chargement
  load() {
    const saveData = localStorage.getItem(gameConfig.localStorageKey);
    if (saveData) {
      try {
        const data = JSON.parse(saveData);
        this.pu = data.pu || 0;
        this.totalPU = data.totalPU || 0;
        this.clickPower = data.clickPower || 1;
        this.basePS = data.basePS || 0;
        this.multiplier = data.multiplier || 1;
        this.totalClicks = data.totalClicks || 0;
        this.totalPurchases = data.totalPurchases || 0;
        this.upgradesOwned = data.upgradesOwned || 0;
        this.storeItems = data.storeItems || this.storeItems;
        this.upgradeItems = data.upgradeItems || this.upgradeItems;
        
        // Mettre à jour le raccourci items
        this.updateItemsShortcut();
        
        // Pour les achievements, ne charger que l'état unlocked
        if (data.achievements) {
          this.achievements.forEach(achievement => {
            const savedAchievement = data.achievements.find(a => a.id === achievement.id);
            if (savedAchievement) {
              achievement.unlocked = savedAchievement.unlocked;
            }
          });
        }
        
        // Calculer le temps écoulé hors ligne
        if (data.timestamp) {
          const offlineTime = (Date.now() - data.timestamp) / 1000; // en secondes
          const offlineGain = this.getPUS() * offlineTime;
          if (offlineGain > 0) {
            this.pu += offlineGain;
            this.totalPU += offlineGain;
            alert(`Gains hors ligne: ${offlineGain.toFixed(2)} PU (${(offlineTime / 60).toFixed(1)} minutes)`);
          }
        }
        
        this.lastTick = Date.now();
        return true;
      } catch (e) {
        console.error("Erreur lors du chargement:", e);
        return false;
      }
    }
    return false;
  }

  // Export en JSON
  exportSave() {
    const saveData = {
      pu: this.pu,
      totalPU: this.totalPU,
      clickPower: this.clickPower,
      basePS: this.basePS,
      multiplier: this.multiplier,
      totalClicks: this.totalClicks,
      totalPurchases: this.totalPurchases,
      upgradesOwned: this.upgradesOwned,
      storeItems: this.storeItems,
      upgradeItems: this.upgradeItems,
      achievements: this.achievements.map(a => ({ id: a.id, name: a.name, description: a.description, unlocked: a.unlocked })),
      timestamp: Date.now(),
      version: "1.0"
    };
    
    const dataStr = JSON.stringify(saveData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rack_click_save_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Import depuis JSON
  importSave(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      this.pu = data.pu || 0;
      this.totalPU = data.totalPU || 0;
      this.clickPower = data.clickPower || 1;
      this.basePS = data.basePS || 0;
      this.multiplier = data.multiplier || 1;
      this.totalClicks = data.totalClicks || 0;
      this.totalPurchases = data.totalPurchases || 0;
      this.upgradesOwned = data.upgradesOwned || 0;
      this.storeItems = data.storeItems || this.storeItems;
      this.upgradeItems = data.upgradeItems || this.upgradeItems;
      
      // Mettre à jour le raccourci items
      this.updateItemsShortcut();
      
      // Pour les achievements, ne charger que l'état unlocked
      if (data.achievements) {
        this.achievements.forEach(achievement => {
          const savedAchievement = data.achievements.find(a => a.id === achievement.id);
          if (savedAchievement) {
            achievement.unlocked = savedAchievement.unlocked;
          }
        });
      }
      
      this.lastTick = Date.now();
      this.save();
      return true;
    } catch (e) {
      console.error("Erreur lors de l'import:", e);
      return false;
    }
  }

  // Réinitialisation
  reset() {
    localStorage.removeItem(gameConfig.localStorageKey);
    location.reload();
  }
}