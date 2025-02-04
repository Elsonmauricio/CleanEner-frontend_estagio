import React, { useEffect, useRef, useState } from "react";
import "../styles/WhoSection.css";

// Definir as propriedades esperadas
interface SectionProps {
  title: string;
  titleColor: string;
  content: string;
}

const Section: React.FC<SectionProps> = ({ title, content }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
  
    if (currentSection) {
      observer.observe(currentSection);
    }
  
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);  

  return (
    <div
      ref={sectionRef}
      className="section-wrapper relative flex flex-col items-center justify-center py-16 overflow-hidden"
    >
      {/* Onda de fundo */}
      <div className="wavy-line absolute bottom-0 left-0 w-full h-32 z-0"></div>

      {/* Título */}
      <h2 className="section-title relative z-10">{title}</h2>

      {/* Caixa de conteúdo */}
      <div className="section-box relative z-10">{content}</div>
    </div>
  );
}

export default Section;
