import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MonitorPlay, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Movies', path: '/movies' },
    { name: 'Casting', path: '/casting' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Donate', path: '/donate' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-brand-bg/90 backdrop-blur-xl border-brand-border py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group mr-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300">
                <MonitorPlay size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white hidden sm:block">
                AI IMPACT <span className="text-brand-primary drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">MEDIA</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
             {/* Dedicated Home Icon Button */}
             <Link 
                to="/"
                className={`p-2 rounded-lg transition-all duration-200 hover:bg-white/10 mr-2 ${location.pathname === '/' ? 'text-brand-primary' : 'text-gray-400 hover:text-white'}`}
                title="Home"
             >
                <Home size={20} />
             </Link>

            <div className="flex items-baseline space-x-1 lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-brand-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/login"
                className="text-brand-muted hover:text-white text-xs uppercase tracking-widest ml-4 px-3 py-2 border border-transparent hover:border-brand-border rounded-lg transition-all"
              >
                Admin
              </Link>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden items-center gap-4">
             <Link to="/" className="text-gray-400 hover:text-white">
                <Home size={24} />
             </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-muted hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full bg-brand-bg/95 backdrop-blur-xl border-b border-brand-border transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
              to="/"
              className={`block px-3 py-4 rounded-md text-base font-medium border-l-2 ${
                location.pathname === '/'
                  ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                  : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-4 rounded-md text-base font-medium border-l-2 ${
                location.pathname === link.path
                  ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                  : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/login"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-500 hover:text-white"
          >
            Admin Mainframe
          </Link>
        </div>
      </div>
    </nav>
  );
};