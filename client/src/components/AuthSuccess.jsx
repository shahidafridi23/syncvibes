import { useAuth } from "@/contexts/AuthContext";
import authenticate from "@/utils/authenticate";
import React, { useEffect } from "react";

const AuthSuccess = () => {
  const { setAuthData } = useAuth();

  const getDataWithGoogle = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        throw new Error("No token found in google url");
      }

      localStorage.setItem("authToken", token);

      const data = await authenticate();

      setAuthData(data);
    } catch (error) {
      setAuthData(null);
      throw error;
    }
  };

  useEffect(() => {
    getDataWithGoogle();
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
