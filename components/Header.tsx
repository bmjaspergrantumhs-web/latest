
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Gallery', path: '/gallery' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-[#fcfbf7]/95 backdrop-blur-md shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BrandLogo className="h-14" />
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-emerald-900 border-b-2 border-emerald-900 pb-1' : 'text-stone-500 hover:text-emerald-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/booking" 
              className="bg-emerald-900 text-stone-50 px-8 py-3 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-emerald-950 transition-all shadow-md active:scale-95"
            >
              Book Service
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-emerald-900 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#fcfbf7] border-b border-stone-100 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-6 text-sm font-bold uppercase tracking-widest text-stone-700 hover:text-emerald-900 border-b border-stone-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="block w-full mt-6 bg-emerald-900 text-white px-6 py-5 rounded-sm text-sm font-bold uppercase tracking-widest"
            >
              Book our services
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
