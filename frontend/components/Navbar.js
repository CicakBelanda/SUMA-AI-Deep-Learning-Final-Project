'use client';

import { useState } from 'react';
// import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-6 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-4xl bg-white/40 border border-gray-500/30 backdrop-blur-sm">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="shrink-0">
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              SUMA
            </div>
            {/* Replace with your own logo */}
            {/* 
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            */}
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#tools"
              className="text-gray-700 hover:text-teal-400 uppercase decoration-1 font-thin opacity-100 hover:underline underline-offset-2 transition-all text-sm"
            >
              Tools
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-teal-400 uppercase decoration-1 font-thin opacity-100 hover:underline underline-offset-2 transition-all text-sm"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-teal-400 uppercase decoration-1 font-thin opacity-100 hover:underline underline-offset-2 transition-all text-sm"
            >
              Contact
            </a>
          </div>

          {/* Try Now Button - Right (Desktop) */}
          <div className="hidden md:flex">
            <button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-150 ease-in-out">
              Try Now
            </button>
          </div>

          {/* Hamburger Menu - Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              Try Now
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
            <a
              href="#tools"
              className="block py-2 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </a>
            <a
              href="#about"
              className="block py-2 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block py-2 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
