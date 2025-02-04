import React from "react";
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

const EnergyChart: React.FC = () => {
  // Definição dos dados do gráfico
  const data: ChartData<"line"> = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Consumo de Energia (kWh)",
        data: [120, 150, 130, 110, 140],
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
          color: "#333", // Cor do texto da legenda
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
          color: "#444", // Cor dos textos do eixo X
          font: { size: 12 },
        },
        grid: {
          display: false, // Oculta as linhas da grade no eixo X
        },
      },
      y: {
        ticks: {
          color: "#444", // Cor dos textos do eixo Y
          font: { size: 12 },
          callback: (value) => `${value} kWh`, // Adiciona unidade de medida
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Linhas suaves no eixo Y
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Consumo de Energia</h2>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EnergyChart;
