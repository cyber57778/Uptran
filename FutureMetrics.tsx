
'use client';

import { useState, useRef, useEffect } from 'react';

const metrics = [
  {
    value: '99.97%',
    label: 'Prediction Accuracy',
    description: 'AI-powered market forecasting precision',
    icon: 'ri-line-chart-line',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'from-amber-900/20 to-yellow-900/20'
  },
  {
    value: '0.001ms',
    label: 'Response Time',
    description: 'Quantum processing speed advantage',
    icon: 'ri-flashlight-line',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-900/20 to-orange-900/20'
  },
  {
    value: '∞',
    label: 'Scenario Analysis',
    description: 'Parallel universe calculations',
    icon: 'ri-infinity-line',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-900/20 to-amber-900/20'
  },
  {
    value: '100%',
    label: 'Security Level',
    description: 'Quantum-encrypted protection',
    icon: 'ri-shield-keyhole-line',
    color: 'from-amber-600 to-yellow-600',
    bgColor: 'from-amber-900/20 to-yellow-900/20'
  },
  {
    value: '24/7/365',
    label: 'Monitoring',
    description: 'Continuous market surveillance',
    icon: 'ri-eye-line',
    color: 'from-yellow-600 to-amber-600',
    bgColor: 'from-yellow-900/20 to-amber-900/20'
  },
  {
    value: '1000x',
    label: 'Processing Power',
    description: 'Enhanced computational capacity',
    icon: 'ri-cpu-line',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-900/20 to-orange-900/20'
  }
];

const globalMetrics = [
  { label: 'Active AI Models', value: 47, unit: 'Models', growth: '+23%' },
  { label: 'Data Points Processed', value: 892, unit: 'Billion/day', growth: '+156%' },
  { label: 'Quantum Calculations', value: 15.7, unit: 'Trillion/sec', growth: '+340%' },
  { label: 'Global Coverage', value: 195, unit: 'Countries', growth: '100%' }
];

export default function FutureMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
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
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="py-12 md:py-24 bg-gradient-to-b from-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 w-72 md:w-96 h-72 md:h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-60 md:w-80 h-60 md:h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center bg-amber-400 rounded-full">
              <i className="ri-bar-chart-line text-black text-sm" />
            </div>
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">System Performance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
              Performance Metrics
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Real-time system performance indicators and capabilities showcasing the power of next-generation financial technology.
          </p>
        </div>

        {/* Metrics Background Image */}
        <div className="mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-4 md:p-8 overflow-hidden">
            <div
              className="h-32 md:h-48 rounded-lg relative"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20financial%20dashboard%20with%20real-time%20data%20visualization%2C%20advanced%20analytics%20interface%20with%20glowing%20charts%20and%20metrics%2C%20holographic%20displays%20showing%20market%20data%20and%20performance%20indicators%2C%20high-tech%20trading%20floor%20with%20golden%20amber%20neon%20lighting&width=1200&height=300&seq=metrics-bg&orientation=landscape')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">System Performance</h3>
                  <p className="text-gray-300 text-sm">Live metrics and analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              onClick={() => setActiveMetric(index)}
              className={`group relative p-6 md:p-8 rounded-2xl border cursor-pointer transition-all duration-500 ${
                activeMetric === index
                  ? `bg-gradient-to-br ${metric.bgColor} border-amber-400/20 scale-105`
                  : 'bg-gray-800/40 border-gray-700/30 hover:border-amber-400/20'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center ${
                activeMetric === index ? 'animate-pulse' : ''
              }`}>
                <i className={`${metric.icon} text-xl md:text-2xl text-white`} />
              </div>

              {/* Value */}
              <div className="mb-3 md:mb-4">
                <div className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">{metric.label}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{metric.description}</p>

              {/* Active Indicator */}
              {activeMetric === index && (
                <div className="absolute top-3 md:top-4 right-3 md:right-4 w-2 h-2 md:w-3 md:h-3 bg-amber-400 rounded-full animate-ping" />
              )}

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Global Performance Dashboard */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6 md:p-12">
          <div className="flex items-center space-x-3 mb-6 md:mb-8">
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-amber-400 rounded-full flex-shrink-0">
              <i className="ri-dashboard-line text-black text-xs md:text-sm" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Global System Status</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {globalMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 md:mb-4">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {metric.value}
                    <span className="text-sm md:text-lg text-gray-400 ml-1">{metric.unit}</span>
                  </div>
                  <div className="text-xs md:text-sm font-medium text-gray-300">{metric.label}</div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-2 md:mb-3">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, (metric.value / (metric.label.includes('Countries') ? 195 : 1000)) * 100)}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  />
                </div>

                <div className="text-amber-400 text-xs md:text-sm font-bold">{metric.growth}</div>
              </div>
            ))}
          </div>

          {/* System Status */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div className="flex items-center justify-center space-x-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-amber-400 font-medium text-sm md:text-base">All Systems Operational</span>
              </div>

              <div className="flex items-center justify-center space-x-3 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-yellow-400 font-medium text-sm md:text-base">Quantum Core Active</span>
              </div>

              <div className="flex items-center justify-center space-x-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-orange-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-orange-400 font-medium text-sm md:text-base">AI Learning Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-base sm:text-lg tracking-wider hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">EXPLORE MORE</span>
              </button>

              <button
                onClick={() => {
                  const contactSection = document.querySelector('footer');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-6 sm:px-8 py-3 border border-amber-400 text-amber-400 font-bold text-base sm:text-lg tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">GET STARTED</span>
              </button>
            </div>

            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />

            <div className="text-xs text-gray-500 uppercase tracking-widest animate-bounce">
              Future is Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
