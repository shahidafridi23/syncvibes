import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { authState, getAuthData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      getAuthData();
    } else {
      console.error("Authentication failed: Token not found");
    }
  }, [navigate]);

  if (authState.isAuthenticated) {
    navigate(`/@${authState.user.username}`);
  } else {
    navigate("/login");
  }

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
