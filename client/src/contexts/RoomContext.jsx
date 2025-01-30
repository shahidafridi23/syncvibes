import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRooms() {
      try {
        const response = await axios.get("/room");
        const { rooms } = response.data;

        setRooms(rooms);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getRooms();
  }, []);

  return (
    <RoomContext.Provider value={{ rooms, setRooms, isLoading }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
