import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(`/@${authState.user.username}`);
    } else {
      navigate("/login");
    }
  }, [authState]);

  const { user } = authState;

  return (
    <MaxWidthWrapper>
      <nav className="w-full py-10 flex items-center justify-between">
        <Logo />

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
            <DropdownMenuItem className="cursor-pointer">
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
