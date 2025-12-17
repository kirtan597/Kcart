import React from 'react';

const SimpleHero = () => {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-light mb-4">Kcart</h1>
        <p className="text-xl">Timeless Elegance Awaits</p>
        <button className="mt-8 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors">
          EXPLORE NOW
        </button>
      </div>
    </div>
  );
};

export default SimpleHero;