// src/components/Dashboard/personalization.ts
import { UserPreferences } from "./types";

class Personalization {
  private static userPreferences: UserPreferences = {
    energyEfficiency: 7,
    costSaving: 20,
    usagePattern: "daily",
  };

  static getPreferences(): UserPreferences {
    return this.userPreferences;
  }

  static updatePreferences(newPreferences: UserPreferences) {
    this.userPreferences = { ...this.userPreferences, ...newPreferences };
  }

  // Example function to get recommendations
  static getRecommendations() {
    // Logic to fetch or generate recommendations
    return [
      { description: "Recommendation 1", efficiency: 90, savings: 100 },
      { description: "Recommendation 2", efficiency: 80, savings: 80 },
    ]; // Example recommendations
  }
}

export default Personalization;
