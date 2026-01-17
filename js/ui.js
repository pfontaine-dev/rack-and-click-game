import { gameConfig } from './config.js';

export class UI {
  constructor(game) {
    this.game = game;
    this.elements = {
      counter: document.getElementById('counter'),
      pus: document.getElementById('pus'),
      clickZone: document.getElementById('click-zone'),
      store: document.getElementById('store'),
      upgrades: document.getElementById('upgrades'),
      settingsBtn: document.getElementById('settings-btn'),
      achievementsBtn: document.getElementById('achievements-btn'),
      settingsModal: document.getElementById('settings-modal'),
      achievementsModal: document.getElementById('achievements-modal'),
      achievementsList: document.getElementById('achievements-list'),
      exportBtn: document.getElementById('export-save'),
      importBtn: document.getElementById('import-save'),
      importFile: document.getElementById('import-file'),
      resetBtn: document.getElementById('reset-save')
    };

    this.initializeEvents();
    this.renderStore();
    this.renderUpgrades();
    this.renderAchievements();
    
    // Mise à jour initiale pour afficher les états corrects
    this.updateStoreButtons();
    this.updateUpgradeButtons();
  }

  initializeEvents() {
    // Clic sur la zone
    this.elements.clickZone.addEventListener('click', (e) => this.handleClick(e));

    // Modales
    this.elements.settingsBtn.addEventListener('click', () => this.showModal('settings'));
    this.elements.achievementsBtn.addEventListener('click', () => this.showModal('achievements'));

    // Fermeture des modales
    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
      });
    });

    // Clic en dehors de la modale
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });

    // Boutons de sauvegarde
    this.elements.exportBtn.addEventListener('click', () => this.game.exportSave());
    this.elements.importBtn.addEventListener('click', () => this.elements.importFile.click());
    this.elements.importFile.addEventListener('change', (e) => this.handleImport(e));
    this.elements.resetBtn.addEventListener('click', () => this.handleReset());

    // Notification de succès
    window.showAchievementNotification = (achievement) => this.showAchievementNotification(achievement);
  }

  handleClick(e) {
    this.game.click();

    // Animation +X PU
    const pu = document.createElement('div');
    pu.className = 'pu';
    pu.textContent = `+${this.game.clickPower} PU`;

    const rect = this.elements.clickZone.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    pu.style.left = `${x}px`;
    pu.style.top = `${y}px`;
    pu.style.position = 'absolute';

    this.elements.clickZone.appendChild(pu);

    // Supprimer l'élément après l'animation
    setTimeout(() => {
      if (pu.parentNode) {
        pu.remove();
      }
    }, 1000);

    this.update();
  }

  renderStore() {
    this.elements.store.innerHTML = '';
    
    this.game.storeItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'store-item';
      itemDiv.setAttribute('data-item-id', item.id);
      
      const price = this.game.getItemPrice(item);
      const canAfford = this.game.pu >= price;
      
      itemDiv.innerHTML = `
        <div class="item-info">
          <strong>${item.name}</strong>
          <span class="item-description">${item.description}</span>
          <span class="item-owned">Possédé: ${item.owned}</span>
        </div>
        <button class="buy-button ${canAfford ? '' : 'disabled'}">
          ${price.toFixed(0)} PU
        </button>
      `;
      
      const buyBtn = itemDiv.querySelector('.buy-button');
      buyBtn.addEventListener('click', () => {
        if (this.game.buyStoreItem(item.id)) {
          this.updateStoreButtons();
          this.updateUpgradeButtons();
        }
      });
      
      this.elements.store.appendChild(itemDiv);
    });
  }

  renderUpgrades() {
    this.elements.upgrades.innerHTML = '';
    
    console.log('Rendering upgrades:', this.game.upgradeItems.length);
    
    this.game.upgradeItems.forEach(upgrade => {
      const upgradeDiv = document.createElement('div');
      upgradeDiv.className = 'upgrade-item';
      upgradeDiv.setAttribute('data-upgrade-id', upgrade.id);
      
      if (upgrade.owned) {
        upgradeDiv.classList.add('owned');
      }
      
      const canAfford = this.game.pu >= upgrade.price;
      const meetsRequirements = !upgrade.requires || 
        this.game.upgradeItems.find(u => u.id === upgrade.requires)?.owned;
      
      const requirementText = upgrade.requires && !meetsRequirements 
        ? `<span class="requirement">Prérequis: ${this.game.upgradeItems.find(u => u.id === upgrade.requires)?.name || upgrade.requires}</span>` 
        : '';
      
      upgradeDiv.innerHTML = `
        <div class="item-info">
          <strong>${upgrade.name}</strong>
          <span class="item-description">${upgrade.description}</span>
          ${requirementText}
        </div>
        <button class="buy-button ${upgrade.owned ? 'disabled' : (canAfford && meetsRequirements ? '' : 'disabled')}">
          ${upgrade.owned ? 'Possédé' : upgrade.price.toFixed(0) + ' PU'}
        </button>
      `;
      
      const buyBtn = upgradeDiv.querySelector('.buy-button');
      buyBtn.addEventListener('click', () => {
        if (this.game.buyUpgrade(upgrade.id)) {
          this.updateStoreButtons();
          this.updateUpgradeButtons();
        }
      });
      
      this.elements.upgrades.appendChild(upgradeDiv);
    });
    
    console.log('Upgrades rendered in DOM:', this.elements.upgrades.children.length);
  }

  renderAchievements() {
    this.elements.achievementsList.innerHTML = '';
    
    this.game.achievements.forEach(achievement => {
      const achDiv = document.createElement('div');
      achDiv.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
      
      achDiv.innerHTML = `
        <div class="achievement-icon">${achievement.unlocked ? '🏆' : '🔒'}</div>
        <div class="achievement-info">
          <strong>${achievement.name}</strong>
          <span>${achievement.description}</span>
        </div>
      `;
      
      this.elements.achievementsList.appendChild(achDiv);
    });
  }

  showModal(type) {
    if (type === 'settings') {
      this.elements.settingsModal.style.display = 'block';
    } else if (type === 'achievements') {
      this.renderAchievements();
      this.elements.achievementsModal.style.display = 'block';
    }
  }

  handleImport(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (this.game.importSave(event.target.result)) {
          alert('Sauvegarde importée avec succès !');
          this.update();
          location.reload();
        } else {
          alert('Erreur lors de l\'importation de la sauvegarde.');
        }
      };
      reader.readAsText(file);
    }
  }

  handleReset() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.')) {
      this.game.reset();
    }
  }

  showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-popup">
        <strong>🏆 Succès débloqué !</strong>
        <span>${achievement.name}</span>
        <p>${achievement.description}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  update() {
    // Mise à jour des compteurs
    if (this.elements.counter) {
      this.elements.counter.textContent = `${Math.floor(this.game.pu)} PU`;
    }
    if (this.elements.pus) {
      this.elements.pus.textContent = `${this.game.getPUS().toFixed(1)} PU/s`;
    }

    // Mise à jour uniquement des prix et états (pas de re-render complet)
    this.updateStoreButtons();
    this.updateUpgradeButtons();
  }

  updateStoreButtons() {
    this.game.storeItems.forEach(item => {
      const itemDiv = this.elements.store.querySelector(`[data-item-id="${item.id}"]`);
      if (!itemDiv) return;

      const price = this.game.getItemPrice(item);
      const canAfford = this.game.pu >= price;
      const buyBtn = itemDiv.querySelector('.buy-button');
      const ownedSpan = itemDiv.querySelector('.item-owned');

      if (buyBtn) {
        buyBtn.textContent = `${price.toFixed(0)} PU`;
        if (canAfford) {
          buyBtn.classList.remove('disabled');
        } else {
          buyBtn.classList.add('disabled');
        }
      }

      if (ownedSpan) {
        ownedSpan.textContent = `Possédé: ${item.owned}`;
      }
    });
  }

  updateUpgradeButtons() {
    this.game.upgradeItems.forEach(upgrade => {
      const upgradeDiv = this.elements.upgrades.querySelector(`[data-upgrade-id="${upgrade.id}"]`);
      if (!upgradeDiv) return;

      const canAfford = this.game.pu >= upgrade.price;
      const meetsRequirements = !upgrade.requires || 
        this.game.upgradeItems.find(u => u.id === upgrade.requires)?.owned;
      const buyBtn = upgradeDiv.querySelector('.buy-button');

      if (buyBtn && !upgrade.owned) {
        if (canAfford && meetsRequirements) {
          buyBtn.classList.remove('disabled');
        } else {
          buyBtn.classList.add('disabled');
        }
      }

      if (upgrade.owned) {
        upgradeDiv.classList.add('owned');
      }
    });
  }
}