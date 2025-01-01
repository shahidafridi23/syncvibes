import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ url, name }) => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={url} alt={name} />
      <AvatarFallback className="bg-blue-500 text-white font-extrabold">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
