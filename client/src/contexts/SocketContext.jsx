import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const onUserJoin = useCallback((user) => {
    console.log("user recived from server", user);
  }, []);

  useEffect(() => {
    const _socket = io(import.meta.env.VITE_SERVER_URL);
    _socket.on("joinroom", onUserJoin);
    setSocket(_socket);

    return () => {
      _socket.off("joinRoom", onUserJoin);
      _socket.disconnect();
    };
  }, []);

  const joinUser = useCallback(
    (code, user) => {
      if (socket) {
        socket.emit("joinRoom", code, user, (ack) => {
          console.log("Joined room:", ack);
        });
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider value={{ joinUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
