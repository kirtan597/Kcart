import { scrollToElement, scrollToTop, scrollToPosition } from '../utils/smoothScroll';

const SmoothScrollExample = () => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Smooth Scroll Navigation</h3>
      
      {/* Example buttons for smooth scrolling */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => scrollToTop()}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Scroll to Top
        </button>
        
        <button
          onClick={() => scrollToElement('#footer')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Scroll to Footer
        </button>
        
        <button
          onClick={() => scrollToElement('.collection-section', -100)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Scroll to Collection
        </button>
        
        <button
          onClick={() => scrollToPosition(window.innerHeight)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Scroll One Screen Down
        </button>
      </div>
      
      <p className="text-sm text-gray-600">
        These buttons demonstrate smooth scrolling with Lenis integration.
      </p>
    </div>
  );
};

export default SmoothScrollExample;