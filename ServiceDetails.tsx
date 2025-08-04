
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ServiceDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      title: "Crypto Index Fund Management",
      subtitle: "Diversified Digital Asset Exposure",
      description: "Professional management of cryptocurrency index funds with strategic exposure to Bitcoin, Ethereum, and emerging altcoins. Our quantitative approach ensures optimal diversification while capturing the growth potential of the digital asset ecosystem.",
      features: [
        "Bitcoin & Ethereum allocation strategies",
        "Altcoin diversification protocols",
        "Real-time rebalancing algorithms",
        "Risk-adjusted performance optimization"
      ],
      icon: "ri-bit-coin-line",
      gradient: "from-amber-400 to-yellow-600",
      metrics: { performance: "18.5%", diversification: "25+", accuracy: "94%" }
    },
    {
      title: "ETF Portfolio Construction",
      subtitle: "Traditional Market Excellence",
      description: "Expertly curated Exchange Traded Fund portfolios spanning technology, healthcare, emerging markets, and sustainable energy sectors. We leverage institutional-grade research and market intelligence to construct resilient investment strategies.",
      features: [
        "Sector-specific ETF selection",
        "Global market exposure",
        "ESG-compliant options",
        "Low-cost diversification"
      ],
      icon: "ri-line-chart-line",
      gradient: "from-yellow-400 to-amber-500",
      metrics: { returns: "12.8%", coverage: "15+", efficiency: "96%" }
    },
    {
      title: "Risk Management & Analytics",
      subtitle: "Precision Risk Engineering",
      description: "Advanced risk management systems incorporating Monte Carlo simulations, stress testing, and behavioral finance principles. Our proprietary algorithms continuously monitor and adjust portfolio risk exposure across all asset classes.",
      features: [
        "Monte Carlo simulations",
        "Volatility forecasting models",
        "Correlation analysis tools",
        "Dynamic hedging strategies"
      ],
      icon: "ri-shield-line",
      gradient: "from-amber-500 to-orange-400",
      metrics: { protection: "99.1%", precision: "87%", stability: "92%" }
    },
    {
      title: "Investment Advisory Services",
      subtitle: "Personalized Wealth Strategies",
      description: "Dedicated investment advisors provide personalized guidance based on your financial goals, risk tolerance, and investment timeline. Our advisory team combines decades of market experience with cutting-edge analytical tools.",
      features: [
        "Personal investment consultation",
        "Goal-based planning",
        "Tax optimization strategies",
        "Performance monitoring"
      ],
      icon: "ri-customer-service-2-line",
      gradient: "from-yellow-500 to-amber-400",
      metrics: { satisfaction: "98%", response: "2min", expertise: "15yr" }
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

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id="service-details" className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 sm:py-24 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(30deg, rgba(218,165,32,0.1) 12%, transparent 12.5%, transparent 87%, rgba(218,165,32,0.1) 87.5%, rgba(218,165,32,0.1)), linear-gradient(150deg, rgba(218,165,32,0.1) 12%, transparent 12.5%, transparent 87%, rgba(218,165,32,0.1) 87.5%, rgba(218,165,32,0.1))`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="font-serif italic text-amber-400">Investment</span>
            <span className="block font-sans text-white">Solutions</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto px-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Professional management of crypto index funds and ETFs designed to optimize your investment portfolio.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-8 sm:space-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              <div
                className="relative p-6 sm:p-8 md:p-12 bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 hover:border-amber-400/50 transition-all duration-500 cursor-pointer"
                onClick={() => setExpandedService(expandedService === index ? null : index)}
              >
                {/* Service Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 mb-6 lg:mb-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative mx-auto sm:mx-0">
                      <i className={`${service.icon} text-3xl sm:text-4xl md:text-5xl text-amber-400 group-hover:text-white transition-colors duration-300`} />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-amber-400 text-base sm:text-lg font-serif italic">{service.subtitle}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex justify-center lg:justify-end space-x-4 sm:space-x-6 md:space-x-8">
                    {Object.entries(service.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400">{value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-center sm:text-left">
                  {service.description}
                </p>

                {/* Expandable Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedService === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-700/50">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-4">Core Features</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-4">Implementation Process</h4>
                      <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <span>Portfolio assessment & goal setting</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <span>Asset allocation & strategy design</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <span>Implementation & continuous monitoring</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse Indicator */}
                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-8 h-8 flex items-center justify-center">
                  <i className={`ri-arrow-${expandedService === index ? 'up' : 'down'}-line text-amber-400 transition-transform duration-300`} />
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
