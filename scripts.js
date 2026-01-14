const items = [
  { name: "Serveur basique", price: 10 },
  { name: "CPU dual-core", price: 50 },
  { name: "SSD rapide", price: 100 },
  { name: "Alimentation stable", price: 100 },
];

const clickZone = document.getElementById("click-zone");

clickZone.addEventListener("click", (e) => {
  const pu = document.createElement("div");
  const counter = document.getElementById("counter");

  // Mise à jour du compteur
  let count = parseInt(counter.textContent);
  count += 1;
  counter.textContent = count+" PU";

  // Création de l'animation +1 PU
  pu.className = "pu";
  pu.textContent = "+1 PU";

  // Position relative au clic
  const rect = clickZone.getBoundingClientRect();
  pu.style.left = `${e.clientX - rect.left}px`;
  pu.style.top = `${e.clientY - rect.top}px`;

  clickZone.appendChild(pu);

  // Nettoyage après animation
  pu.addEventListener("animationend", () => {
    pu.remove();
  });
});

// Génération de la boutique
const store = document.getElementById("store");

items.forEach((item) => {
  const itemDiv = document.createElement("div");
  itemDiv.className = "store-item";
  itemDiv.textContent = `${item.name} - ${item.price} PU`;
  const buyButton = document.createElement("button");
  buyButton.textContent = "Acheter";
  buyButton.className = "buy-button";
  buyButton.type = "button";
  itemDiv.appendChild(buyButton);
  store.appendChild(itemDiv);
});
