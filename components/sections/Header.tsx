import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../lib/utils';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import { ThemeToggle } from '../shared/ThemeToggle';

const sheetContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const sheetItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ease: 'easeOut' }
  },
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { href: '#shop', label: 'Shop', id: 'shop' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#sustainability', label: 'Sustainability', id: 'sustainability' },
    { href: '#reviews', label: 'Reviews', id: 'reviews' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const getLinkClass = (id: string) => cn(
    "transition-colors hover:text-aloe-green dark:hover:text-aqua-blue",
    activeSection === id ? 'text-aloe-green font-semibold dark:text-aqua-blue' : 'text-charcoal-gray dark:text-sand-beige/80'
  );

  return (
    <header className={cn("sticky top-0 z-30 w-full transition-all duration-300", isScrolled ? 'bg-sand-beige/80 shadow-md backdrop-blur-lg dark:bg-charcoal-gray/80' : 'bg-transparent')}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#hero" className="flex items-center text-aloe-green transition-colors hover:text-aloe-green/80 dark:text-aqua-blue dark:hover:text-aqua-blue/80" aria-label="Aquabloom homepage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-8 w-8 mr-2" fill="currentColor">
              <path d="M50,98 C20,70 15,40 50,2 C85,40 80,70 50,98 Z M50,45 C45,55 45,65 50,75 C55,65 55,55 50,45 Z" />
            </svg>
            <span className="text-3xl font-serif font-medium">Aquabloom</span>
          </a>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                className={getLinkClass(link.id)}
                aria-label={`Scroll to ${link.label} section`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <a href="#shop" className="hidden lg:inline-flex" aria-label="Scroll to Shop section">
              <Button variant="default">Shop Now</Button>
            </a>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <motion.div 
          className="flex flex-col h-full"
          variants={sheetContainerVariants}
          initial="hidden"
          animate="visible"
        >
            <div className="flex items-center justify-between">
                <a href="#hero" className="flex items-center text-aloe-green transition-colors hover:text-aloe-green/80 dark:text-aqua-blue" aria-label="Aquabloom homepage" onClick={() => setIsMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-7 w-7 mr-2" fill="currentColor">
                    <path d="M50,98 C20,70 15,40 50,2 C85,40 80,70 50,98 Z M50,45 C45,55 45,65 50,75 C55,65 55,55 50,45 Z" />
                  </svg>
                  <span className="text-2xl font-serif font-medium">Aquabloom</span>
                </a>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <nav className="mt-12 flex flex-col space-y-6">
                {navLinks.map(link => (
                    <motion.a 
                      key={link.label} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)} 
                      className={cn("text-xl", getLinkClass(link.id))}
                      variants={sheetItemVariants}
                      aria-label={`Scroll to ${link.label} section`}
                    >
                      {link.label}
                    </motion.a>
                ))}
            </nav>
            <motion.a 
              href="#shop" 
              className="mt-auto w-full"
              variants={sheetItemVariants}
              aria-label="Scroll to Shop section"
            >
              <Button variant="default" className="w-full" onClick={() => setIsMenuOpen(false)}>Shop Now</Button>
            </motion.a>
        </motion.div>
      </Sheet>
    </header>
  );
};