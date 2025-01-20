import Loder from "@/components/Loder";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MusicRoom = () => {
  const { authData } = useAuth();

  if (!authData) {
    return <Loder />;
  }

  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = authData;

  const { code } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoomDetails = async (code) => {
      try {
        const response = await axios.post(`/room/join/${code.toUpperCase()}`);
        const { room } = response.data.data;
        setRoom(room);
      } catch (error) {
        const { message } = error.response.data;
        toast({ variant: "destructive", title: message });
        setRoom(null);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    getRoomDetails(code);
  }, []);

  useEffect(() => {
    console.log("called");

    if (!loading) {
      console.log("innerRoom", room);

      if (!room) {
        console.log("inner called");

        navigate(`/@${user.username}`);
      }
    }
  }, [room]);

  if (loading) {
    return <Loder />;
  }

  const { joinUser } = useSocket();

  if (room) {
    joinUser(room.code, user);
  }

  return (
    <MaxWidthWrapper>
      <nav className="w-full py-10 flex items-center justify-between">
        <Logo />
      </nav>
    </MaxWidthWrapper>
  );
};

export default MusicRoom;
