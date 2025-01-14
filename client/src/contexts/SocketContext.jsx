import { createContext, useCallback, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    const _socket = io(import.meta.env.VITE_SERVER_URL);
    return () => {
      _socket.disconnect();
    };
  }, []);
  const sendMessage = useCallback((msg) => {
    console.log(msg);
  }, []);
  return (
    <SocketContext.Provider value={sendMessage}>
      {children}
    </SocketContext.Provider>
  );
};
