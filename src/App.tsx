import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importe Routes e Route, não Router
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;