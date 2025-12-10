import { assets } from "../assets/assets";
import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [index, setIndex] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const [progress, setProgress] = useState(0);

  const banners = {
    mobile: [
      assets.phone_1,
      assets.phone_2,
      assets.phone_3,
      assets.phone_4,
      assets.phone_5,
      assets.phone_6,
      assets.phone_7
    ]
      .map(img => ({ image: img, link: "#collection" })),
    desktop: [
      { image: assets.banner_2, link: "#collection" },
      { image: assets.banner_3, link: "#collection" },
      { image: assets.banner_4, link: "#collection" },
      { image: assets.banner_5, link: "#collection" },
      { image: assets.banner_6, link: "#collection" },
      { image: assets.banner_7, link: "#collection" }
    ]
  };

  const desktopSlides = [banners.desktop.at(-1), ...banners.desktop, banners.desktop[0]];
  const items = useMemo(() => (mobile ? banners.mobile : desktopSlides), [mobile]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    heroRef.current && obs.observe(heroRef.current);
    return () => heroRef.current && obs.unobserve(heroRef.current);
  }, []);

  useEffect(() => {
    const resize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (hovered || !inView) {
      setProgress(0);
      return;
    }
    
    // Auto-advance every 2 seconds
    const autoPlayInterval = setInterval(() => {
      setIndex(prev => prev + 1);
      setProgress(0);
    }, 2000);
    
    // Progress bar animation - optimized for smooth performance
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 5; // 20 steps in 2 seconds (100ms each) - smooth and lag-free
      });
    }, 100);
    
    return () => {
      clearInterval(autoPlayInterval);
      clearInterval(progressInterval);
    };
  }, [hovered, inView]);

  useEffect(() => {
    if (mobile && scrollRef.current && inView) {
      scrollRef.current.children[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [index, mobile, inView]);

  useEffect(() => {
    if (!mobile) {
      if (index === desktopSlides.length - 1) {
        const t = setTimeout(() => { setTransitioning(false); setIndex(1); }, 1000);
        return () => clearTimeout(t);
      }
      if (index === 0) {
        const t = setTimeout(() => { setTransitioning(false); setIndex(desktopSlides.length - 2); }, 1000);
        return () => clearTimeout(t);
      }
      setTransitioning(true);
    }
  }, [index, mobile]);

  const Slide = ({ item, i }) => (
    <a href={item.link} key={i} className="h-full flex-shrink-0 relative" style={{ width: `${100 / items.length}%` }}>
      <img src={item.image} alt={`Banner ${i}`} className="w-full h-full object-cover object-center" />
    </a>
  );

  return (
    <div ref={heroRef} className={`relative w-full overflow-hidden bg-gray-100 ${mobile ? 'h-[70vh] max-h-[700px]' : 'aspect-[1.85/1] max-h-[550px]'}`}>
      {mobile ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory h-full" ref={scrollRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {items.map((item, i) => (
            <a href={item.link} key={i} className="flex-shrink-0 w-full h-full snap-center relative">
              <img src={item.image} alt={`Mobile banner ${i}`} className="w-full h-full object-cover object-center" />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full" style={{ transform: `translateX(-${index * (100 / items.length)}%)`, transition: transitioning ? "transform 1s ease-in-out" : "none", width: `${items.length * 100}%` }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {items.map((item, i) => <Slide key={i} item={item} i={i} />)}
        </div>
      )}



      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-1.5 z-10">
        {banners.desktop.map((_, i) => {
          const isActive = ((index - 1 + banners.desktop.length) % banners.desktop.length === i);
          return (
            <button
              key={i}
              onClick={() => {
                setIndex(i + 1);
                setProgress(0);
              }}
              className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden ${isActive ? "w-8" : "w-2 hover:bg-white/70"}`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`absolute inset-0 bg-white/50 ${!isActive && 'opacity-100'}`} />
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-white" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
                  <div className="absolute inset-0 bg-white/50" />
                </>
              )}
            </button>
          );
        })}
      </div>

      {!mobile && (
        <>
          <button onClick={() => setIndex(prev => prev - 1)} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2.5 md:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20" aria-label="Previous Slide">
            <ChevronLeft className="text-white w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button onClick={() => setIndex(prev => prev + 1)} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2.5 md:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20" aria-label="Next Slide">
            <ChevronRight className="text-white w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
