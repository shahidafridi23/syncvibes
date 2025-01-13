import GoogleAuth from "@/components/GoogleAuth";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Loder from "@/components/Loder";

const formSchema = z.object({
  name: z.string().min(3, { message: "Enter your full name" }),
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Register = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const { setAuthData } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/auth/register", { ...values });
      const { token, user, message } = response.data;

      localStorage.setItem("authToken", token);

      setAuthData({ token, user });
      toast({ title: message });
    } catch (error) {
      const { message } = error.response.data;
      toast({ variant: "destructive", title: message });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MaxWidthWrapper
      className={"w-screen h-screen flex items-center justify-center"}
    >
      <div className="">
        <Logo />

        <div className="my-10">
          <h2 className="text-2xl font-extrabold ">Register</h2>
          <p>Create a new account to collaborate music.</p>
        </div>

        <GoogleAuth btnText="Create an account" />

        <div className="flex items-center justify-center my-4">
          <div className="h-px w-full bg-gray-300"></div>
          <span className="mx-4 text-gray-400">Or</span>
          <div className="h-px w-full bg-gray-300"></div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">
              {isSubmitting && (
                <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
              )}
              Create an account
            </Button>
          </form>
        </Form>

        <div className="my-3">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Register;
