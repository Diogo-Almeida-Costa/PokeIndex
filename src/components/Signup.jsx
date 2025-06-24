import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Signup({ onToggleForm }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError('Por favor, preencha todos os campos');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem');
    }

    if (formData.password.length < 6) {
      return setError('A senha deve ter pelo menos 6 caracteres');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.username);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este email já está em uso');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca');
          break;
        default:
          setError('Erro ao criar conta. Tente novamente');
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
          type="text"
          name="username"
          className="form-control"
          placeholder="Nome de usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Confirmar senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary-custom"
        disabled={loading}
      >
        {loading ? 'Criando conta...' : 'Criar conta'}
      </button>

      <div className="text-muted-custom">
        Já tem uma conta?
      </div>
      
      <button
        type="button"
        className="btn btn-secondary-custom"
        onClick={onToggleForm}
      >
        Entrar
      </button>
    </form>
  );
}

