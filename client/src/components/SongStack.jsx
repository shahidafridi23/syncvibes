import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";
import SongVoting from "./SongVoting";
import { motion, AnimatePresence } from "framer-motion";

const SongStack = ({ roomCode, userId }) => {
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
          const updatedSongs = [...prevSongs, song];
          return updatedSongs.sort((a, b) => {
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return a.songId < b.songId ? 1 : -1;
          });
        });
      });

      socket.on(
        "song-vote-response",
        ({ songId, upvote, downvote, score, message }) => {
          toast({ title: message });
          setSongs((prevSongs) => {
            const updatedSongs = prevSongs.map((song) =>
              song.songId === songId
                ? { ...song, upvote, downvote, score }
                : song
            );
            return updatedSongs.sort((a, b) => {
              if (b.score !== a.score) {
                return b.score - a.score;
              }
              return a.songId < b.songId ? 1 : -1;
            });
          });
        }
      );

      socket.on("song-upvoted", ({ songId, score }) => {
        setSongs((prevSongs) => {
          const updatedSongs = prevSongs.map((song) =>
            song.songId === songId ? { ...song, score } : song
          );
          return updatedSongs.sort((a, b) => {
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return a.songId < b.songId ? 1 : -1;
          });
        });
      });

      socket.on("song-downvoted", ({ songId, score }) => {
        setSongs((prevSongs) => {
          const updatedSongs = prevSongs.map((song) =>
            song.songId === songId ? { ...song, score } : song
          );
          return updatedSongs.sort((a, b) => {
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return a.songId < b.songId ? 1 : -1;
          });
        });
      });

      socket.on("song-upvote-failed", ({ message }) => {
        toast({ title: message, variant: "destructive" });
      });

      socket.on("song-downvote-failed", ({ message }) => {
        toast({ title: message, variant: "destructive" });
      });

      socket.on("top-song-removed", ({ songId }) => {
        setSongs((prevSongs) => {
          return prevSongs.filter((song) => {
            return song.songId !== songId;
          });
        });
      });

      return () => {
        socket.off("song-added");
        socket.off("song-vote-response");
        socket.off("song-upvoted");
        socket.off("song-downvoted");
        socket.off("song-upvote-failed");
        socket.off("song-downvote-failed");
        socket.off("top-song-removed");
      };
    }
  }, [socket]);

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
        <AnimatePresence>
          {songs.map((song) => (
            <motion.div
              key={song.songId}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <Card className="w-full grid grid-cols-4 gap-3 rounded-sm p-2 my-3">
                <div className="thumbnail w-full h-full">
                  <img src={song.thumbnail} alt={song.title} className="" />
                </div>
                <div className="details col-span-3">
                  <p className="line-clamp-2 leading-tight text-gray-500 text-sm">
                    {song.title}
                  </p>
                  <SongVoting roomCode={roomCode} song={song} userId={userId} />
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SongStack;
