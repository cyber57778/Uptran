'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-amber-400/20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                <i className="ri-treasure-map-line text-black text-lg" />
              </div>
              <span className="font-pacifico text-xl text-amber-400">logo</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Pioneering the future of wealth management through cutting-edge technology and personalized financial strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/future" className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">
                  Future
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center" />
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-400/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 logo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}