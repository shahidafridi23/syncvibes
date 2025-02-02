import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

const WokeUp = ({ isWokeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <AlertDialog open={isWokeUp}>
      <AlertDialogTrigger asChild />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wait server is waking up</AlertDialogTitle>
          <AlertDialogDescription>
            We are using free plan of render,{" "}
            <span className="font-extrabold">
              it will take at least <span>{timeLeft}</span> seconds
            </span>{" "}
            to wake up the server. please wait a moment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"flex items-center"}>
          <div className="w-5 h-5 border-4 border-t-transparent border-gray-400 border-solid rounded-full animate-spin"></div>{" "}
          <span className="font-extrabold"> Wait....</span>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WokeUp;
