
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';

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
    "transition-colors hover:text-aloe-green",
    activeSection === id ? 'text-aloe-green font-semibold' : 'text-charcoal-gray'
  );

  return (
    <header className={cn("sticky top-0 z-30 w-full transition-all duration-300", isScrolled ? 'bg-sand-beige/80 shadow-md backdrop-blur-lg' : 'bg-transparent')}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="text-3xl font-serif font-medium text-aloe-green">Aquabloom</a>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className={getLinkClass(link.id)}>{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <a href="#shop" className="hidden lg:inline-flex">
              <Button variant="default">Shop Now</Button>
            </a>
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
                    <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className={cn("text-xl", getLinkClass(link.id))}>{link.label}</a>
                ))}
            </nav>
            <a href="#shop" className="mt-auto w-full">
              <Button variant="default" className="w-full">Shop Now</Button>
            </a>
        </div>
      </Sheet>
    </header>
  );
};