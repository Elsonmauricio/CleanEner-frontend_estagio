import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhoSection from "./components/WhoSection";
import WhySection from "./components/WhySection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import Dashboard from "./components/Dashboard/dashboard";
import FileManager from "./components/Dashboard/FileManager";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

interface SectionProps {
  title: string;
  titleColor: string;
  content: string;
}

const Section: React.FC<SectionProps> = ({ title, titleColor, content }) => {
  return (
    <div>
      <h2 style={{ color: titleColor }}>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
  path="/dashboard"
  element={
     //<PrivateRoute>
      <Dashboard />
    // </PrivateRoute>
  }
/>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <div style={{ padding: "40px 0" }}>
                {/* Adicionando propriedades para WhoSection */}
                <WhoSection
                  title="Quem somos?"
                  titleColor="blue"
                  content="Somos o seu aliado na redução de custos e otimização do consumo de energia. Com base nos seus dados de faturas e nos eletrodomésticos que utiliza, analisamos o seu perfil energético e fornecemos recomendações personalizadas. Transforme informações em ações práticas e veja a diferença no seu bolso – tudo com facilidade e precisão."
                />
              </div>
              <div style={{ padding: "40px 0" }}>
                <WhySection />
              </div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
//resolvido
export default App;
