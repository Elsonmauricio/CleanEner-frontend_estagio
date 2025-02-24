import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import "./EnergyChart.css";

// Registrar os componentes necessários para o gráfico
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface ConsumptionData {
  month: string;
  consumption: number;
}

const EnergyChart: React.FC = () => {
  const [chartData, setChartData] = useState<ConsumptionData[]>([]);

  useEffect(() => {
    const handlePdfData = (event: CustomEvent<{ consumptionData: ConsumptionData[] }>) => {
      if (event.detail?.consumptionData) {
        setChartData(event.detail.consumptionData);
      }
    };

    window.addEventListener("pdfDataExtracted", handlePdfData as EventListener);

    return () => {
      window.removeEventListener("pdfDataExtracted", handlePdfData as EventListener);
    };
  }, []);

  // Dados do gráfico baseados no estado atualizado
  const data: ChartData<"line"> = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "Consumo de Energia (kWh)",
        data: chartData.map((item) => item.consumption),
        borderColor: "#4CAF50", // Verde vibrante
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#FF9800", // Laranja para os pontos
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#FF5722", // Laranja mais forte ao passar o mouse
        pointHoverBorderColor: "#fff",
        tension: 0.3, // Suaviza a linha do gráfico
      },
    ],
  };

  // Opções do gráfico
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Consumo de Energia Mensal",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#222",
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#444",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#444",
          font: { size: 12 },
          callback: (value) => `${value} kWh`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Consumo de Energia</h2>
      <div className="chart-wrapper">
        {chartData.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <p className="no-data">Nenhum dado disponível. Faça o upload de um PDF para visualizar o gráfico.</p>
        )}
      </div>
    </div>
  );
};

export default EnergyChart;
