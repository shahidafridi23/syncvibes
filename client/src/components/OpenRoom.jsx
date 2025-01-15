import React from "react";

import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OpenRoom = ({ code }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOpenRoom = async (code) => {
    try {
      const response = await axios.post(`/room/${code.toUpperCase()}`);
      const { username } = response.data.data;
      navigate(`/@${username}/${code}`);
    } catch (error) {
      const { message } = error.response.data;
      toast({ variant: "destructive", title: message });
      throw error;
    }
  };
  return (
    <button
      onClick={() => handleOpenRoom(code)}
      className="text-xs mt-5 font-medium text-blue-500 hover:text-blue-700 flex items-center gap-1"
    >
      <span>Open Room</span>
      <ExternalLink className="w-4 h-4 text-blue-500" />
    </button>
  );
};

export default OpenRoom;
