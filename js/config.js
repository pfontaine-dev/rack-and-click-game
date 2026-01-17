// Configuration des items de la boutique
export const storeItems = [
  { 
    id: "basic_server", 
    name: "Serveur basique", 
    basePrice: 10, 
    owned: 0,
    effect: { type: "pus", value: 0.1 },
    description: "+0.1 PU/s"
  },
  { 
    id: "dual_core", 
    name: "CPU dual-core", 
    basePrice: 50, 
    owned: 0,
    effect: { type: "pus", value: 0.5 },
    description: "+0.5 PU/s"
  },
  { 
    id: "fast_ssd", 
    name: "SSD rapide", 
    basePrice: 100, 
    owned: 0,
    effect: { type: "pus", value: 1 },
    description: "+1 PU/s"
  },
  { 
    id: "stable_power", 
    name: "Alimentation stable", 
    basePrice: 200, 
    owned: 0,
    effect: { type: "pus", value: 2 },
    description: "+2 PU/s"
  },
  { 
    id: "rack_upgrade", 
    name: "Rack optimisé", 
    basePrice: 500, 
    owned: 0,
    effect: { type: "pus", value: 5 },
    description: "+5 PU/s"
  },
];

// Configuration des améliorations
export const upgradeItems = [
  {
    id: "click_power_1",
    name: "Clic renforcé I",
    price: 100,
    owned: false,
    effect: { type: "click", value: 1 },
    description: "+1 PU par clic"
  },
  {
    id: "click_power_2",
    name: "Clic renforcé II",
    price: 500,
    owned: false,
    effect: { type: "click", value: 2 },
    description: "+2 PU par clic",
    requires: "click_power_1"
  },
  {
    id: "click_power_3",
    name: "Clic renforcé III",
    price: 2000,
    owned: false,
    effect: { type: "click", value: 5 },
    description: "+5 PU par clic",
    requires: "click_power_2"
  },
  {
    id: "auto_clicker",
    name: "Auto-clicker",
    price: 1000,
    owned: false,
    effect: { type: "pus", value: 10 },
    description: "+10 PU/s"
  },
  {
    id: "efficiency_boost",
    name: "Boost d'efficacité",
    price: 5000,
    owned: false,
    effect: { type: "multiplier", value: 1.5 },
    description: "×1.5 à tous les PU/s"
  }
];

// Configuration des succès
export const achievements = [
  {
    id: "first_click",
    name: "Premier clic",
    description: "Effectuer votre premier clic",
    condition: (game) => game.totalClicks >= 1,
    unlocked: false
  },
  {
    id: "hundred_clicks",
    name: "Cliqueur confirmé",
    description: "Effectuer 100 clics",
    condition: (game) => game.totalClicks >= 100,
    unlocked: false
  },
  {
    id: "first_purchase",
    name: "Premier achat",
    description: "Acheter votre premier item",
    condition: (game) => game.totalPurchases >= 1,
    unlocked: false
  },
  {
    id: "thousand_pu",
    name: "Millionnaire",
    description: "Atteindre 1000 PU",
    condition: (game) => game.totalPU >= 1000,
    unlocked: false
  },
  {
    id: "ten_pus",
    name: "Production active",
    description: "Atteindre 10 PU/s",
    condition: (game) => game.getPUS() >= 10,
    unlocked: false
  }
];

// Paramètres du jeu
export const gameConfig = {
  saveInterval: 5000, // Sauvegarde automatique toutes les 5 secondes
  tickRate: 100, // Mise à jour du jeu toutes les 100ms
  priceMultiplier: 1.15, // Augmentation du prix à chaque achat
  localStorageKey: "rackClickGameSave"
};