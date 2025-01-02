import authenticate from "@/utils/authenticate";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    err: false,
  });

  const getAuthData = async () => {
    try {
      const user = await authenticate();
      setAuthState({ user: user, loading: false, err: false });
    } catch (error) {
      setAuthState({ user: null, loading: false, err: true });
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        await getAuthData();
      } catch (error) {
        console.log();
      }
    };

    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, getAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
