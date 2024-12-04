import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCustomer } from '../../api/loginApi';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../LoginForm';

const CustomerLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await loginCustomer({ email, password });
    login(response.token, response.isAdmin);
    navigate('/dashboard');
  };

  return <LoginForm onSubmit={handleLogin} title="Customer Login" />;
};

export default CustomerLogin;
