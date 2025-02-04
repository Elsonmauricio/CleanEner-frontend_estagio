import React, { useState } from "react";
import '../styles/WhySection.css';

interface IconWithBoxProps {
  icon: string;
  content: string;
  isOpen: boolean;
  onClick: (id: number) => void;
  id: number;
  isFirstOpen: boolean;
}

// Componente do ícone com o conteúdo dinâmico
const IconWithBox: React.FC<IconWithBoxProps> = ({ icon, content, isOpen, onClick, id, isFirstOpen }) => {
  return (
    <div className={`icon-container ${isOpen ? 'open' : ''} ${isFirstOpen ? 'first-open' : ''}`}>
      {/* Ícone com círculo ao redor */}
      <div
        className="icon"
        onClick={() => onClick(id)} // Passa o índice do ícone ao clicar
        aria-label={`icon ${icon}`} // Melhor acessibilidade
      >
        {/* A URL da imagem será relativa ao diretório public/icons */}
        <img
          src={`/icons/${icon}`} // Caminho relativo para a pasta public/icons
          alt={icon}
        />
      </div>

      {/* Caixa de conteúdo */}
      {isOpen && (
        <div className="content-box">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

// Componente principal da seção
const WhySection: React.FC = () => {
  // Controle de qual caixa está aberta
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const iconsData = [
    { icon: "light-bulb.png", content: "Economize até 30% na sua conta de energia" },
    { icon: "bar-chart.png", content: "Obtenha relatórios personalizados sobre seu consumo" },
    { icon: "leaf.png", content: "Contribua para a sustentabilidade ambiental" },
    { icon: "analytics.png", content: "Obtenha análises detalhadas de padrões de consumo" },
    { icon: "like.png", content: "Recomendações personalizadas para economizar energia" },
    { icon: "continuous-improvement.png", content: "Monitorização contínua da sua eficiência energética" },
    { icon: "safety.png", content: "Seus dados estão protegidos com segurança avançada" },
  ];

  // Função para alternar a caixa aberta
  const handleIconClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Se a caixa já estiver aberta, fecha ela
  };

  return (
    <div className="why-section">
      <h2 className="section-title">Porquê nós?</h2>
      <p className="section-description">Clique nos icons para ver os beneficios!</p>
      <div className="icons-grid">
        {iconsData.map((data, index) => (
          <IconWithBox
            key={index}
            icon={data.icon}
            content={data.content}
            isOpen={openIndex === index} // Verifica se a caixa deve estar aberta
            onClick={handleIconClick}
            id={index} // Passa o índice do ícone
            isFirstOpen={index === 0} // Condicional para a primeira caixa
          />
        ))}
      </div>
    </div>
  );
}

export default WhySection;
