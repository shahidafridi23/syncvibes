import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

const SongStack = ({ roomCode }) => {
  const { socket } = useSocket();
  const { toast } = useToast();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const response = await axios.get(`/room/${roomCode}/songs`);
        const { songs } = response?.data;
        setSongs(songs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllSongs();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("song-added", ({ song }) => {
        toast({
          title: `Song added succesfully------------------- ${song.title}  `,
        });
        setSongs((prevSongs) => {
          return [...prevSongs, song];
        });
      });

      return () => {
        socket.off("song-added");
      };
    }
  }, [socket, songs]);

  console.log("songs", songs);

  if (isLoading) {
    return (
      <>
        <Skeleton className={"w-20 h-10"} />
      </>
    );
  }

  return (
    <div>
      <h2>Songs Stack</h2>

      {songs?.map((song) => {
        return (
          <Card className="w-full grid grid-cols-4 gap-3 rounded-sm p-2 my-5">
            <div className="thumbnail w-full h-full  bg-green-500">
              <img src={song.thumbnail} alt={song.title} className="" />
            </div>
            <div className="details col-span-3">
              <p className="line-clamp-2 leading-tight">{song.title}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SongStack;
