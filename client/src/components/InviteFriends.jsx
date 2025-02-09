import { MoveRight } from "lucide-react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const InviteFriends = ({ code }) => {
  const { authData } = useAuth();
  const { user } = authData;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs mt-5 font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1">
          <span>Invite Friends</span>
          <MoveRight className="w-4 h-4 text-gray-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link can directly join a room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`${import.meta.env.VITE_CLIENT_URL}/@${
                user.username
              }/${code}`}
              readOnly
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3 relative"
            onClick={() =>
              handleCopy(`${import.meta.env.VITE_CLIENT_URL}/room/${code}`)
            }
          >
            <span className="sr-only">Copy</span>
            <Copy />
            <span
              className={`absolute top-[-30px] -right-2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 transition-opacity ${
                isCopied ? "opacity-100" : ""
              }`}
            >
              Copied!
            </span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriends;
