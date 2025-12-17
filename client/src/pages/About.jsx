import Title from "../components/Title";
import AppDownload from "../components/AppDownload";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black py-16 sm:py-20 lg:py-24 overflow-hidden min-h-[400px] flex items-center">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 heading-font">
            Our <span className="text-gray-300">Story</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Crafting exceptional experiences since day one
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Journey Section */}
        <div className="text-center mb-16">
          <span className="text-black font-semibold tracking-wider">OUR JOURNEY</span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-8 heading-font">
            Redefining E-Commerce Excellence
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">01</span>
                </div>
                <h3 className="text-xl font-bold text-black">The Beginning</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Kcart was born out of a passion for innovation and a desire to
                revolutionize the way people shop online. Our journey began with a
                simple idea: to provide a platform where customers can easily
                discover, explore, and purchase a wide range of products from the
                comfort of their homes.
              </p>
            </div>

            <div className="bg-black p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-lg">02</span>
                </div>
                <h3 className="text-xl font-bold">Our Growth</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Since our inception, we've worked tirelessly to curate a diverse
                selection of high-quality products that cater to every taste and
                preference. From fashion and beauty to electronics and home
                essentials, we offer an extensive collection sourced from trusted
                brands and suppliers.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">03</span>
                </div>
                <h3 className="text-xl font-bold text-black">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission at Kcart is to empower customers with choice,
                convenience, and confidence. We're dedicated to providing a seamless
                shopping experience that exceeds expectations, from browsing and
                ordering to delivery and beyond.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">04</span>
                </div>
                <h3 className="text-xl font-bold text-black">The Future</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Looking ahead, we're committed to continuous innovation and
                improvement. We're constantly exploring new technologies and
                partnerships to enhance our platform and deliver even greater
                value to our customers worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 text-white mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Excellence</h4>
              <p className="text-gray-300">We strive for perfection in every aspect of our service</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Innovation</h4>
              <p className="text-gray-300">Constantly pushing boundaries to improve user experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Trust</h4>
              <p className="text-gray-300">Building lasting relationships through transparency and reliability</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-20">
          <span className="text-black font-semibold tracking-wider">WHY CHOOSE US</span>
          <h2 className="text-4xl font-bold text-black mt-4 mb-8 heading-font">
            The Kcart Difference
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Assurance */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black transform hover:-translate-y-2">
              <div className="bg-black group-hover:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                We meticulously select and vet each product to ensure it meets our
                stringent quality standards, delivering excellence in every purchase.
              </p>
            </div>
            
            {/* Unmatched Convenience */}
            <div className="group bg-black p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-black hover:border-gray-800 transform hover:-translate-y-2">
              <div className="bg-white group-hover:bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-colors duration-300">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors">Unmatched Convenience</h3>
              <p className="text-gray-300 leading-relaxed">
                With our user-friendly interface and hassle-free ordering process,
                shopping has never been easier or more enjoyable.
              </p>
            </div>
            
            {/* Exceptional Support */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black transform hover:-translate-y-2">
              <div className="bg-black group-hover:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors">Exceptional Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team of dedicated professionals is here to assist you every step of the way,
                ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Impact in Numbers</h3>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <p className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">10K+</p>
                <p className="text-gray-300 font-medium">Happy Customers</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <p className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">500+</p>
                <p className="text-gray-300 font-medium">Premium Brands</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <p className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">24/7</p>
                <p className="text-gray-300 font-medium">Customer Support</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <p className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">99%</p>
                <p className="text-gray-300 font-medium">Positive Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppDownload />
    </div>
  );
};

export default About;