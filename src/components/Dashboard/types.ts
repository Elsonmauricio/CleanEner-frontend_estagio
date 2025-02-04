// src/components/Dashboard/types.ts

export interface UserPreferences {
    energyEfficiency: number;
    costSaving: number;
    usagePattern: string;
  }
  
  export interface Recommendation {
    id: string;
    description: string;
    efficiency: number;
    savings: number;
  }
  