import React from "react";
import "../styles/HeroSection.css";
import video from "../public/img_vid/Sunset_Offshore_Wind_Farm.mp4";


const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Vídeo de fundo */}
      <video src="/img_vid/Sunset_Offshore_Wind_Farm.mp4" autoPlay loop muted className="hero-video">
        Seu navegador não suporta vídeos em HTML5.
      </video>

      {/* Conteúdo do Hero */}
      <div className="hero-content">
        <h1>
          Bem-vindo à <b>CleanEner</b> AI Tech
        </h1>
        <p>Plataforma de Eficiência Energética</p>
      </div>
    </div>
  );
};

export default HeroSection;
