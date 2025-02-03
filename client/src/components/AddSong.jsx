import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getYouTubeVideoId from "@/utils/getVideoId";

const formSchema = z.object({
  url: z
    .string()
    .regex(
      /^(https:\/\/www\.youtube\.com\/watch\?v=[\w-]+|https:\/\/youtu\.be\/[\w-]+)(\?si=[\w-]+)?$/,
      "Invalid YouTube URL"
    ),
});

const AddSong = () => {
  //https://www.youtube.com/watch?v=86VhvSe80LQ
  //https://youtu.be/86VhvSe80LQ?si=2eTh8-X8ouVej1Qj
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onAdd({ url }) {
    try {
      const extractedId = await getYouTubeVideoId(url);
      //get youtube video deatils from this extractedId
    } catch (error) {
      console.log(error);
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
          <Button className="bg-blue-500 hover:bg-blue-400">Add</Button>
        </div>
        <img
          src="https://img.youtube.com/vi/kKznez09td4/hqdefault.jpg"
          alt="hjsgd"
        />
      </form>
    </Form>
  );
};

export default AddSong;
