import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Extracted Token:", token);

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } else {
      console.error("Authentication failed: Token not found");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
