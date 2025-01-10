import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const UserProfile = ({ ...user }) => {
  const { setAuthState } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthState({ user: null, loading: false, err: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar url={user.profileImage} name={user.name} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 relative right-5 md:bottom-12 md:right-32 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserAvatar url={user.profileImage} name={user.name} />
          <div className="pl-1">
            <h3 className="font-semibold">{user.name}</h3>
            <h4 className=" text-gray-500">@{user.username}</h4>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleLogOut()}
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
