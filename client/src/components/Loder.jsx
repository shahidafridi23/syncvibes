const Loder = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex space-x-2">
        <div
          className="w-2 h-6 bg-pink-500 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-8 bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-10 bg-pink-500 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div
          className="w-2 h-8 bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.6s" }}
        ></div>
        <div
          className="w-2 h-6 bg-pink-500 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loder;
