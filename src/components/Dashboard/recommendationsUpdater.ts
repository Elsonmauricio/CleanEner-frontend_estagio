// recommendationsUpdater.ts

import RecommendationsDisplay from './recommendationsDisplay';
import Personalization from './personalization';

// Example UserPreferences interface
export interface UserPreferences {
    energyEfficiency: number;
    costSaving: number;
    usagePattern: string; // Required property
  }

class RecommendationsUpdater {
  static updateRecommendations() {
    // Exemplo de atualização das recomendações
    Personalization.updatePreferences({ 
      energyEfficiency: 8, 
      costSaving: 25, 
      usagePattern: "default"
    });
    RecommendationsDisplay.render();
  }
}

export default RecommendationsUpdater;
