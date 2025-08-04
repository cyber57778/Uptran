
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

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
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20luxury%20business%20office%20meeting%20room%20with%20floor%20to%20ceiling%20windows%20overlooking%20city%20skyline%20at%20golden%20hour%2C%20professional%20corporate%20environment%20with%20sleek%20glass%20conference%20table%2C%20warm%20ambient%20lighting%20creating%20sophisticated%20atmosphere%2C%20architectural%20photography%20style%20with%20clean%20lines%20and%20premium%20materials%2C%20elegant%20interior%20design%20with%20neutral%20tones%20and%20metallic%20accents&width=1920&height=1080&seq=contact-hero-bg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Animated Background Effects */}
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

        {/* Communication Network Visualization */}
        <div 
          className="absolute top-1/3 right-1/4 w-40 h-40 md:w-80 md:h-80 opacity-20"
          style={{
            transform: `rotateZ(${scrollY * 0.1}deg)`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 md:w-4 md:h-4 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            
            {/* Connection Lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 w-16 md:w-32 h-px bg-gradient-to-r from-amber-400/50 to-transparent origin-left"
                style={{
                  transform: `translate(-2px, -0.5px) rotate(${angle}deg)`,
                }}
              />
            ))}
            
            {/* Connection Nodes */}
            {[0, 72, 144, 216, 288].map((angle) => (
              <div
                key={angle}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-amber-400/70 rounded-full animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(60px) md:translateX(120px)`,
                  animationDelay: `${angle * 0.01}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
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
            <span className="block font-serif italic">Connect</span>
            <span className="block font-sans">With</span>
            <span className="block font-serif italic text-amber-400">Excellence</span>
          </h1>
          
          <p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 font-light tracking-wide leading-relaxed px-4"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.001),
            }}
          >
            Ready to transform your financial future?<br />
            <span className="text-amber-400 font-serif italic">Let's Begin The Conversation.</span>
          </p>

          <div 
            className="flex flex-col items-center space-y-6"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full justify-center items-center">
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-base sm:text-lg tracking-wider hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">GET IN TOUCH</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('location-map')}
                className="group px-6 sm:px-8 py-3 border border-amber-400 text-amber-400 font-bold text-base sm:text-lg tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-500 rounded-none whitespace-nowrap cursor-pointer"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">FIND US</span>
              </button>
            </div>
            
            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
            
            <div className="text-xs text-gray-500 uppercase tracking-widest animate-bounce">
              Multiple Ways to Connect
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
