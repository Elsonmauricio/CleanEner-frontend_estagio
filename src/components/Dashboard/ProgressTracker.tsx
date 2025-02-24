import React, { useEffect, useState } from "react";
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
  const [consumptionData, setConsumptionData] = useState<number[]>([]);
  const [reductionGoal, setReductionGoal] = useState<number>(90);
  const [totalReduction, setTotalReduction] = useState<number>(0);

  useEffect(() => {
    const handlePdfData = (event: CustomEvent<{ consumptionData: number[]; recommendations: number }>) => {
      setConsumptionData(event.detail.consumptionData);
      setTotalReduction(event.detail.recommendations);
    };

    window.addEventListener("pdfDataExtracted", handlePdfData as EventListener);

    return () => {
      window.removeEventListener("pdfDataExtracted", handlePdfData as EventListener);
    };
  }, []);

  const progressData: ChartData<"line"> = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Consumo Mensal (kWh)",
        data: consumptionData.length > 0 ? consumptionData : [150, 140, 130, 120, 110, 100],
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#ff9800",
        pointBorderColor: "#fff",
        pointRadius: 5,
      },
    ],
  };

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

  const reductionPercentage = ((totalReduction / 150) * 100).toFixed(0);
  const progressBarWidth = `${Math.min(100, parseInt(reductionPercentage) * 2)}%`;

  return (
    <div className="progress-container">
      <h2 className="progress-title">📊 Acompanhamento de Progresso</h2>
      <Line data={progressData} options={progressOptions} />

      <div className="progress-summary">
        <p>🔻 Redução total alcançada: <strong>{reductionPercentage}%</strong></p>
        <div className="progress-bar">
          <div className="progress-bar-inner" style={{ width: progressBarWidth }}></div>
        </div>
        <p>🎯 Meta: Reduzir para <strong>{reductionGoal} kWh/mês</strong> até Dezembro</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
