import Features from "@/components/Features";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import HowItWorks from "@/components/HowItWorks";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <MaxWidthWrapper className="hero-bg lg:min-h-screen">
        <nav className="w-full py-10">
          <Link to={"/"}>
            <Logo />
          </Link>
        </nav>

        <section className="text-center text-gray-700 py-10 md:py-20 flex flex-col items-center justify-center">
          <h1 className="text-5xl px-5">
            <span className="text-blue-500">Vibe</span> Together,{" "}
            <span className="text-blue-500">Listen</span> Together
          </h1>
          <ul className="flex flex-col md:flex-row md:items-center gap-2 my-5">
            <li className="flex items-center gap-1">
              <ArrowRight className="text-blue-500 " />{" "}
              <span className="text-xl font-bold">Create a music room</span>
            </li>
            <li className="flex items-center gap-1">
              <ArrowRight className="text-blue-500 " />{" "}
              <span className="text-xl font-bold">Invite friends</span>
            </li>
            <li className="flex items-center gap-1">
              <ArrowRight className="text-blue-500 " />{" "}
              <span className="text-xl font-bold">Add Songs</span>
            </li>
            <li className="flex items-center gap-1">
              <ArrowRight className="text-blue-500 " />{" "}
              <span className="text-xl font-bold">Upvote/Downvote</span>
            </li>
          </ul>

          <div>
            <Link to={"/register"}>
              <Button className="mr-5 bg-blue-500 hover:bg-blue-600">
                Get Started
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button variant="ghost">Join a Room</Button>
            </Link>
          </div>
        </section>
      </MaxWidthWrapper>
      <MaxWidthWrapper className={"bg-gray-50 "}>
        <Features />
      </MaxWidthWrapper>
      <MaxWidthWrapper className={"py-10 md:pt-20 md:pb-10 px-10"}>
        <HowItWorks />
      </MaxWidthWrapper>
      <MaxWidthWrapper className={"bg-gray-50 py-5 md:py-10 px-10"}>
        <FrequentlyAskedQuestions />
      </MaxWidthWrapper>
    </>
  );
};

export default Home;
