import React from "react";
import { Bolt, BarChart, PiggyBank } from "lucide-react"; // Ícones para melhor visualização
import "./UserSummary.css";

interface UserData {
  totalConsumption: number;
  averageConsumption: number;
  savings: number;
}

const UserSummary: React.FC = () => {
  const userData: UserData = {
    totalConsumption: 450, // kWh
    averageConsumption: 90, // kWh/mês
    savings: 50, // EUR/mês
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
