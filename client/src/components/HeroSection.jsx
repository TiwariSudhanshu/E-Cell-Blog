const HeroSection = () => {
    return (
      <div className="relative bg-gradient-to-r from-blue-700 via-teal-600 to-green-400 p-6 rounded-lg shadow-lg">
        <div className="absolute inset-0 blur-lg opacity-70 bg-gradient-to-r from-blue-700 via-teal-600 to-green-400"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog Section</h1>
          {/* <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg">
            Explore More
          </button> */}
        </div>
      </div>
    );
  };

export default HeroSection;