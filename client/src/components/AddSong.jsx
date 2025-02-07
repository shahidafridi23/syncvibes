import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getYouTubeVideoId from "@/utils/getVideoId";
import axios from "axios";
import { useSocket } from "@/contexts/SocketContext";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  url: z
    .string()
    .regex(
      /^(https:\/\/www\.youtube\.com\/watch\?v=[\w-]+|https:\/\/youtu\.be\/[\w-]+)(\?si=[\w-]+)?$/,
      "Invalid YouTube URL"
    ),
});

const AddSong = ({ roomCode }) => {
  const { socket, addSong } = useSocket();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on("song-add-failed", ({ message }) => {
        toast({ title: message, variant: "destructive" });
      });

      return () => {
        socket.off("song-add-failed");
      };
    }
  }, [socket]);

  async function onAdd({ url }) {
    try {
      setIsAdding(true);
      const extractedId = await getYouTubeVideoId(url);
      const videoDetails = await axios.get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${extractedId}&format=json`
      );

      const { title, thumbnail_url } = videoDetails.data;

      const song = {
        songId: extractedId,
        title,
        thumbnail: thumbnail_url,
        upvote: 0,
        downvote: 0,
        score: 0,
      };

      await addSong(roomCode, song);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onAdd)}>
        <h2 className="text-lg font-bold mb-3">Add Songs</h2>
        <div className="grid grid-cols-[75%_20%] gap-5">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Youtube URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-blue-500 hover:bg-blue-400">
            {isAdding ? (
              <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
            ) : (
              <span>Add</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddSong;
