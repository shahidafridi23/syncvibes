import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WokeUp = ({ isWokeUp }) => {
  return (
    <AlertDialog open={isWokeUp}>
      <AlertDialogTrigger asChild />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wait server is waking up</AlertDialogTitle>
          <AlertDialogDescription>
            We are using free plan of render,{" "}
            <span className="font-extrabold">
              it will take at least 30 seconds
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
