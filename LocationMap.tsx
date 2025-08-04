
'use client';

export default function LocationMap() {
  return (
    <div id="location-map" className="py-12 md:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
              Our Locations
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Visit us at any of our premium locations across major financial centers. Each office is designed to provide a sophisticated environment for your wealth management consultations.
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-4 md:p-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-amber-400 rounded-full flex-shrink-0">
                <i className="ri-map-pin-line text-black text-xs md:text-sm" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Find Us on the Map</h3>
            </div>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.4!2d-74.0124!3d40.7061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDigJIzNDInMjIuMCJOIDc0wpAwMCc1MS40Ilc%21!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full md:h-96"
              />
            </div>
          </div>
        </div>

        {/* Contact Statistics */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { number: '2,500+', label: 'Clients Served', icon: 'ri-user-line' },
            { number: '< 2hrs', label: 'Response Time', icon: 'ri-time-line' },
            { number: '99.8%', label: 'Satisfaction Rate', icon: 'ri-star-line' },
            { number: '24/7', label: 'Emergency Support', icon: 'ri-customer-service-line' }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className={`${stat.icon} text-black text-lg md:text-2xl`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1 md:mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
