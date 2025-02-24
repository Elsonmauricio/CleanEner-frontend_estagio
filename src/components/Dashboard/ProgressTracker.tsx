import React, { useState, useEffect } from "react";
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
  const [progressData, setProgressData] = useState<number[]>([]);

  useEffect(() => {
    const handlePdfData = (event: CustomEvent<{ consumptionData: { value: number }[] }>) => {
      // Extrair os valores de consumo mensal
      const consumptionValues = event.detail.consumptionData.map(data => data.value);
      setProgressData(consumptionValues);
    };

    window.addEventListener("pdfDataExtracted", handlePdfData as EventListener);

    return () => {
      window.removeEventListener("pdfDataExtracted", handlePdfData as EventListener);
    };
  }, []);

  // Tipagem dos dados do gráfico
  const progressChartData: ChartData<"line"> = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"], // Ajuste conforme a quantidade de dados
    datasets: [
      {
        label: "Consumo Mensal (kWh)",
        data: progressData.length > 0 ? progressData : [150, 140, 130, 120, 110, 100], // Dados extraídos ou valores padrão
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

  // Calcula a redução percentual com base no consumo atual e na meta
  const calculateReduction = (targetConsumption: number) => {
    if (progressData.length > 0) {
      const totalConsumption = progressData.reduce((sum, value) => sum + value, 0);
      const reduction = ((totalConsumption - targetConsumption) / totalConsumption) * 100;
      return Math.min(Math.max(reduction, 0), 100); // Garantir que a redução esteja entre 0% e 100%
    }
    return 0;
  };

  const reductionPercentage = calculateReduction(540); // Exemplo de meta (540 kWh no total)

  return (
    <div className="progress-container">
      <h2 className="progress-title">📊 Acompanhamento de Progresso</h2>
      <Line data={progressChartData} options={progressOptions} />

      <div className="progress-summary">
        <p>🔻 Redução total alcançada: <strong>{reductionPercentage.toFixed(2)}%</strong></p>
        <div className="progress-bar">
          <div className="progress-bar-inner" style={{ width: `${reductionPercentage}%` }}></div>
        </div>
        <p>🎯 Meta: Reduzir para <strong>90 kWh/mês</strong> até Dezembro</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
