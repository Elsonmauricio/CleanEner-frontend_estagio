import React, { useState, useEffect } from "react";
import { Bolt, BarChart, PiggyBank } from "lucide-react"; // Ícones para melhor visualização
import "./UserSummary.css";

interface UserData {
  totalConsumption: number;
  averageConsumption: number;
  savings: number;
}
interface ConsumptionData { // Added ConsumptionData interface
  value: number; // Define the structure of ConsumptionData
}

const UserSummary: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ totalConsumption: 0, averageConsumption: 0, savings: 0 });

  useEffect(() => {
    const handlePdfData = (event: CustomEvent<{ consumptionData: ConsumptionData[] }>) => {
      const totalConsumption = event.detail.consumptionData.reduce((sum, data) => sum + data.value, 0);
      const averageConsumption = totalConsumption / event.detail.consumptionData.length;
      const savings = calculateSavings(totalConsumption);

      setUserData({ totalConsumption, averageConsumption, savings });
    };

    window.addEventListener('pdfDataExtracted', handlePdfData as EventListener);

    return () => {
      window.removeEventListener('pdfDataExtracted', handlePdfData as EventListener);
    };
  }, []);

  const calculateSavings = (totalConsumption: number) => {
    return (totalConsumption * 0.1); // Exemplo de lógica de economia
  };

  return (
    <div className="user-summary">
      <h2 className="summary-title">📊 Resumo de Dados</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <Bolt color="#FFA500" size={28} />
          <p>Consumo Total</p>
          <strong>{userData.totalConsumption} kWh</strong>
        </div>
        <div className="summary-card">
          <BarChart color="#4CAF50" size={28} />
          <p>Consumo Médio</p>
          <strong>{userData.averageConsumption} kWh/mês</strong>
        </div>
        <div className="summary-card">
          <PiggyBank color="#008080" size={28} />
          <p>Poupança</p>
          <strong>€{userData.savings}/mês</strong>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
