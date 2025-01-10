import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

const formSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code should be 6 characters." })
    .max(6, { message: "Code should be 6 characters." }),
});

const JoinRoom = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-sm gap-3"
      >
        <div>
          <h1 className="text-lg font-extrabold mb-2">Join A Room</h1>
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Code"
                      {...field}
                      className="tracking-[5px] font-semibold placeholder:tracking-normal placeholder:font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-blue-500 hover:bg-blue-400">
              {isSubmitting && (
                <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
              )}
              {isSubmitting ? "Joining..." : "Join"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default JoinRoom;
