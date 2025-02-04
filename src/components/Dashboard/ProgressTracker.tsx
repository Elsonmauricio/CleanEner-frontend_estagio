import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import "./ProgressTracker.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressTracker: React.FC = () => {
  // Tipagem dos dados do gráfico
  const progressData: ChartData<"line"> = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Consumo Mensal (kWh)",
        data: [150, 140, 130, 120, 110, 100], // Exemplo de progresso de consumo
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#ff9800",
        pointBorderColor: "#fff",
        pointRadius: 5,
      },
    ],
  };

  // Tipagem das opções do gráfico
  const progressOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `${context.raw} kWh`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Consumo (kWh)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
    },
  };

  return (
    <div className="progress-container">
      <h2 className="progress-title">📊 Acompanhamento de Progresso</h2>
      <Line data={progressData} options={progressOptions} />

      <div className="progress-summary">
        <p>🔻 Redução total alcançada: <strong>33%</strong></p>
        <div className="progress-bar">
          <div className="progress-bar-inner" style={{ width: "66%" }}></div>
        </div>
        <p>🎯 Meta: Reduzir para <strong>90 kWh/mês</strong> até Dezembro</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
