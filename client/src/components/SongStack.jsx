import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";
import SongVoting from "./SongVoting";

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

  if (isLoading) {
    return (
      <>
        <Skeleton className={"w-32 h-10 my-6"} />
        <Skeleton className={"my-5 w-full h-24"} />
        <Skeleton className={"my-5 w-full h-24"} />
      </>
    );
  }

  return (
    <div className="my-6">
      <h2 className="font-bold text-lg">Songs Stack</h2>

      {songs?.length < 1 ? (
        <div className="my-2">No Songs Added</div>
      ) : (
        songs?.map((song) => {
          return (
            <Card className="w-full grid grid-cols-4 gap-3 rounded-sm p-2 my-5">
              <div className="thumbnail w-full h-full  ">
                <img src={song.thumbnail} alt={song.title} className="" />
              </div>
              <div className="details col-span-3">
                <p className="line-clamp-2 leading-tight text-gray-500 text-sm">
                  {song.title}
                </p>
                <SongVoting roomCode={roomCode} songId={song.songId} />
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default SongStack;
