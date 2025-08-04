
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Services() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services = [
    {
      title: "Portfolio Strategy",
      description: "Precision-engineered investment frameworks that adapt to market evolution",
      icon: "ri-pie-chart-line",
      gradient: "from-amber-400 to-yellow-600"
    },
    {
      title: "Generational Wealth",
      description: "Legacy architecture designed to transcend time and market cycles",
      icon: "ri-building-line",
      gradient: "from-yellow-400 to-amber-500"
    },
    {
      title: "AI-Driven Insights",
      description: "Machine intelligence meets human intuition for unparalleled market clarity",
      icon: "ri-brain-line",
      gradient: "from-amber-500 to-orange-400"
    },
    {
      title: "Risk Calibration",
      description: "Mathematically precise risk modeling with real-world market dynamics",
      icon: "ri-shield-line",
      gradient: "from-yellow-500 to-amber-400"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="services" ref={servicesRef} className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className={`text-6xl font-bold mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="font-serif italic text-amber-400">Engineered</span>
            <span className="block font-sans text-white">Excellence</span>
          </h2>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Every strategy, crafted with precision. Every decision, powered by intelligence！
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden transition-all duration-700 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Background */}
              <div className="relative p-12 h-80 bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 hover:border-amber-400/50 transition-all duration-500">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-8 relative">
                  <i className={`${service.icon} text-4xl text-amber-400 group-hover:text-white transition-colors duration-300`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-amber-100 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Expand Indicator */}
                <div className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center">
                  <i className="ri-arrow-right-up-line text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                {/* Ripple Effect */}
                {activeCard === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-amber-400/20 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{
                      animation: 'ripple 0.6s ease-out'
                    }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
