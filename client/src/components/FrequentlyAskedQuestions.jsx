import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FrequentlyAskedQuestions = () => {
  const faqs = [
    {
      question: "Is this app free to use?",
      answer:
        "Yes! Our basic features are free, with optional premium upgrades.",
    },
    {
      question: "How can I add songs from Spotify or YouTube?",
      answer:
        "Simply paste the song link into the room’s song input, and you’re set to go.",
    },
    {
      question: "How many users can join a room?",
      answer:
        "Our free plan allows up to 10 users per room, while premium plans increase the limit.",
    },
    {
      question: "How do I upvote/downvote a song?",
      answer:
        "Each song has a voting option. Click upvote or downvote to impact what plays next.",
    },
  ];

  return (
    <div className="w-full md:w-[50%] mx-auto py-10">
      <h1 className="mb-10 text-2xl md:text-4xl font-semibold text-center md:text-left">
        Frequently Asked Questions -
      </h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className={"text-left pr-2"}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FrequentlyAskedQuestions;
