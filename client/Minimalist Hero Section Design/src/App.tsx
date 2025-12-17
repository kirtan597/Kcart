import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'motion/react';

import img1 from 'figma:asset/ef54ab635a7dd1c08c0d38a179451ed4ffe3714f.png';
import img2 from 'figma:asset/0839a34ab951697bd1015f5499ef3bf4a6fcccfa.png';
import img3 from 'figma:asset/07ddd87dc71067004d5978ad7da5e10a8f5aaee1.png';
import img4 from 'figma:asset/72597d182cdfd3d1af058f81e790ce94c8f224cb.png';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Product images - duplicated for infinite loop
  const images = [
    img1,
    img2,
    img3,
    img4,
  ];

  // Duplicate images 3 times for seamless infinite loop
  const infiniteImages = [...images, ...images, ...images];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Infinite Scrolling Background Slider */}
      <InfiniteSlider
        images={infiniteImages}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
      />

      {/* Gradient Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none z-10" 
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-8 left-8 md:top-12 md:left-16"
        >
          <h1 
            className="text-white tracking-widest"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: 300,
              textShadow: '0 0 1px rgba(255,255,255,0.5)'
            }}
          >
            Kcart
          </h1>
        </motion.div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
          {/* Floating Animation Container */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-center"
          >
            {/* Main Headline with Typewriter Effect */}
            <TypewriterText 
              text="Timeless Elegance Awaits"
              className="text-white mb-6 tracking-wide"
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 200,
                letterSpacing: '0.05em'
              }}
            />

            {/* Subheadline with Line Draw Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="relative mb-12"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 2.2, ease: "easeInOut" }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px bg-white/60"
                style={{ transformOrigin: 'center' }}
              />
              <p 
                className="text-gray-300 tracking-wider"
                style={{
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 300
                }}
              >
                Curated Collections for Discerning Tastes
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 3 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,1)',
                color: '#000000'
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-12 py-4 bg-transparent border border-white text-white tracking-widest transition-all duration-300 overflow-hidden group"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                letterSpacing: '0.2em'
              }}
            >
              {/* Pulsing Inner Glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-white/10 pointer-events-none"
              />
              <span className="relative z-10">EXPLORE NOW</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <ProgressBar isPaused={isPaused} />
      </div>
    </div>
  );
}

// Infinite Slider Component
function InfiniteSlider({ 
  images, 
  isPaused, 
  setIsPaused, 
  hoveredIndex, 
  setHoveredIndex 
}: {
  images: string[];
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (val: number | null) => void;
}) {
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    let lastTime = Date.now();
    const speed = 50; // pixels per second - increased from 20 to 50

    const animate = () => {
      if (!isPaused) {
        const now = Date.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        setOffset((prev) => {
          const newOffset = prev + speed * delta;
          // Reset when we've scrolled through one full set of 4 images
          const resetPoint = (images.length / 3) * 500; // 4 images * 500px width
          return newOffset >= resetPoint ? newOffset - resetPoint : newOffset;
        });
      } else {
        lastTime = Date.now();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, images.length]);

  return (
    <div className="absolute inset-0">
      {/* Background Layer - slower parallax */}
      <motion.div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${offset * 0.5}px)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={`bg-${index}`}
            className="relative flex-shrink-0"
            style={{ width: '500px', height: '100%' }}
          >
            <motion.img
              src={image}
              alt={`Luxury product ${(index % 4) + 1}`}
              className="w-full h-full object-contain"
              initial={{ filter: 'grayscale(0%) contrast(100%)' }}
              animate={{ 
                filter: 'grayscale(100%) contrast(120%)',
              }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                transformOrigin: 'center'
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* Foreground Layer - faster parallax with hover effects */}
      <motion.div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${offset}px)`,
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={`fg-${index}`}
            className="relative flex-shrink-0 cursor-pointer"
            style={{ width: '500px', height: '100%' }}
            onMouseEnter={() => {
              setIsPaused(true);
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
              setHoveredIndex(null);
            }}
            animate={{
              scale: hoveredIndex === index ? 1.05 : 1.0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <motion.img
              src={image}
              alt={`Luxury product ${(index % 4) + 1}`}
              className="w-full h-full object-contain"
              initial={{ filter: 'grayscale(0%) contrast(100%)' }}
              animate={{ 
                filter: hoveredIndex === index 
                  ? 'grayscale(100%) contrast(150%)' 
                  : 'grayscale(100%) contrast(120%)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                transformOrigin: 'center',
                mixBlendMode: 'normal'
              }}
            />
            
            {/* Duotone Overlay Shift */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/40 to-gray-900/40 pointer-events-none"
              animate={{
                opacity: hoveredIndex === index ? 0.6 : 0.3,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Typewriter Effect Component
function TypewriterText({ 
  text, 
  className, 
  style 
}: { 
  text: string; 
  className?: string; 
  style?: React.CSSProperties 
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.h2
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.h2>
  );
}

// Progress Bar Component
function ProgressBar({ isPaused }: { isPaused: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          const newProgress = prev + 0.5;
          return newProgress >= 100 ? 0 : newProgress;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
      <motion.div
        className="h-full bg-white"
        style={{
          width: `${progress}%`,
          transformOrigin: 'left'
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}