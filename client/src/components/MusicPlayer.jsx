import { useEffect, useRef, useState } from "react";
import PlayNext from "./PlayNext";
import { useToast } from "@/hooks/use-toast";
import { useSocket } from "@/contexts/SocketContext";
import axios from "axios";
const MusicPlayer = ({ isRoomCreator, roomCode, userId }) => {
  const iframeRef = useRef(null);
  const { socket } = useSocket();
  const { toast } = useToast();
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const getCurrentlyPlayingSong = async () => {
      try {
        const response = await axios.get(`/room/${roomCode}/now-playing`);
        const { song } = response?.data;
        const elapsedTime = Math.floor((Date.now() - song.startTime) / 1000);
        setCurrentPlayingSong({ ...song, elapsedTime });
        setIsPlaying(true);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentlyPlayingSong();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("now-playing", ({ song, message }) => {
        const elapsedTime = Math.floor((Date.now() - song.startTime) / 1000);
        setCurrentPlayingSong({ ...song, elapsedTime });
        setIsPlaying(true);
        toast({ title: message });
      });
      socket.on("no-songs-in-stack", ({ message }) => {
        toast({ title: message, variant: "destructive" });
      });

      return () => {
        socket.off("now-playing");
        socket.off("no-songs-in-stack");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (isUserInteracted && iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"unMute","args":""}',
        "*"
      );
    }
  }, [isUserInteracted]);

  const handleUserInteraction = () => {
    setIsUserInteracted((prev) => !prev);
  };

  return (
    <div className="md:pl-5 mb-5">
      <h2 className="text-lg font-bold mb-3">Now Playing</h2>
      {isPlaying ? (
        <div className="player w-full h-52 relative">
          {currentPlayingSong && (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${
                currentPlayingSong.songId
              }?enablejsapi=1&autoplay=1&mute=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=0&start=${
                currentPlayingSong.elapsedTime || 0
              }`}
              allow="autoplay"
              className="w-full h-full"
            ></iframe>
          )}

          <div
            onClick={handleUserInteraction}
            className="absolute inset-0 pointer-events-auto flex items-center justify-center group"
          >
            <span className="text-lg text-white hidden group-hover:block cursor-pointer">
              Unmute
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-52 text-gray-500 bg-gray-100 flex items-center justify-center font-medium">
          No songs playing
        </div>
      )}

      {isRoomCreator && <PlayNext roomCode={roomCode} userId={userId} />}
    </div>
  );
};

export default MusicPlayer;
