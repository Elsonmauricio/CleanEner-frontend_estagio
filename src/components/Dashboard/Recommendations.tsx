// RecommendationUpdater.tsx
import React, { useState, useEffect } from "react";

interface RecommendationsProps {
  consumption: number; // Ensure this prop is defined
}
interface ConsumptionData { // Added ConsumptionData interface
  value: number; // Define the structure of ConsumptionData
}

const Recommendations: React.FC<RecommendationsProps> = ({ consumption }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const handlePdfData = (event: CustomEvent<{ consumptionData: ConsumptionData[] }>) => {
      const totalConsumption = event.detail.consumptionData.reduce((sum, data) => sum + data.value, 0);
      setRecommendations(generateRecommendations(totalConsumption));
    };

    window.addEventListener('pdfDataExtracted', handlePdfData as EventListener);

    return () => {
      window.removeEventListener('pdfDataExtracted', handlePdfData as EventListener);
    };
  }, []);

  const generateRecommendations = (totalConsumption: number) => {
    const reductionPercentage = totalConsumption > 500 ? '30%' : '15%'; // Exemplo de lógica
    return [`Reduza seu consumo em ${reductionPercentage}`];
  };

  return (
    <div>
      <h3>Recomendações de Consumo</h3>
      {recommendations.map((rec, index) => (
        <p key={index}>{rec}</p>
      ))}
    </div>
  );
};


export default Recommendations;
