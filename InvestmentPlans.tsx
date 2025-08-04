'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function InvestmentPlans() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Crypto Index Funds');

  const investmentPlans = {
    'Crypto Index Funds': [
      {
        name: "Bitcoin Dominance Index",
        description: "Track the performance of Bitcoin with professional management",
        minAmount: 1000,
        maxAmount: 50000,
        roi: 12.5,
        duration: 180,
        features: ["Bitcoin exposure", "Professional management", "Regular rebalancing"]
      },
      {
        name: "DeFi Innovation Fund",
        description: "Diversified exposure to decentralized finance protocols",
        minAmount: 2500,
        maxAmount: 100000,
        roi: 18.3,
        duration: 365,
        features: ["DeFi protocols", "Yield optimization", "Risk management"]
      },
      {
        name: "Altcoin Growth Index",
        description: "Carefully selected alternative cryptocurrencies with high potential",
        minAmount: 1500,
        maxAmount: 75000,
        roi: 15.8,
        duration: 270,
        features: ["Altcoin diversification", "Growth focus", "Active monitoring"]
      }
    ],
    'ETFs': [
      {
        name: "Tech Innovation ETF",
        description: "Exposure to cutting-edge technology companies and innovations",
        minAmount: 500,
        maxAmount: 25000,
        roi: 11.2,
        duration: 365,
        features: ["Technology focus", "Innovation leaders", "Global exposure"]
      },
      {
        name: "Sustainable Energy ETF",
        description: "Clean energy and sustainable technology investments",
        minAmount: 750,
        maxAmount: 40000,
        roi: 13.7,
        duration: 300,
        features: ["Clean energy", "ESG compliant", "Future growth"]
      },
      {
        name: "Emerging Markets ETF",
        description: "Diversified exposure to high-growth emerging market economies",
        minAmount: 1000,
        maxAmount: 60000,
        roi: 14.5,
        duration: 400,
        features: ["Emerging markets", "High growth potential", "Currency diversification"]
      }
    ]
  };

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

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=abstract%20financial%20charts%20and%20investment%20data%20visualization%20with%20golden%20geometric%20patterns%2C%20modern%20fintech%20background%20with%20cryptocurrency%20symbols%20and%20ETF%20trading%20graphs%2C%20sophisticated%20investment%20platform%20design%20with%20blue%20and%20gold%20accents&width=1920&height=1080&seq=investment-plans-bg&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="font-serif italic text-amber-400">Recommended</span>
            <span className="block font-sans text-white">Investment Plans</span>
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Professionally managed investment solutions tailored for modern portfolio diversification.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex space-x-2 bg-black/30 rounded-full p-2 backdrop-blur-sm border border-gray-700/50">
            {Object.keys(investmentPlans).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer text-sm sm:text-base ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Investment Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {investmentPlans[activeCategory].map((plan, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 hover:border-amber-400/50 rounded-2xl p-6 sm:p-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150 + 700}ms` }}
            >
              {/* Plan Header */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-amber-400/30 group-hover:to-yellow-600/30 transition-all duration-300">
                  <i className={`${
                    activeCategory === 'Crypto Index Funds' ? 'ri-bit-coin-line' : 'ri-line-chart-line'
                  } text-2xl text-amber-400`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-1">{plan.roi}%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Expected ROI</div>
                </div>
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-1">{plan.duration}d</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Duration</div>
                </div>
              </div>

              {/* Investment Range */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Investment Range</span>
                  <span className="text-white font-medium">
                    ${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-600 h-2 rounded-full w-1/3" />
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link href="/investment">
                <button className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 rounded-lg cursor-pointer !rounded-button group-hover:scale-[1.02]">
                  START INVESTING
                </button>
              </Link>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 sm:mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link href="/investment">
            <button className="px-8 sm:px-12 py-4 border border-amber-400 text-amber-400 font-bold text-lg hover:bg-amber-400 hover:text-black transition-all duration-500 rounded-lg cursor-pointer !rounded-button">
              VIEW ALL PLANS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}