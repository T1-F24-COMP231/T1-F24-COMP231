import React from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/loginApi";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../LoginForm";

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await loginAdmin({ email, password });
    login(response.token, response.isAdmin);
    navigate("/dashboard"); 
  };

  return <LoginForm onSubmit={handleLogin} title="Admin Login" />;
};

export default AdminLogin;
