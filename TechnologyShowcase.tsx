
'use client';

import { useState, useRef, useEffect } from 'react';

const technologies = [
  {
    id: 'quantum',
    title: 'Quantum Computing',
    subtitle: 'Portfolio Optimization',
    description: 'Harness quantum algorithms to analyze infinite market scenarios simultaneously, optimizing portfolio allocation across parallel universes of possibility.',
    metrics: ['99.7% Accuracy', '0.001ms Processing', 'Infinite Scenarios'],
    icon: 'ri-cpu-line',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-900/20 to-orange-900/20'
  },
  {
    id: 'neural',
    title: 'Neural Networks',
    subtitle: 'Market Prediction',
    description: 'Advanced AI networks that learn from global economic patterns, predicting market movements with unprecedented precision and adaptability.',
    metrics: ['94% Success Rate', '24/7 Monitoring', 'Real-time Learning'],
    icon: 'ri-brain-line',
    gradient: 'from-yellow-500 to-amber-500',
    bgGradient: 'from-yellow-900/20 to-amber-900/20'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Security',
    subtitle: 'Asset Protection',
    description: 'Immutable ledger technology ensuring your wealth remains secure across generations, with quantum-encrypted smart contracts.',
    metrics: ['100% Secure', 'Zero Downtime', 'Quantum Encrypted'],
    icon: 'ri-shield-keyhole-line',
    gradient: 'from-amber-600 to-yellow-600',
    bgGradient: 'from-amber-900/20 to-yellow-900/20'
  },
  {
    id: 'holographic',
    title: 'Holographic Interface',
    subtitle: 'Immersive Analytics',
    description: 'Visualize your wealth in three-dimensional space, manipulating complex financial data through gesture-based holographic displays.',
    metrics: ['360° Visualization', 'Gesture Control', '4K Resolution'],
    icon: 'ri-focus-3-line',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-900/20 to-amber-900/20'
  }
];

export default function TechnologyShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % technologies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div id="technology-showcase" ref={containerRef} className="py-12 md:py-24 bg-gradient-to-b from-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-60 md:w-80 h-60 md:h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center bg-amber-400 rounded-full">
              <i className="ri-cpu-line text-black text-sm" />
            </div>
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Advanced Technology</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Next-generation financial technologies reshaping wealth management through revolutionary innovation and precision.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {technologies.map((tech, index) => (
            <div
              key={tech.id}
              onClick={() => setActiveIndex(index)}
              className={`group relative p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeIndex === index
                  ? `bg-gradient-to-br ${tech.bgGradient} border-amber-400/20 scale-105`
                  : 'bg-gray-800/40 border-gray-700/30 hover:border-amber-400/20'
              }`}
            >
              {/* Tech Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-gradient-to-br ${tech.gradient} rounded-full flex items-center justify-center ${
                activeIndex === index ? 'animate-pulse' : ''
              }`}>
                <i className={`${tech.icon} text-xl md:text-2xl text-white`} />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{tech.title}</h3>
              <p className={`text-base md:text-lg font-medium mb-3 md:mb-4 bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent`}>
                {tech.subtitle}
              </p>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">{tech.description}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {tech.metrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className={`px-2 md:px-3 py-1 text-xs font-bold rounded-full ${
                      activeIndex === index
                        ? `bg-gradient-to-r ${tech.gradient} text-white`
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {metric}
                  </span>
                ))}
              </div>

              {/* Active Indicator */}
              {activeIndex === index && (
                <div className="absolute top-4 right-4 w-2 h-2 md:w-3 md:h-3 bg-amber-400 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Detailed View */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Details */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gradient-to-br ${technologies[activeIndex].gradient} rounded-full flex-shrink-0`}>
                  <i className={`${technologies[activeIndex].icon} text-white text-sm md:text-base`} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-amber-400">Featured Technology</h3>
              </div>
              
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                {technologies[activeIndex].title}
              </h4>
              <p className={`text-lg md:text-xl lg:text-2xl font-medium mb-4 md:mb-6 bg-gradient-to-r ${technologies[activeIndex].gradient} bg-clip-text text-transparent`}>
                {technologies[activeIndex].subtitle}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
                {technologies[activeIndex].description}
              </p>

              <button className={`px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r ${technologies[activeIndex].gradient} text-black font-bold text-sm md:text-base tracking-wider hover:shadow-lg transition-all duration-300 rounded-none whitespace-nowrap cursor-pointer`}>
                LEARN MORE
              </button>
            </div>

            {/* Right: Visualization */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-amber-400/20 flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${technologies[activeIndex].bgGradient} opacity-30`} />
                
                {/* Central Element */}
                <div className={`relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${technologies[activeIndex].gradient} rounded-full flex items-center justify-center animate-pulse`}>
                  <i className={`${technologies[activeIndex].icon} text-3xl md:text-5xl text-white`} />
                </div>

                {/* Orbiting Elements */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 md:w-4 md:h-4 bg-amber-400/30 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-80px)`,
                      animation: `orbit 8s linear infinite`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateY(-80px); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateY(-80px); }
        }
        
        @media (min-width: 768px) {
          @keyframes orbit {
            from { transform: translate(-50%, -50%) rotate(0deg) translateY(-120px); }
            to { transform: translate(-50%, -50%) rotate(360deg) translateY(-120px); }
          }
        }
      `}</style>
    </div>
  );
}
