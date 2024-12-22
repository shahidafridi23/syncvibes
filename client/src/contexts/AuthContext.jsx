import authenticate from "@/utils/authenticate";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const refreshAuth = async () => {
    const result = await authenticate();
    setAuthState(result);
  };

  return (
    <AuthContext.Provider value={{ authState, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
