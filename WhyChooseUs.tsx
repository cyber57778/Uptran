'use client';

import { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "ri-shield-check-line",
      title: "Professional Management",
      description: "Expert portfolio managers with decades of experience in crypto and traditional markets",
      stats: "15+ Years Experience",
      color: "from-amber-400 to-yellow-600"
    },
    {
      icon: "ri-line-chart-line",
      title: "Diversified Strategies",
      description: "Balanced exposure across crypto index funds and ETFs to minimize risk and maximize returns",
      stats: "50+ Assets Managed",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: "ri-lock-line",
      title: "Institutional Security",
      description: "Bank-level security protocols and insurance coverage for all client investments",
      stats: "99.9% Uptime",
      color: "from-amber-500 to-orange-400"
    },
    {
      icon: "ri-customer-service-2-line",
      title: "24/7 Support",
      description: "Dedicated investment advisors available around the clock for personalized guidance",
      stats: "<2min Response",
      color: "from-yellow-500 to-amber-400"
    },
    {
      icon: "ri-global-line",
      title: "Global Market Access",
      description: "Access to international markets and emerging opportunities across different time zones",
      stats: "25+ Countries",
      color: "from-amber-400 to-yellow-500"
    },
    {
      icon: "ri-pie-chart-2-line",
      title: "Transparent Reporting",
      description: "Real-time portfolio tracking and detailed performance analytics at your fingertips",
      stats: "Real-time Data",
      color: "from-yellow-600 to-amber-400"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Uptran%20UCi%20Investment%20logo%20design%20with%20sophisticated%20golden%20cryptocurrency%20and%20ETF%20symbols%2C%20modern%20fintech%20branding%20with%20professional%20geometric%20patterns%20and%20luxury%20investment%20platform%20aesthetics&width=800&height=400&seq=uci-investment-logo&orientation=landscape')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header with Logo */}
        <div className="text-center mb-12 sm:mb-20">
          {/* UCi Investment Logo */}
          <div className={`flex items-center justify-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/25">
                <img
                  src="https://static.readdy.ai/image/48680b57ec919fdd68cdaee7b19d451c/bc59fa09ca8c8ef718e4aaca9e0dce89.jfif"
                  alt="Uptran Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">UCi Investment</h1>
                <p className="text-amber-400 text-sm sm:text-base font-medium">Powered by Uptran</p>
              </div>
            </div>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="font-serif italic text-amber-400">Why Choose</span>
            <span className="block font-sans text-white">UCi Investment?</span>
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Experience the future of wealth management with our cutting-edge investment platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8 transition-all duration-700 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${
                activeFeature === index ? 'border-amber-400/50 shadow-lg shadow-amber-400/10' : 'hover:border-amber-400/30'
              }`}
              style={{ transitionDelay: `${index * 100 + 700}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
            >
              {/* Feature Icon */}
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-gradient-to-br ${feature.color}/20 group-hover:${feature.color}/30`}>
                  <i className={`${feature.icon} text-2xl text-amber-400 group-hover:text-white transition-colors duration-300`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className={`px-4 py-2 bg-gradient-to-r ${feature.color}/10 rounded-lg border border-amber-400/20`}>
                  <span className="text-amber-400 font-bold text-sm">{feature.stats}</span>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-arrow-right-line text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
              
              {/* Active Indicator */}
              {activeFeature === index && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">$2.5B+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Assets Under Management</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">50K+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Active Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">98.7%</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">15+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}