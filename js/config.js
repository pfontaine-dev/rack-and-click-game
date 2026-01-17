// Configuration des items de la boutique
export const storeItems = [
  // --- EARLY GAME ---
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

  // --- MID GAME ---
  { 
    id: "cooling_system", 
    name: "Système de refroidissement", 
    basePrice: 1500, 
    owned: 0,
    effect: { type: "multiplier", value: 1.05 },
    description: "×1.05 PU/s"
  },
  { 
    id: "fiber_network", 
    name: "Réseau fibre", 
    basePrice: 3000, 
    owned: 0,
    effect: { type: "pus", value: 20 },
    description: "+20 PU/s"
  },

  // --- LATE GAME ---
  { 
    id: "ai_controller", 
    name: "Contrôleur IA", 
    basePrice: 10000, 
    owned: 0,
    effect: { type: "multiplier", value: 1.2 },
    description: "×1.2 PU/s"
  },
  { 
    id: "quantum_node", 
    name: "Nœud quantique", 
    basePrice: 50000, 
    owned: 0,
    effect: { type: "pus", value: 200 },
    description: "+200 PU/s"
  },
  { 
    id: "mega_datacenter", 
    name: "Méga datacenter", 
    basePrice: 250000, 
    owned: 0,
    effect: { type: "multiplier", value: 1.5 },
    description: "×1.5 PU/s"
  }
];

// Configuration des améliorations
export const upgradeItems = [
  // --- CLIC ---
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

  // --- AUTOMATION ---
  {
    id: "auto_clicker",
    name: "Auto-clicker",
    price: 1000,
    owned: false,
    effect: { type: "pus", value: 10 },
    description: "+10 PU/s"
  },
  {
    id: "smart_auto_clicker",
    name: "Auto-clicker intelligent",
    price: 5000,
    owned: false,
    effect: { type: "pus", value: 50 },
    description: "+50 PU/s",
    requires: "auto_clicker"
  },

  // --- OPTIMISATION ---
  {
    id: "efficiency_boost",
    name: "Boost d'efficacité",
    price: 5000,
    owned: false,
    effect: { type: "multiplier", value: 1.5 },
    description: "×1.5 à tous les PU/s"
  },
  {
    id: "hyper_efficiency",
    name: "Hyper efficacité",
    price: 25000,
    owned: false,
    effect: { type: "multiplier", value: 2 },
    description: "×2 à tous les PU/s",
    requires: "efficiency_boost"
  }
];

// Configuration des succès
export const achievements = [
  // --- CLICS ---
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
    id: "thousand_clicks",
    name: "Cliqueur acharné",
    description: "Effectuer 1 000 clics",
    condition: (game) => game.totalClicks >= 1000,
    unlocked: false
  },
  {
    id: "ten_thousand_clicks",
    name: "Doigt de fer",
    description: "Effectuer 10 000 clics",
    condition: (game) => game.totalClicks >= 10000,
    unlocked: false
  },

  // --- ACHATS ---
  {
    id: "first_purchase",
    name: "Premier achat",
    description: "Acheter votre premier item",
    condition: (game) => game.totalPurchases >= 1,
    unlocked: false
  },
  {
    id: "ten_purchases",
    name: "Client régulier",
    description: "Acheter 10 items",
    condition: (game) => game.totalPurchases >= 10,
    unlocked: false
  },
  {
    id: "fifty_purchases",
    name: "Accro au matériel",
    description: "Acheter 50 items",
    condition: (game) => game.totalPurchases >= 50,
    unlocked: false
  },

  // --- PRODUCTION (PU/s) ---
  {
    id: "ten_pus",
    name: "Production active",
    description: "Atteindre 10 PU/s",
    condition: (game) => game.getPUS() >= 10,
    unlocked: false
  },
  {
    id: "fifty_pus",
    name: "Chaîne industrielle",
    description: "Atteindre 50 PU/s",
    condition: (game) => game.getPUS() >= 50,
    unlocked: false
  },
  {
    id: "hundred_pus",
    name: "Datacenter",
    description: "Atteindre 100 PU/s",
    condition: (game) => game.getPUS() >= 100,
    unlocked: false
  },

  // --- PU TOTAUX ---
  {
    id: "thousand_pu",
    name: "Millionnaire",
    description: "Atteindre 1 000 PU",
    condition: (game) => game.totalPU >= 1000,
    unlocked: false
  },
  {
    id: "ten_thousand_pu",
    name: "Investisseur",
    description: "Atteindre 10 000 PU",
    condition: (game) => game.totalPU >= 10000,
    unlocked: false
  },
  {
    id: "hundred_thousand_pu",
    name: "Magnat du calcul",
    description: "Atteindre 100 000 PU",
    condition: (game) => game.totalPU >= 100000,
    unlocked: false
  },

  // --- UPGRADES ---
  {
    id: "first_upgrade",
    name: "Optimisation",
    description: "Acheter votre première amélioration",
    condition: (game) => game.upgradesOwned >= 1,
    unlocked: false
  },
  {
    id: "all_click_upgrades",
    name: "Clic ultime",
    description: "Acheter tous les upgrades de clic",
    condition: (game) =>
      game.hasUpgrade("click_power_1") &&
      game.hasUpgrade("click_power_2") &&
      game.hasUpgrade("click_power_3"),
    unlocked: false
  },

  // --- ITEMS SPÉCIFIQUES ---
  {
    id: "first_server",
    name: "Serveur en ligne",
    description: "Acheter un serveur basique",
    condition: (game) => game.items.basic_server >= 1,
    unlocked: false
  },
  {
    id: "rack_master",
    name: "Maître des racks",
    description: "Acheter 10 racks optimisés",
    condition: (game) => game.items.rack_upgrade >= 10,
    unlocked: false
  },

  // --- PASSIF ---
  {
    id: "auto_production",
    name: "Automatisation",
    description: "Générer des PU sans cliquer",
    condition: (game) => game.getPUS() > 0,
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