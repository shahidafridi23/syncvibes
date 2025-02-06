import AddSong from "@/components/AddSong";
import LeaveRoom from "@/components/LeaveRoom";
import Loder from "@/components/Loder";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SongStack from "@/components/SongStack";
import UsersInARoom from "@/components/UsersInARoom";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MusicRoom = () => {
  const { authData } = useAuth();
  const { joinRoom, users } = useSocket();

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
    if (!loading) {
      if (!room) {
        navigate(`/@${user.username}`);
      }
    }
  }, [room]);

  useEffect(() => {
    if (!loading && room) {
      joinRoom(code, user); // Call joinRoom when room is loaded
    }
  }, [loading, room]);

  if (loading) {
    return <Loder />;
  }

  return (
    <MaxWidthWrapper>
      <nav className="w-full py-10 flex items-center justify-between">
        <Logo />
        <LeaveRoom roomCode={room?.code} />
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[25%_1fr_30%]">
        <div className="col-1 border-l md:col-start-auto md:col-end-[-1] md:row-[1]">
          Now Playing
        </div>
        <div className="col-2 lg:px-10 ">
          <AddSong roomCode={room?.code} />
          <SongStack roomCode={room?.code} />
        </div>
        <div className="col-3 border-r hidden lg:block lg:col-start-1 lg:row-start-1">
          <div className="room-detils">
            <div className="text-md text-gray-700 flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-md  flex items-center justify-center bg-blue-500`}
              >
                <Box className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Room Code</div>
                <h2 className="text-sm text-gray-500">#{room?.code}</h2>
              </div>
            </div>
            <h1 className="text-lg font-extrabold">{room?.title}</h1>
            <p className="text-sm text-gray-500">{room?.description}</p>
          </div>
          <div className="w-[90%] h-[1px] bg-gray-200 my-5" />
          <UsersInARoom code={room?.code} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default MusicRoom;
