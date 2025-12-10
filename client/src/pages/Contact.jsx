import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import AppDownload from "../components/AppDownload"; 

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_xury4ej';
  const EMAILJS_TEMPLATE_ID = 'template_e9duwa7';
  const EMAILJS_PUBLIC_KEY = '9AdVticVIQoO-ywTB';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Reset form element
        form.current.reset();
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 heading-font">
            Get In <span className="text-gray-300">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out for any questions or feedback.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Information */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-2">
              <span className="text-black font-semibold">OUR LOCATION</span>
              <h2 className="text-3xl font-bold text-black">
                Visit or Contact Us
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-200">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Our Store</h3>
                  <p className="text-gray-600">
                    Kcart<br />
                    SH-144 Rai University<br />
                    Saroda, Ahmedabad - 382260<br />
                    Gujarat, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-200">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Contact Info</h3>
                  <p className="text-gray-600">
                    Tel: +91 8780092234<br />
                    Email: kirtan.2082006@gmail.com<br />
                    Support: support@kcart.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-200">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <span className="text-black font-semibold">CAREERS</span>
              <h3 className="text-xl font-semibold text-black mt-2 mb-4">
                Join Our Team
              </h3>
              <p className="text-gray-600 mb-4">
                We're always looking for talented individuals to join our growing team.
                Check out our current openings and become part of the Kcart family.
              </p>
              <button className="border-2 border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium">
                Explore Job Opportunities
              </button>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-6">Send Us a Message</h3>
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-black transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-black transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-black transition-all"
                    placeholder="+91 1234567890"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-black transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Career Inquiry">Career Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-black transition-all"
                    placeholder="How can we help you? Please provide as much detail as possible..."
                  ></textarea>
                </div>
                
                {/* Form Status */}
                <div className="text-sm text-gray-600">
                  <span className="text-red-500">*</span> Required fields
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
          <iframe
            src="https://www.google.com/maps?q=Rai+University,+SH-144,+Saroda,+Ahmedabad,+Gujarat+382260,+India&output=embed&t=k"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kcart Location - Rai University, SH-144, Saroda, Ahmedabad - 382260, Gujarat, India"
          ></iframe>
        </div>
      </div>

      <AppDownload />
    </div>
  );
};

export default Contact;