const Logo = () => {
  return (
    <div className="flex items-center text-2xl   font-bold text-gray-800">
      <span className="mr-2 -tracking-wider text-gray-700 font-extrabold">
        syncVibes
      </span>
      <div className="flex items-center space-x-1">
        {[12, 18, 8, 14, 10].map((height, index) => {
          return (
            <div
              key={index}
              className={`w-1 rounded ${
                index % 2 === 0 ? "bg-pink-500" : "bg-blue-500"
              }`}
              style={{ height: `${height}px` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Logo;
