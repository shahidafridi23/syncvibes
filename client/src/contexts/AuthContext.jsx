import Loder from "@/components/Loder";
import authenticate from "@/utils/authenticate";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const verifyToken = async () => {
    try {
      const data = await authenticate();
      setAuthData(data);
    } catch (error) {
      localStorage.removeItem("authToken"); // Clear token if invalid
      setAuthData(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    const isAuthRoute = ["/login", "/register", "/auth-success"].includes(
      location.pathname
    );

    if (!loading) {
      if (!authData && !isAuthRoute) {
        navigate("/login", { state: { from: location.pathname } });
      } else if (authData && isAuthRoute) {
        const from = location.state?.from || `/@${authData.user.username}`;
        navigate(from, { replace: true });
      }
    }
  }, [authData, loading, location, navigate]);

  if (loading) {
    return <Loder />;
  }

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
