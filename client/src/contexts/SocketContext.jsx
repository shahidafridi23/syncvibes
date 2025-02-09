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

  const upvoteSong = useCallback(
    (roomCode, songId, userId) => {
      if (socket) {
        socket.emit("upvote-song", { roomCode, songId, userId });
      }
    },
    [socket]
  );

  const downvoteSong = useCallback(
    (roomCode, songId, userId) => {
      if (socket) {
        socket.emit("downvote-song", { roomCode, songId, userId });
      }
    },
    [socket]
  );

  const playNext = useCallback(
    (roomCode) => {
      if (socket) {
        socket.emit("play-next", { roomCode });
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{ socket, joinRoom, addSong, upvoteSong, downvoteSong, playNext }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
