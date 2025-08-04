'use client';

import { useEffect, useRef, useState } from 'react';

export default function FutureHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    // Generate particles on client side only to avoid hydration mismatch
    const particleData = Array.from({ length: 60 }).map(() => ({
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-black to-amber-900/20 overflow-hidden"
      suppressHydrationWarning={true}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20cityscape%20with%20advanced%20technology%20architecture%2C%20quantum%20computing%20visualization%20with%20holographic%20displays%20and%20floating%20data%20streams%2C%20cyberpunk%20financial%20district%20with%20neon%20lighting%20and%20sleek%20glass%20buildings%2C%20sci-fi%20urban%20environment%20with%20golden%20amber%20light%20effects%20and%20digital%20interfaces&width=1920&height=1080&seq=future-hero-bg&orientation=landscape')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-full h-full opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.4) 0%, transparent 50%)`,
          }}
        />
        
        {/* Particle Network */}
        <div className="absolute inset-0 opacity-40">
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

        {/* Quantum Wireframe Grid */}
        <div 
          className="absolute top-1/3 right-1/4 w-40 h-40 md:w-80 md:h-80 opacity-20"
          style={{
            transform: `rotateZ(${scrollY * 0.1}deg) rotateY(${scrollY * 0.2}deg)`,
          }}
        >
          {/* Main quantum sphere */}
          <div className="w-full h-full border border-amber-400/40 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-400/60 to-transparent transform -translate-x-0.5" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent transform -translate-y-0.5" />
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent transform -translate-y-0.5" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent transform -translate-y-0.5" />
          </div>
          
          {/* Inner quantum rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 border border-yellow-400/30 rounded-full animate-pulse">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border border-amber-300/40 rounded-full animate-spin-reverse" />
          </div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-4 md:left-20 w-3 h-3 md:w-4 md:h-4 border border-amber-400/50 rotate-45 animate-float" />
        <div className="absolute top-32 md:top-40 right-8 md:right-32 w-4 h-4 md:w-6 md:h-6 border border-yellow-400/40 animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-amber-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-40 md:bottom-48 right-6 md:right-20 w-4 h-4 md:w-5 md:h-5 border border-amber-300/50 rotate-12 animate-float" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8 pt-20 sm:pt-24 md:pt-16">
        <div className="text-center max-w-5xl">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #daa520 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: `translateY(${scrollY * -0.3}px)`,
            }}
          >
            <span className="block font-serif italic">The</span>
            <span className="block font-sans">FUTURE</span>
            <span className="block font-serif italic text-amber-400">of Wealth</span>
          </h1>
          
          <p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 font-light tracking-wide leading-relaxed px-4"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.001),
            }}
          >
            Step into tomorrow's financial landscape where quantum computing, 
            artificial intelligence, and revolutionary interfaces converge to<br />
            <span className="text-amber-400 font-serif italic">redefine wealth management forever.</span>
          </p>

          <div 
            className="flex flex-col items-center space-y-6"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
              <button 
                onClick={() => scrollToSection('technology-showcase')}
                className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-base sm:text-lg tracking-wider hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">EXPLORE FUTURE</span>
              </button>
            </div>

            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
            
            <div className="text-xs text-gray-500 uppercase tracking-widest animate-bounce">
              Tomorrow's Wealth Today
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.15) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
