import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="logo-container">
          <img 
            src="/img/PokeIndex.gif" 
            alt="PokeIndex Logo" 
            className="img-fluid"
          />
        </div>
        
        <h2 className="mb-4">Bem-vindo ao PokeIndex!</h2>
        <p className="text-muted">Você está logado com sucesso</p>
        
        <div className="user-info">
          <h5>Informações do Usuário</h5>
          <p><strong>Usuário:</strong> {currentUser?.username}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
        </div>
        
        <div className="mt-4">
          <p className="text-muted mb-4">
            Esta é uma demonstração do sistema de autenticação com React e Firebase.
            Agora você pode integrar esta funcionalidade ao seu projeto PokeIndex!
          </p>
          
          <button 
            onClick={handleLogout}
            className="btn btn-secondary-custom"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

