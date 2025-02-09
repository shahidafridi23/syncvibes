import { useSocket } from "@/contexts/SocketContext";
import { Button } from "./ui/button";

const PlayNext = ({ roomCode, userId }) => {
  const { playNext } = useSocket();

  const handlePlayNext = async () => {
    await playNext(roomCode, userId);
  };

  return (
    <Button
      onClick={handlePlayNext}
      className="bg-blue-500 hover:bg-blue-400 w-full my-3 rounded-none"
    >
      Play Next
    </Button>
  );
};

export default PlayNext;
