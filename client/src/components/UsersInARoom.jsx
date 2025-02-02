import { useSocket } from "@/contexts/SocketContext";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const UsersInARoom = ({ code }) => {
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/room/${code}/users`);
        const { users } = response?.data;
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user-joined", ({ user }) => {
        toast({ title: `${user.name} Joined This Room!` });
        setUsers((prevUsers) => {
          if (prevUsers.some((u) => u.username === user.username)) {
            return prevUsers;
          }
          return [...prevUsers, user];
        });
      });

      return () => {
        socket.off("user-joined");
      };
    }
  }, [socket]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-5">Peple Joined</h2>
      {users?.map((user) => {
        return (
          <div key={user.id} className="flex items-center mb-2">
            <UserAvatar url={user.profileImage} name={user.name} />
            <div className="pl-1">
              <h3 className="font-semibold">{user.name}</h3>
              <h4 className=" text-gray-500">@{user.username}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersInARoom;
