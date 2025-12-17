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
  const linkClass = "text-gray-400 hover:text-white transition-colors duration-300 underline";

  return (
    <footer 
      className="bg-black text-white relative min-h-[400px] w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${assets.footer_bg})`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            {/* Brand Name */}
            <div className="mb-4">
              <h2 className="text-4xl font-bold text-white">Kcart</h2>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed text-sm mt-4">
              Kcart — curating excellence in every product. We're here to
              elevate your lifestyle with exceptional quality and care.
            </p>
            
            {/* Social Media Links */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Connect With Us</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://www.instagram.com/kirtannn_18/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white p-2 border-2 border-gray-600 hover:border-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com/kirtan597" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white p-2 border-2 border-gray-600 hover:border-white transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/kirtan-panchal-309760320/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white p-2 border-2 border-gray-600 hover:border-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white mb-2">Contact</h4>
              <a 
                href="mailto:kirtan.2082006@gmail.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>kirtan.2082006@gmail.com</span>
              </a>
              <a 
                href="tel:+918780092234" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <FaPhone className="w-4 h-4" />
                <span>+91 8780092234</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b-2 border-gray-600 pb-2">Shop</h3>
            <ul className="space-y-2 text-sm">
              {["New Arrivals", "Best Sellers", "Luxury Collections", "Gift Cards", "Sale"].map((item) => (
                <li key={item}>
                  <a href="#" className={linkClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b-2 border-gray-600 pb-2">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b-2 border-gray-600 pb-2">Company</h3>
            <ul className="space-y-2 text-sm">
              {[
                { text: "About Us", url: "/About" },
                { text: "Careers", url: "/NotFound" },
                { text: "Blog", url: "/NotFound" },
                { text: "Press", url: "/NotFound" },
                { text: "Sustainability", url: "/NotFound" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.url} className={linkClass}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b-2 border-gray-600 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
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
                className="bg-white border-2 border-gray-300 text-black px-4 py-2 text-sm w-full focus:outline-none focus:border-black placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-all duration-300 whitespace-nowrap"
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
        <div className="mt-12 pt-6 border-t-2 border-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Kcart. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-xs text-gray-400 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center md:flex-row gap-2 text-xs text-gray-400">
            <span>Secure payments with</span>
            <div className="flex items-center flex-wrap justify-center gap-2">
              <SiGooglepay size={16} className="hover:text-white transition-colors duration-300" title="Google Pay" aria-label="Google Pay" />
              <SiPhonepe size={16} className="hover:text-white transition-colors duration-300" title="PhonePe" aria-label="PhonePe" />
              <SiRazorpay size={16} className="hover:text-white transition-colors duration-300" title="Razorpay" aria-label="Razorpay" />
              <SiStripe size={16} className="hover:text-white transition-colors duration-300" title="Stripe" aria-label="Stripe" />
              <SiPaytm size={16} className="hover:text-white transition-colors duration-300" title="Paytm" aria-label="Paytm" />
              <div className="flex items-center gap-1 text-gray-400">
                <FaMoneyBillWave size={14} />
                <span className="text-xs">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/kirtan-panchal-309760320/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-gray-300 transition-colors duration-300"
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