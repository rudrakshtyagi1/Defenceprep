import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface NavLink {
  label: string;
  to: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Papers', to: '/papers' },
  { label: 'NDA', to: '/nda' },
  { label: 'CDS', to: '/cds' },
  { label: 'Performance', to: '/performance' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'navbar-blur shadow-lg' : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white font-extrabold text-sm tracking-tight select-none"
                style={{
                  background: 'linear-gradient(135deg, var(--dp-accent) 0%, var(--dp-accent-2, #7c3aed) 100%)',
                  clipPath: 'polygon(12% 0%, 88% 0%, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0% 88%, 0% 12%)',
                }}
              >
                DP
              </div>
              <span className="text-dp-primary font-bold text-lg tracking-tight leading-none">
                Defence<span className="gradient-accent">Prep</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={[
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive(link.to)
                      ? 'text-dp-primary bg-dp-surface-2'
                      : 'text-dp-secondary hover:text-dp-primary hover:bg-dp-surface',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle – desktop */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-dp-secondary hover:text-dp-primary hover:bg-dp-surface transition-all duration-150"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* CTA */}
              <button
                onClick={() => navigate('/papers')}
                className="hidden md:flex btn-primary items-center gap-1.5 text-sm py-2 px-4"
              >
                Start Practicing
                <ChevronRight size={15} />
              </button>

              {/* Theme Toggle – mobile */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex md:hidden w-9 h-9 items-center justify-center rounded-lg text-dp-secondary hover:text-dp-primary hover:bg-dp-surface transition-all duration-150"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="flex md:hidden w-9 h-9 items-center justify-center rounded-lg text-dp-secondary hover:text-dp-primary hover:bg-dp-surface transition-all duration-150"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden md:hidden border-t border-dp navbar-blur"
            >
              <nav className="flex flex-col gap-1 px-4 py-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={[
                      'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                      isActive(link.to)
                        ? 'text-dp-primary bg-dp-surface-2 font-semibold'
                        : 'text-dp-secondary hover:text-dp-primary hover:bg-dp-surface',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 pb-1">
                  <button
                    onClick={() => { navigate('/papers'); setMobileOpen(false); }}
                    className="btn-primary w-full flex items-center justify-center gap-1.5 text-sm py-2.5"
                  >
                    Start Practicing
                    <ChevronRight size={15} />
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content isn't hidden under fixed navbar */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;
