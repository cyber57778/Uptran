'use client';

import { useEffect, useRef, useState } from 'react';

export default function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const particleData = Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
    setParticles(particleData);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
      suppressHydrationWarning={true}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=luxury%20financial%20services%20office%20with%20premium%20modern%20architecture%2C%20sophisticated%20wealth%20management%20consulting%20room%20with%20marble%20surfaces%20and%20gold%20accents%2C%20executive%20boardroom%20with%20floor-to-ceiling%20windows%20overlooking%20city%20skyline%2C%20high-end%20business%20environment%20with%20elegant%20lighting%20and%20professional%20atmosphere&width=1920&height=1080&seq=services-hero-bg&orientation=landscape')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-full h-full opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(218, 165, 32, 0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Particle Network */}
        <div className="absolute inset-0 opacity-30">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-1/4 left-1/4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border border-amber-400/40 rotate-45"
            style={{
              transform: `rotate(${45 + scrollY * 0.3}deg)`,
            }}
          />
          <div 
            className="absolute top-3/4 right-1/4 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 border border-amber-400/30 rounded-full"
            style={{
              transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.2})`,
            }}
          />
          <div 
            className="absolute top-1/2 right-1/3 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-amber-400/10 blur-xl"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.005) * 20}px)`,
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-6xl">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #daa520 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: `translateY(${scrollY * -0.3}px)`,
            }}
          >
            <span className="block font-serif italic">Precision</span>
            <span className="block font-sans">Crafted</span>
            <span className="block font-serif italic text-amber-400">Services</span>
          </h1>
          
          <p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 font-light tracking-wide leading-relaxed px-4"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.001),
            }}
          >
            Every strategy engineered with mathematical precision.<br className="hidden sm:block" />
            <span className="text-amber-400 font-serif italic">Intelligence meets intuition.</span>
          </p>

          <div 
            className="flex flex-col items-center space-y-6"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4 sm:px-0">
              <button 
                onClick={() => scrollToSection('service-details')}
                className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-sm sm:text-base lg:text-lg tracking-wider hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">VIEW SERVICES</span>
              </button>
              <button 
                onClick={() => scrollToSection('process-timeline')}
                className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 border border-amber-400 text-amber-400 font-bold text-sm sm:text-base lg:text-lg tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">OUR PROCESS</span>
              </button>
            </div>
            
            <div className="w-px h-8 sm:h-16 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
            
            <div className="text-xs text-gray-500 uppercase tracking-widest animate-bounce">
              Discover Our Expertise
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(218, 165, 32, 0.1) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
