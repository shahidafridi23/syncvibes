import { Skeleton } from "./ui/skeleton";
import { Box } from "lucide-react";
import colors from "@/utils/colors";
import InviteFriends from "./InviteFriends";
import OpenRoom from "./OpenRoom";
import { useRoom } from "@/contexts/RoomContext";

const Rooms = () => {
  const { rooms, isLoading } = useRoom();

  if (isLoading) {
    return (
      <div className="my-10">
        <Skeleton className="w-full h-10 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-40" />
        </div>
      </div>
    );
  }

  if (rooms.length < 1) {
    return <div className="hidden" />;
  }

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold mb-5">Your Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {rooms.map((room, index) => {
          return (
            <div
              key={room.code}
              className="w-full rounded-sm border border-gray-200 p-5"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-md  flex items-center justify-center ${
                    colors[index % 12]
                  }`}
                >
                  <Box className="text-white" />
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-500">
                    CODE:{room.code}
                  </span>
                  <p className="text-sm font-bold">{room.title}</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">{room.description}</p>

              <div className="flex items-center justify-between">
                <InviteFriends code={room.code} />
                <OpenRoom code={room.code} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;
