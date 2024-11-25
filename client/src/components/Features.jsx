import { Boxes, Music, UsersRound, Youtube } from "lucide-react";

const Features = () => {
  const featureCards = [
    {
      title: "Real-Time Voting",
      description:
        "Vote for your favorite tracks and decide the playlist together in real-time.",
      icon: UsersRound,
    },
    {
      title: "Add from YouTube or Spotify",
      description:
        "Pick songs from YouTube or Spotify, add them to the room, and share your favorites instantly.",
      icon: Youtube,
    },
    {
      title: "Song Recommendations",
      description:
        "See suggestions based on past plays in your room. The more you listen, the better the recommendations.",
      icon: Music,
    },
    {
      title: "Customizable Rooms",
      description:
        "Personalize your music room, set themes, and make it uniquely yours.",
      icon: Boxes,
    },
  ];
  return (
    <section className="py-10 md:py-20 px-10">
      <h1 className="text-center mb-10 md:mb-20 text-2xl md:text-4xl font-semibold">
        Why Choose Our Music <br /> Collaboration App?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:px-40">
        {featureCards.map((card, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="rounded-md mb-5">
                <card.icon size={50} color="#3b82f6" />
              </div>
              <h2 className="text-lg font-bold mb-2">{card.title}</h2>
              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
