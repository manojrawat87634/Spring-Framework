// src/components/ProtectedRoute.jsx
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../context";

const ProtectedRoute = ({ children }) => {
  const { checkSession, token, user } = useContext(DataContext);
  const navigate = useNavigate();
  const getFunc = async () => {
    const token = await checkSession();
    if (!token) {
      navigate('/login/');
    }
  }
  
  useEffect(() => {
    getFunc();
  }, []);

  return children;
};

export default ProtectedRoute;
