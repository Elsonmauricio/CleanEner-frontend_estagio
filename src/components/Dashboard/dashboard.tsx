import React from "react";
import EnergyChart from "./EnergyChart";
import Recommendations from "./Recommendations"; // Importação correta
import UserSummary from "./UserSummary";
import ProgressTracker from "./ProgressTracker";
import FeedbackSystem from "./feedbackSystem"; // Use the correct casing
import FileManager from "./FileManager";
import SavingsCalculator from "./savingsCalculator"; // Use the correct casingimport FeedbackSystem from "./FeedbackSystem"; // Corrigindo capitalização
import RecommendationUpdater from "./recommendationsUpdater"; // Corrigindo capitalização
import RecommendationPrioritization from "./recommendationPrioritization"; // Corrigindo capitalização
import "./Dashboard.css";

// Interface para os dados de energia
interface UserEnergyData {
  monthlyConsumption: number;
}

const Dashboard: React.FC = () => {
  // Dados fictícios simulando consumo médio mensal (kWh)
  const userEnergyData: UserEnergyData = {
    monthlyConsumption: 120,
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Painel de Controle</h1>

      <section className="dashboard-section">
        <details>
          <summary>📊 Resumo de Dados</summary>
          <UserSummary />
        </details>

        <details>
          <summary>📁 Documentos Carregados</summary>
          <FileManager /> {/* Sistema de upload e visualização de arquivos */}
        </details>

        <details>
          <summary>📈 Gráfico de Energia</summary>
          <EnergyChart />
        </details>

        <details>
          <summary>💡 Recomendações</summary>
          <Recommendations consumption={userEnergyData.monthlyConsumption} />
        </details>

        <details>
          <summary>🧮 Calculadora de Poupanças</summary>
          <SavingsCalculator consumption={userEnergyData.monthlyConsumption} />
        </details>

        <details>
          <summary>⭐ Sistema de Feedback</summary>
          <FeedbackSystem />
        </details>

        <details>
          <summary>🚀 Priorização de Recomendações</summary>
          <RecommendationPrioritization />
        </details>

        <details>
          <summary>📍 Acompanhamento de Progresso</summary>
          <ProgressTracker />
        </details>
      </section>
    </div>
  );
};

export default Dashboard;
