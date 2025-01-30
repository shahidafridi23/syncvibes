import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRoom } from "@/contexts/RoomContext";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "title should be more than 3 characters." })
    .max(30, { message: "title should be less than 30 characters." }),
  description: z
    .string()
    .min(6, { message: "description should be more than 6 characters." })
    .max(50, { message: "description should be less than 50 characters." }),
});

const CreateRoom = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { rooms, setRooms } = useRoom();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);

      const response = await axios.post("/room", { ...values });
      const { room, message } = response?.data;

      setRooms((prev) => [...prev, room]);

      toast({ title: message });
    } catch (error) {
      const { message } = error.response.data;
      console.log(error);
      toast({ variant: "destructive", title: message });
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-400 mt-auto ml-auto w-full md:w-fit">
          <Plus /> Create New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Room</DialogTitle>
          <DialogDescription>
            Give uniue title and description to your room.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="bg-blue-500 hover:bg-blue-400">
                {isSubmitting && (
                  <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                )}
                {isSubmitting ? "Creating..." : "Create Room"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
