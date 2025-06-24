import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

function AuthApp() {
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser } = useAuth();

  function toggleForm() {
    setIsLogin(!isLogin);
  }

  // Se o usuário está logado, mostrar o dashboard
  if (currentUser) {
    return <Dashboard />;
  }

  // Se não está logado, mostrar formulários de login/cadastro
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img 
            src="/img/PokeIndex.gif" 
            alt="PokeIndex Logo" 
            className="img-fluid"
          />
        </div>
        
        {isLogin ? (
          <Login onToggleForm={toggleForm} />
        ) : (
          <Signup onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}

function AuthWrapper() {
  return (
    <AuthProvider>
      <AuthApp />
    </AuthProvider>
  );
}

export default AuthWrapper;

