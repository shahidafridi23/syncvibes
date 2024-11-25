import { Bookmark, Disc, Headphones, SquarePlus } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Step 1: Create or Join a Room",
      description:
        "Start your music journey by creating a room or joining one. Open to all music lovers.",
      icon: SquarePlus,
    },
    {
      title: "Step 2: Add Your Favorite Songs",
      description:
        "Add songs directly from YouTube or Spotify by just adding the url.",
      icon: Disc,
    },
    {
      title: "Step 3: Vote & Listen Together",
      description:
        "Vote for the next track and listen as a group. The most popular tracks get played!",
      icon: Headphones,
    },
    {
      title: "Step 4: Save Your Favorite Song",
      description:
        "Keep track of songs you love and add in your playlist for adding songs in rooms.",
      icon: Bookmark,
    },
  ];

  return (
    <div className="w-full md:w-[50%] mx-auto">
      <h1 className="mb-10 md:mb-20 text-2xl md:text-4xl font-semibold text-center md:text-left">
        How it works?
      </h1>
      {steps.map((step, index) => {
        return (
          <div key={index} className="flex gap-5 md:gap-10 mb-5 md:mb-10">
            <div className="p-2 bg-gray-100 rounded-md max-h-fit">
              <step.icon className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{step.title}</h2>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HowItWorks;
