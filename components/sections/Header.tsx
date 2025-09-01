import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#shop', label: 'Shop' },
    { href: '#about', label: 'About' },
    { href: '#sustainability', label: 'Sustainability' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={cn("sticky top-0 z-30 w-full transition-all duration-300", isScrolled ? 'bg-sand-beige/80 shadow-md backdrop-blur-lg' : 'bg-transparent')}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="text-3xl font-serif font-medium text-aloe-green">Aquabloom</a>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-charcoal-gray transition-colors hover:text-aloe-green">{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="default" className="hidden lg:inline-flex">Shop Now</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
                <a href="#" className="text-2xl font-serif font-medium text-aloe-green">Aquabloom</a>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <nav className="mt-12 flex flex-col space-y-6">
                {navLinks.map(link => (
                    <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-xl text-charcoal-gray transition-colors hover:text-aloe-green">{link.label}</a>
                ))}
            </nav>
            <Button variant="default" className="mt-auto w-full">Shop Now</Button>
        </div>
      </Sheet>
    </header>
  );
};
