// SavingsCalculator.tsx
import React from "react";

interface SavingsCalculatorProps {
  consumption: number;
}

const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ consumption }) => {
  const estimatedSavings = consumption * 0.15; // Exemplo de cálculo

  return (
    <div>
      <h3>Estimativa de Poupança</h3>
      <p>Redução estimada: {estimatedSavings.toFixed(2)} kWh</p>
    </div>
  );
};

export default SavingsCalculator;
