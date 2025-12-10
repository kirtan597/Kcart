import { useEffect, useState } from 'react';

const BrandCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // E-commerce offers and promotional content
  const offers = [
    { name: 'FREE SHIPPING', logo: 'FREE SHIPPING', style: 'font-bold text-black tracking-wider' },
    { name: 'flash sale', logo: 'flash sale', style: 'font-light text-black lowercase italic' },
    { name: 'UP TO 70% OFF', logo: 'UP TO 70% OFF', style: 'font-bold text-black tracking-widest' },
    { name: 'new arrivals', logo: 'new arrivals', style: 'font-normal text-black lowercase tracking-wide' },
    { name: 'BEST DEALS', logo: 'BEST DEALS', style: 'font-bold text-black tracking-wider' },
    { name: 'limited time', logo: 'limited time', style: 'font-light text-black lowercase italic' },
    { name: 'TRENDING NOW', logo: 'TRENDING NOW', style: 'font-bold text-black tracking-wider' },
    { name: 'exclusive offers', logo: 'exclusive offers', style: 'font-normal text-black lowercase' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        
        {/* Scrolling container */}
        <div className="flex overflow-hidden">
          <div 
            className={`flex items-center animate-scroll ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            style={{
              width: 'max-content'
            }}
          >
            {offers.concat(offers).map((offer, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center h-10"
                style={{ minWidth: '120px' }}
              >
                <div className={`${offer.style} text-sm sm:text-base md:text-lg hover:opacity-60 transition-opacity duration-300 cursor-pointer select-none whitespace-nowrap`}>
                  {offer.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BrandCarousel;