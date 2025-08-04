
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authManager } from '../lib/auth';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'ri-home-line', href: '/' },
    { id: 'services', label: 'Services', icon: 'ri-service-line', href: '/services' },
    { id: 'about', label: 'About', icon: 'ri-information-line', href: '/about' },
    { id: 'future', label: 'Future', icon: 'ri-rocket-line', href: '/future' },
    { id: 'contact', label: 'Contact', icon: 'ri-contacts-line', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkAuth = () => {
      setIsAuthenticated(authManager.isAuthenticated());
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();

    // Check auth status periodically
    const authInterval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(authInterval);
    };
  }, []);

  useEffect(() => {
    // Set active section based on current pathname
    if (pathname === '/services') {
      setActiveSection('services');
    } else if (pathname === '/about') {
      setActiveSection('about');
    } else if (pathname === '/future') {
      setActiveSection('future');
    } else if (pathname === '/contact') {
      setActiveSection('contact');
    } else if (pathname === '/') {
      setActiveSection('hero');
    }
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleScheduleClick = () => {
    setShowScheduleModal(true);
  };

  const handleLogout = () => {
    authManager.logout();
    setIsAuthenticated(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-4 left-4 right-4 md:top-8 md:left-1/2 md:transform md:-translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border border-amber-400/20' 
          : 'bg-transparent'
      } rounded-full px-4 md:px-8 py-3 md:py-4`}>
        <div className="flex items-center justify-between md:justify-center md:space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden">
              <img 
                src="https://static.readdy.ai/image/48680b57ec919fdd68cdaee7b19d451c/56b8022aa051ad768c6d50ae3c423fe5.png"
                alt="Uptran"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-pacifico text-lg md:text-xl text-amber-400">Uptran</span>
          </Link>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-amber-400 cursor-pointer"
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`} />
          </button>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => scrollToSection(item.id)}
                className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-amber-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-amber-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Active Indicator */}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />
                )}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 text-sm text-amber-400 hover:text-amber-300 transition-colors cursor-pointer whitespace-nowrap">
                    Dashboard
                  </Link>
                  <Link href="/investment" className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap">
                    Invest
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                    Login
                  </Link>
                  <Link href="/register" className="px-3 py-2 bg-gradient-to-r from-amber-400 to-yellow-600 text-black text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer whitespace-nowrap">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-md border border-amber-400/20 rounded-2xl p-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-amber-400/20 text-amber-400'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <i className={`${item.icon} text-lg`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-600/30 my-2" />
              
              {/* Mobile Auth Buttons */}
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-amber-400 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                    <i className="ri-dashboard-line text-lg" />
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/investment" className="flex items-center space-x-3 px-4 py-3 text-blue-400 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                    <i className="ri-line-chart-line text-lg" />
                    <span>Investment</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg cursor-pointer w-full text-left">
                    <i className="ri-logout-box-line text-lg" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                    <i className="ri-login-box-line text-lg" />
                    <span>Login</span>
                  </Link>
                  <Link href="/register" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-medium rounded-lg mt-4 cursor-pointer">
                    <i className="ri-user-add-line text-lg" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              
              {/* Mobile Schedule Button */}
              <button
                onClick={handleScheduleClick}
                className="flex items-center space-x-3 px-4 py-3 bg-gray-700/50 text-white font-medium rounded-lg mt-2 cursor-pointer"
              >
                <i className="ri-calendar-line text-lg" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Floating Action Buttons - Hidden on Mobile */}
      <div className="hidden md:flex fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex-col space-y-4">
        {[ 
          { icon: 'ri-phone-line', label: 'Call', action: () => window.open('tel:+15551234567') },
          { icon: 'ri-mail-line', label: 'Email', action: () => window.open('mailto:support@uptran.com') },
          { icon: 'ri-calendar-line', label: 'Schedule', action: handleScheduleClick }
        ].map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="group w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 cursor-pointer"
            title={action.label}
          >
            <i className={`${action.icon} text-black text-lg group-hover:scale-110 transition-transform duration-200`} />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {action.label}
            </div>
          </button>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-amber-400/20 p-6 md:p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-line text-black text-xl md:text-2xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Schedule Consultation</h2>
              <p className="text-gray-300 text-sm md:text-base">Book your personalized crypto investment consultation</p>
            </div>

            {/* Quick Schedule Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { type: 'Phone Call', duration: '30 minutes', icon: 'ri-phone-line' },
                { type: 'Video Meeting', duration: '45 minutes', icon: 'ri-video-line' },
                { type: 'In-Person', duration: '60 minutes', icon: 'ri-user-line' }
              ].map((option, index) => (
                <button
                  key={index}
                  className="p-3 md:p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600/30 hover:border-amber-400/50 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <i className={`${option.icon} text-amber-400 text-sm md:text-base`} />
                  </div>
                  <div className="text-white font-medium text-xs md:text-sm">{option.type}</div>
                  <div className="text-gray-400 text-xs">{option.duration}</div>
                </button>
              ))}
            </div>

            {/* Schedule Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                  <select className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm pr-8 appearance-none cursor-pointer">
                    <option value="">Select time</option>
                    <option value="9am">9:00 AM</option>
                    <option value="10am">10:00 AM</option>
                    <option value="11am">11:00 AM</option>
                    <option value="2pm">2:00 PM</option>
                    <option value="3pm">3:00 PM</option>
                    <option value="4pm">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Brief Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your crypto investment goals..."
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm resize-none"
                />
              </div>

              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 font-medium hover:bg-gray-700/50 transition-all duration-300 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  CONFIRM APPOINTMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
