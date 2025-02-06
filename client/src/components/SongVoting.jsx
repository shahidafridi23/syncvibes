import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const SongVoting = ({ roomCode, songId }) => {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="upvote flex  items-center group hover:cursor-pointer">
        <ArrowBigUp className="text-gray-500 group-hover:text-gray-700" />
        <span className="text-sm text-gray-500 group-hover:text-gray-700">
          Upvote
        </span>
      </div>
      <div className="upvote flex  items-center group hover:cursor-pointer">
        <ArrowBigDown className="text-gray-500 group-hover:text-gray-700" />
        <span className="text-sm text-gray-500 group-hover:text-gray-700">
          Downvote
        </span>
      </div>
      <div className="upvote flex  items-center">
        <span className="text-sm text-gray-700 group-hover:text-gray-700 mr-3">
          Score (78)
        </span>
      </div>
    </div>
  );
};

export default SongVoting;
