import { assets } from "../assets/assets";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  SiGooglepay,
  SiRazorpay,
  SiStripe,
  SiPhonepe,
  SiPaytm,
} from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkClass = "text-gray-300 hover:text-white transition-colors duration-300";

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-gray-100 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-600/10 pointer-events-none"></div>
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            {/* Brand Name */}
            <div className="mb-4">
              <h2 className="text-4xl font-bold text-white">Kcart</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm mt-4">
              Kcart — curating excellence in every product. We're here to
              elevate your lifestyle with exceptional quality and care.
            </p>
            
            {/* Social Media Links */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/kirtannn_18/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} bg-white/10 p-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300`}
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/kirtan597" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} bg-white/10 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300`}
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/kirtan-panchal-309760320/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} bg-white/10 p-2 rounded-lg hover:bg-blue-600 transition-all duration-300`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
              <a 
                href="mailto:kirtan.2082006@gmail.com" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>kirtan.2082006@gmail.com</span>
              </a>
              <a 
                href="tel:+918780092234" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FaPhone className="w-4 h-4" />
                <span>+91 8780092234</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-purple-400">Shop</h3>
            <ul className="space-y-3 text-sm">
              {["New Arrivals", "Best Sellers", "Luxury Collections", "Gift Cards", "Sale"].map((item) => (
                <li key={item}>
                  <a href="#" className={`${linkClass} flex items-center before:content-['→'] before:mr-2 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-400">
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { text: "Contact Us", url: "/Contact" },
                { text: "FAQs", url: "/NotFound" },
                { text: "Shipping Policy", url: "/NotFound" },
                { text: "Returns & Refunds", url: "/NotFound" },
                { text: "Size Guide", url: "/NotFound" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.url} className={`${linkClass} flex items-center before:content-['→'] before:mr-2 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-indigo-400">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { text: "About Us", url: "/About" },
                { text: "Careers", url: "/NotFound" },
                { text: "Blog", url: "/NotFound" },
                { text: "Press", url: "/NotFound" },
                { text: "Sustainability", url: "/NotFound" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.url} className={`${linkClass} flex items-center before:content-['→'] before:mr-2 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-gradient-to-r from-purple-400 to-blue-400">
              Newsletter
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Join our mailing list for exclusive offers and early access to new collections.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-lg placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-purple-500/20 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              By subscribing you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-300">
            &copy; {currentYear} Kcart. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-xs text-gray-300 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center md:flex-row gap-3 text-xs text-gray-300">
            <span>Secure payments with</span>
            <div className="flex items-center flex-wrap justify-center gap-3">
              <SiGooglepay size={20} className="hover:text-white transition-colors duration-300" title="Google Pay" aria-label="Google Pay" />
              <SiPhonepe size={20} className="hover:text-white transition-colors duration-300" title="PhonePe" aria-label="PhonePe" />
              <SiRazorpay size={20} className="hover:text-white transition-colors duration-300" title="Razorpay" aria-label="Razorpay" />
              <SiStripe size={20} className="hover:text-white transition-colors duration-300" title="Stripe" aria-label="Stripe" />
              <SiPaytm size={20} className="hover:text-white transition-colors duration-300" title="Paytm" aria-label="Paytm" />
              <div className="flex items-center gap-1 text-green-300">
                <FaMoneyBillWave size={16} />
                <span className="text-xs">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/50">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/kirtan-panchal-309760320/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-purple-300 transition-colors duration-300 underline underline-offset-4"
            >
              Kirtan Panchal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;