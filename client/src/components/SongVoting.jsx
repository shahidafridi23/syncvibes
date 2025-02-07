import { useSocket } from "@/contexts/SocketContext";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const SongVoting = ({ roomCode, song, userId }) => {
  const { upvoteSong, downvoteSong } = useSocket();

  const onUpvote = async () => {
    try {
      await upvoteSong(roomCode, song.songId, userId);
    } catch (error) {
      console.log(error);
    }
  };

  const onDownvote = async () => {
    try {
      await downvoteSong(roomCode, song.songId, userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-2 flex items-center justify-between">
      <div
        onClick={onUpvote}
        className={`flex items-center group hover:cursor-pointer ${
          song.upvote ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <ArrowBigUp
          className={`group-hover:text-gray-700 ${
            song.upvote ? "text-blue-500 fill-blue-500" : "text-gray-500"
          }`}
        />
        <span className="text-sm group-hover:text-gray-700">
          {song.upvote ? "Upvoted" : "upvote"}
        </span>
      </div>
      <div
        onClick={onDownvote}
        className={`flex items-center group hover:cursor-pointer ${
          song.downvote ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <ArrowBigDown
          className={`group-hover:text-gray-700 ${
            song.downvote ? "text-blue-500 fill-blue-500" : "text-gray-500"
          }`}
        />
        <span className="text-sm group-hover:text-gray-700">
          {song.downvote ? "Downvoted" : "Downvote"}
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-gray-700 mr-3">Score ({song.score})</span>
      </div>
    </div>
  );
};

export default SongVoting;
