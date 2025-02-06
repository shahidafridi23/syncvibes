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

  useEffect(() => {
    const _socket = io(import.meta.env.VITE_SERVER_URL);

    setSocket(_socket);

    return () => {
      _socket.disconnect();
    };
  }, []);

  const joinRoom = useCallback(
    (roomCode, user) => {
      if (socket) {
        socket.emit("join-room", { roomCode, user });
      }
    },
    [socket]
  );

  const addSong = useCallback(
    (roomCode, song) => {
      if (socket) {
        socket.emit("add-song", { roomCode, song });
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider value={{ socket, joinRoom, addSong }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
