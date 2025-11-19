# Lenis Smooth Scrolling Integration

## Overview
Lenis is a lightweight, robust, and performant smooth scroll library that provides buttery smooth scrolling experience across your website.

## Installation
```bash
npm install lenis
```

## Implementation
The Lenis library has been integrated into the main `App.jsx` component to provide smooth scrolling throughout the entire application.

### Configuration
```javascript
const lenis = new Lenis({
  duration: 1.2,              // Scroll duration (in seconds)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  orientation: "vertical",     // Scroll direction
  gestureOrientation: "vertical",
  smoothWheel: true,          // Enable smooth wheel scrolling
  wheelMultiplier: 1,         // Wheel scroll speed multiplier
  smoothTouch: false,         // Disable smooth touch (better for mobile)
  touchMultiplier: 2,         // Touch scroll speed multiplier
  infinite: false,            // Disable infinite scrolling
});
```

## Features
- **Smooth Wheel Scrolling**: Natural, buttery smooth scrolling with mouse wheel
- **Performance Optimized**: Uses requestAnimationFrame for optimal performance
- **Customizable Easing**: Smooth easing function for natural feel
- **Mobile Friendly**: Touch scrolling optimized for mobile devices
- **Lightweight**: Minimal impact on bundle size

## Benefits
1. **Enhanced User Experience**: Provides a premium, smooth scrolling feel
2. **Professional Look**: Makes the website feel more polished and modern
3. **Better Control**: Smooth transitions between sections
4. **Cross-browser Compatible**: Works consistently across all modern browsers

## Usage
Once integrated, Lenis works automatically across the entire application. No additional configuration needed for individual pages or components.

### Programmatic Scrolling
If you need to scroll to a specific element programmatically:
```javascript
lenis.scrollTo(element, {
  offset: 0,
  duration: 1.2,
  easing: (t) => t,
});
```

## Documentation
For more information, visit: https://www.npmjs.com/package/lenis

## Notes
- The library is initialized in `App.jsx` and runs throughout the app lifecycle
- Cleanup is handled automatically when the component unmounts
- Works seamlessly with React Router navigation
