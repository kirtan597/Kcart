// Smooth scroll utilities for Lenis integration

// Scroll to top of page
export const scrollToTop = () => {
  if (window.lenis) {
    window.lenis.scrollTo(0, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Scroll to specific element
export const scrollToElement = (selector, offset = 0) => {
  const element = document.querySelector(selector);
  if (element && window.lenis) {
    window.lenis.scrollTo(element, {
      offset: offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Scroll to specific position
export const scrollToPosition = (position) => {
  if (window.lenis) {
    window.lenis.scrollTo(position, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    window.scrollTo({ top: position, behavior: 'smooth' });
  }
};

// Get current scroll position
export const getCurrentScroll = () => {
  if (window.lenis) {
    return window.lenis.scroll;
  }
  return window.pageYOffset || document.documentElement.scrollTop;
};

// Stop smooth scrolling
export const stopScroll = () => {
  if (window.lenis) {
    window.lenis.stop();
  }
};

// Start smooth scrolling
export const startScroll = () => {
  if (window.lenis) {
    window.lenis.start();
  }
};