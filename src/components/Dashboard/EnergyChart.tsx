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

const EnergyChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    const handlePdfData = (event: CustomEvent<{ consumptionData: { month: string; value: number }[] }>) => {
      // Extraindo os meses e valores de consumo
      const extractedLabels = event.detail.consumptionData.map(data => data.month);
      const extractedData = event.detail.consumptionData.map(data => data.value);

      setLabels(extractedLabels);
      setDataPoints(extractedData);
    };

    window.addEventListener("pdfDataExtracted", handlePdfData as EventListener);

    return () => {
      window.removeEventListener("pdfDataExtracted", handlePdfData as EventListener);
    };
  }, []);

  // Se não houver dados extraídos, não renderiza o gráfico
  if (dataPoints.length === 0) {
    return (
      <div className="chart-container">
        <h2 className="chart-title">Consumo de Energia</h2>
        <p className="no-data-message">Nenhum dado disponível</p>
      </div>
    );
  }

  // Definição dos dados do gráfico
  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: "Consumo de Energia (kWh)",
        data: dataPoints,
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
