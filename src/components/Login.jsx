import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login({ onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return setError('Por favor, preencha todos os campos');
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.error('Erro no login:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Usuário não encontrado');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/too-many-requests':
          setError('Muitas tentativas. Tente novamente mais tarde');
          break;
        default:
          setError('Erro ao fazer login. Tente novamente');
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger-custom" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary-custom"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <div className="text-muted-custom">
        Não tem uma conta?
      </div>
      
      <button
        type="button"
        className="btn btn-secondary-custom"
        onClick={onToggleForm}
      >
        Criar conta
      </button>
    </form>
  );
}

