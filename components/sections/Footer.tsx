import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
    const socialLinks = [
        { href: '#', icon: Instagram, label: 'Instagram' },
        { href: '#', icon: Facebook, label: 'Facebook' },
        { href: '#', label: 'Twitter', icon: Twitter },
    ];

    const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
    const shareText = encodeURIComponent("Check out Aquabloom for pure, nature-infused skincare!");

    return (
        <footer className="bg-charcoal-gray text-sand-beige/80 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <a href="#hero" className="text-3xl font-serif text-aloe-green" aria-label="Scroll to top of page">Aquabloom</a>
                        <p className="mt-2 text-sm italic">Born from Nature’s Embrace</p>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige">Shop</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#shop" className="hover:text-white" aria-label="Scroll to Shop section">All Products</a></li>
                            <li><a href="#shop" className="hover:text-white" aria-label="Scroll to Shop section">Skincare</a></li>
                            <li><a href="#shop" className="hover:text-white" aria-label="Scroll to Shop section">Haircare</a></li>
                            <li><a href="#shop" className="hover:text-white" aria-label="Scroll to Shop section">Sets & Gifts</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige">About</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#about" className="hover:text-white" aria-label="Scroll to About section">Our Story</a></li>
                            <li><a href="#sustainability" className="hover:text-white" aria-label="Scroll to Sustainability section">Sustainability</a></li>
                            <li><a href="#reviews" className="hover:text-white" aria-label="Scroll to Reviews section">Reviews</a></li>
                            <li><a href="#contact" className="hover:text-white" aria-label="Scroll to Contact section">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige">Connect</h4>
                         <div className="flex space-x-4 mt-4">
                            {socialLinks.map(link => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-sand-beige/70 hover:text-white">
                                    <link.icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige mt-6">Share</h4>
                        <div className="flex space-x-4 mt-4">
                             <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-sand-beige/70 hover:text-white" aria-label="Share on Facebook"><Facebook className="h-6 w-6" /></a>
                             <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-sand-beige/70 hover:text-white" aria-label="Share on Twitter"><Twitter className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-sand-beige/20 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Aquabloom. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};