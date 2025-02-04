// RecommendationUpdater.tsx
import React from "react";

interface RecommendationsProps {
  consumption: number; // Ensure this prop is defined
}

const Recommendations: React.FC<RecommendationsProps> = ({ consumption }) => {
  const handleUpdate = () => {
    alert("Recomendações atualizadas!");
  };

  return (
    <div>
      <h3>Atualizar Recomendações</h3>
      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
};

export default Recommendations;
