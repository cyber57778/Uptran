
'use client';

import { useState, useRef, useEffect } from 'react';

const visionSteps = [
  {
    year: '2025',
    title: 'Quantum Integration',
    description: 'Launch of quantum-powered portfolio optimization algorithms',
    achievement: 'First quantum financial models deployed',
    impact: '300% increase in prediction accuracy',
    icon: 'ri-cpu-line',
    color: 'amber'
  },
  {
    year: '2027',
    title: 'Neural Convergence',
    description: 'AI systems achieve human-level financial intuition',
    achievement: 'Autonomous wealth management protocols',
    impact: 'Zero-latency market response capability',
    icon: 'ri-brain-line',
    color: 'yellow'
  },
  {
    year: '2030',
    title: 'Holographic Revolution',
    description: 'Immersive 3D financial interfaces become standard',
    achievement: 'Gesture-controlled portfolio management',
    impact: 'Democratized complex financial tools',
    icon: 'ri-focus-3-line',
    color: 'orange'
  },
  {
    year: '2035',
    title: 'Consciousness Merge',
    description: 'Direct neural interface with financial systems',
    achievement: 'Thought-based transaction execution',
    impact: 'Instant wealth decision implementation',
    icon: 'ri-mind-map',
    color: 'amber'
  },
  {
    year: '2040',
    title: 'Reality Synthesis',
    description: 'Virtual and physical wealth ecosystems unite',
    achievement: 'Metaverse economic integration',
    impact: 'Infinite expansion possibilities',
    icon: 'ri-earth-line',
    color: 'yellow'
  }
];

export default function VisionTimeline() {
  const [activeStep, setActiveStep] = useState(0);
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
      setActiveStep((prev) => (prev + 1) % visionSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      amber: active ? 'from-amber-500 to-orange-500' : 'from-amber-800 to-orange-800',
      yellow: active ? 'from-yellow-500 to-amber-500' : 'from-yellow-800 to-amber-800',
      orange: active ? 'from-orange-500 to-amber-500' : 'from-orange-800 to-amber-800'
    };
    return colors[color as keyof typeof colors] || colors.amber;
  };

  return (
    <div id="vision-timeline" ref={containerRef} className="py-12 md:py-24 bg-gradient-to-b from-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-56 md:w-72 h-56 md:h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center bg-amber-400 rounded-full">
              <i className="ri-time-line text-black text-sm" />
            </div>
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Future Vision</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
              Vision Timeline
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            The roadmap to revolutionary wealth management evolution, charting our course through the next decades of financial innovation.
          </p>
        </div>

        {/* Timeline Image Background */}
        <div className="mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-4 md:p-8 overflow-hidden">
            <div 
              className="h-40 md:h-64 rounded-lg relative"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20digital%20timeline%20visualization%20with%20holographic%20elements%20and%20data%20streams%2C%20advanced%20technology%20interface%20with%20golden%20amber%20neon%20lights%2C%20sci-fi%20financial%20charts%20and%20graphs%20floating%20in%20digital%20space%2C%20quantum%20computing%20visual%20effects%20with%20geometric%20patterns&width=1200&height=400&seq=timeline-bg&orientation=landscape')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Future Roadmap</h3>
                  <p className="text-gray-300 text-sm md:text-base">Transforming wealth management through innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical Stack */}
        <div className="block lg:hidden space-y-6 md:space-y-8 mb-12">
          {visionSteps.map((step, index) => (
            <div
              key={step.year}
              className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 ${
                activeStep >= index
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-amber-400/20'
                  : 'bg-gray-800/40 border-gray-700/30'
              }`}
            >
              {/* Year Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                activeStep >= index
                  ? `bg-gradient-to-r ${getColorClasses(step.color, true)} text-white`
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {step.year}
              </div>

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${
                  getColorClasses(step.color, activeStep >= index)
                } rounded-full flex items-center justify-center flex-shrink-0 ${
                  activeStep === index ? 'animate-pulse' : ''
                }`}>
                  <i className={`${step.icon} text-lg md:text-xl text-white`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">{step.description}</p>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-trophy-line text-amber-400 text-xs md:text-sm" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Achievement: </span>
                        <span className="text-xs md:text-sm text-white">{step.achievement}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-rocket-line text-amber-400 text-xs md:text-sm" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Impact: </span>
                        <span className="text-xs md:text-sm text-white">{step.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Indicator */}
              {activeStep === index && (
                <div className="absolute top-4 right-4 w-2 h-2 md:w-3 md:h-3 bg-amber-400 rounded-full animate-ping" />
              )}
            </div>
          ))}
        </div>

        {/* Desktop Timeline - Original Layout */}
        <div className="hidden lg:block relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-yellow-500 to-orange-500 transform -translate-x-0.5" />

          {/* Timeline Steps */}
          <div className="space-y-32">
            {visionSteps.map((step, index) => (
              <div
                key={step.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } transition-all duration-1000 ${
                  activeStep >= index ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-8'
                }`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                  <div className={`p-8 rounded-2xl border transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-amber-400/20 scale-105'
                      : 'bg-gray-800/40 border-gray-700/30'
                  }`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${
                        getColorClasses(step.color, activeStep === index)
                      } rounded-full flex items-center justify-center mr-4 ${
                        activeStep === index ? 'animate-pulse' : ''
                      }`}>
                        <i className={`${step.icon} text-xl text-white`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-gray-400 text-sm">Target: {step.year}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-5 h-5 flex items-center justify-center mr-2">
                          <i className="ri-trophy-line text-amber-400" />
                        </div>
                        <span className="text-sm text-gray-400">Achievement:</span>
                        <span className="text-sm text-white ml-2">{step.achievement}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 flex items-center justify-center mr-2">
                          <i className="ri-rocket-line text-amber-400" />
                        </div>
                        <span className="text-sm text-gray-400">Impact:</span>
                        <span className="text-sm text-white ml-2">{step.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 rounded-full border-4 transition-all duration-500 ${
                    activeStep >= index
                      ? `bg-gradient-to-br ${getColorClasses(step.color, true)} border-white`
                      : 'bg-gray-700 border-gray-600'
                  } ${activeStep === index ? 'animate-pulse scale-125' : ''}`}>
                    {activeStep >= index && (
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                    )}
                  </div>

                  {/* Year Label */}
                  <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    activeStep >= index
                      ? `bg-gradient-to-r ${getColorClasses(step.color, true)} text-white`
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {step.year}
                  </div>
                </div>

                {/* Progress Indicator */}
                {activeStep === index && (
                  <div className={`absolute ${
                    index % 2 === 0 ? 'right-6' : 'left-6'
                  } top-1/2 transform -translate-y-1/2`}>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 md:mt-16 bg-gray-800/40 rounded-full p-2">
          <div className="flex justify-between">
            {visionSteps.map((step, index) => (
              <button
                key={step.year}
                onClick={() => setActiveStep(index)}
                className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeStep >= index
                    ? `bg-gradient-to-r ${getColorClasses(step.color, true)} text-white`
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {step.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
