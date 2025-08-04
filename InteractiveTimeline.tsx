
'use client';

import { useState, useRef, useEffect } from 'react';

const scenarios = {
  2024: {
    wealth: 1000000,
    portfolio: "Conservative Growth",
    markets: "Stable Recovery",
    legacy: "Foundation Building"
  },
  2030: {
    wealth: 2500000,
    portfolio: "Balanced Expansion", 
    markets: "Tech Innovation Surge",
    legacy: "Multi-Asset Diversification"
  },
  2040: {
    wealth: 8500000,
    portfolio: "Global Dominance",
    markets: "Quantum Computing Era",
    legacy: "Generational Transfer"
  },
  2050: {
    wealth: 25000000,
    portfolio: "Legacy Empire",
    markets: "Post-Scarcity Economy",
    legacy: "Eternal Wealth Dynasty"
  }
};

export default function InteractiveTimeline() {
  const [timelineValue, setTimelineValue] = useState(2024);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScenario = scenarios[timelineValue as keyof typeof scenarios] || scenarios[2024];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatWealth = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-6xl font-bold mb-8 transition-all duration-1000 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="font-serif italic text-amber-400">Visualize</span>
            <span className="block font-sans text-white">Your Future</span>
          </h2>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Drag through time. Watch your wealth evolve across decades.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-12 mb-16">
          {/* Timeline Slider */}
          <div className="mb-16">
            <div className="relative">
              <input
                type="range"
                min="2024"
                max="2050"
                step="6"
                value={timelineValue}
                onChange={(e) => setTimelineValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer timeline-slider"
              />
              
              {/* Timeline Labels */}
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span className={timelineValue === 2024 ? 'text-amber-400 font-bold' : ''}>2024</span>
                <span className={timelineValue === 2030 ? 'text-amber-400 font-bold' : ''}>2030</span>
                <span className={timelineValue === 2040 ? 'text-amber-400 font-bold' : ''}>2040</span>
                <span className={timelineValue === 2050 ? 'text-amber-400 font-bold' : ''}>2050</span>
              </div>
            </div>
          </div>

          {/* Scenario Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Wealth Growth */}
            <div className="text-center group">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full">
                <i className="ri-coins-line text-3xl text-black" />
              </div>
              <h3 className="text-lg font-bold text-gray-400 mb-2 uppercase tracking-wider">Total Wealth</h3>
              <p className="text-4xl font-bold text-white mb-2 font-mono transition-all duration-500">
                {formatWealth(currentScenario.wealth)}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-yellow-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentScenario.wealth / 25000000) * 100}%` }}
                />
              </div>
            </div>

            {/* Portfolio Strategy */}
            <div className="text-center group">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full">
                <i className="ri-pie-chart-line text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-400 mb-2 uppercase tracking-wider">Portfolio</h3>
              <p className="text-xl font-bold text-white transition-all duration-500">
                {currentScenario.portfolio}
              </p>
            </div>

            {/* Market Conditions */}
            <div className="text-center group">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full">
                <i className="ri-line-chart-line text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-400 mb-2 uppercase tracking-wider">Markets</h3>
              <p className="text-xl font-bold text-white transition-all duration-500">
                {currentScenario.markets}
              </p>
            </div>

            {/* Legacy Status */}
            <div className="text-center group">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full">
                <i className="ri-building-line text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-400 mb-2 uppercase tracking-wider">Legacy</h3>
              <p className="text-xl font-bold text-white transition-all duration-500">
                {currentScenario.legacy}
              </p>
            </div>
          </div>

          {/* Year Display */}
          <div className="text-center mt-16">
            <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text font-mono transition-all duration-500">
              {timelineValue}
            </div>
            <p className="text-gray-500 mt-4 text-lg">
              Your wealth journey through time
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #daa520, #ffd700);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(218, 165, 32, 0.4);
          transition: all 0.2s ease;
        }
        
        .timeline-slider::-webkit-slider-thumb:hover {
          width: 28px;
          height: 28px;
          box-shadow: 0 6px 20px rgba(218, 165, 32, 0.6);
        }
        
        .timeline-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #daa520, #ffd700);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(218, 165, 32, 0.4);
        }
      `}</style>
    </div>
  );
}
