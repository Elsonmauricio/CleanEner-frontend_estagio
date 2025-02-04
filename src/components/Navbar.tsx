import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem('token'); // Verifica se o usuário está logado

  const handleLogout = (): void => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  const toggleNav = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={toggleNav}>
        <img src="./img_vid/lamp.png" alt="Logo" className="logo" />
      </div>

      <div className={`navbar-container ${isNavOpen ? 'show' : ''}`}>
        {/* Links de navegação */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Painel</Link>
        </div>

        {/* Ações de login e logout */}
        <div className="nav-actions">
          {token ? (
            <>
              <Link to="/profile" className="nav-link">
                <i className="icon-profile">👤</i>
              </Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Entrar</Link>
              <Link to="/register" className="nav-link">Registar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;