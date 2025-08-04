'use client';

import { useEffect, useRef, useState } from 'react';

export default function TopInvestors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const investors = [
    {
      name: "Warren Buffett",
      company: "Berkshire Hathaway",
      strategy: "Value Investing Master",
      returns: "20.1%",
      years: "57 years",
      quote: "Time in the market beats timing the market",
      image: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20elderly%20successful%20investor%20Warren%20Buffett%20style%20businessman%20in%20suit%2C%20confident%20expression%2C%20business%20headshot%20with%20clean%20white%20background%2C%20realistic%20photography%20style&width=400&height=400&seq=warren-buffett-portrait&orientation=squarish"
    },
    {
      name: "Peter Lynch",
      company: "Fidelity Magellan Fund",
      strategy: "Growth at Reasonable Price",
      returns: "29.2%",
      years: "13 years",
      quote: "Invest in what you know and understand",
      image: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20middle-aged%20successful%20fund%20manager%20Peter%20Lynch%20style%20businessman%20in%20suit%2C%20intelligent%20expression%2C%20business%20headshot%20with%20clean%20white%20background%2C%20realistic%20photography%20style&width=400&height=400&seq=peter-lynch-portrait&orientation=squarish"
    },
    {
      name: "Benjamin Graham",
      company: "Graham-Newman Corp",
      strategy: "Father of Value Investing",
      returns: "17.4%",
      years: "40+ years",
      quote: "Price is what you pay, value is what you get",
      image: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20distinguished%20elderly%20businessman%20Benjamin%20Graham%20style%20investor%20in%20classic%20suit%2C%20wise%20expression%2C%20vintage%20business%20headshot%20with%20clean%20white%20background%2C%20realistic%20photography%20style&width=400&height=400&seq=benjamin-graham-portrait&orientation=squarish"
    },
    {
      name: "John Templeton",
      company: "Templeton Growth Fund",
      strategy: "Global Value Investing",
      returns: "15.8%",
      years: "38 years",
      quote: "Buy when others are despondently selling",
      image: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20sophisticated%20elderly%20global%20investor%20John%20Templeton%20style%20businessman%20in%20suit%2C%20thoughtful%20expression%2C%20business%20headshot%20with%20clean%20white%20background%2C%20realistic%20photography%20style&width=400&height=400&seq=john-templeton-portrait&orientation=squarish"
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
    <div ref={sectionRef} className="relative py-16 sm:py-24 bg-gradient-to-b from-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(218,165,32,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(218,165,32,0.1) 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="font-serif italic text-amber-400">Learn from the</span>
            <span className="block font-sans text-white">Greatest Investors</span>
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Study the strategies and wisdom of history's most successful investors who built generational wealth.
          </p>
        </div>

        {/* Investors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {investors.map((investor, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 hover:border-amber-400/50 rounded-2xl p-6 sm:p-8 transition-all duration-700 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150 + 500}ms` }}
            >
              {/* Investor Header */}
              <div className="flex items-center space-x-4 sm:space-x-6 mb-6">
                <div className="relative">
                  <img
                    src={investor.image}
                    alt={investor.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-400/30 group-hover:border-amber-400/70 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{investor.name}</h3>
                  <p className="text-amber-400 text-sm sm:text-base font-medium mb-1">{investor.company}</p>
                  <p className="text-gray-400 text-sm">{investor.strategy}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-black/30 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">{investor.returns}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Annual Returns</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1">{investor.years}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Experience</div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <div className="absolute top-0 left-0 text-4xl text-amber-400/20 font-serif">"</div>
                <p className="text-gray-300 text-sm sm:text-base italic pl-8 pr-4 leading-relaxed">
                  {investor.quote}
                </p>
                <div className="absolute bottom-0 right-0 text-4xl text-amber-400/20 font-serif transform rotate-180">"</div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}