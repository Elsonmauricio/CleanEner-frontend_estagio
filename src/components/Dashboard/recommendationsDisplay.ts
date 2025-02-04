// recommendationsDisplay.ts

import Personalization from './personalization';

class RecommendationsDisplay {
  static render() {
    const recommendations = Personalization.getRecommendations();
    const container = document.getElementById("recommendations-container");
    if (container) {
      container.innerHTML = '';
      recommendations.forEach(rec => {
        const recElement = document.createElement("div");
        recElement.innerHTML = `
          <h3>${rec.description}</h3>
          <p>Efficiency: ${rec.efficiency}</p>
          <p>Estimated Savings: ${rec.savings}€</p>
        `;
        container.appendChild(recElement);
      });
    }
  }
}

export default RecommendationsDisplay;
