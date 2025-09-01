import React from 'react';
import { AnimatedSection } from '../shared/AnimatedSection';

const logos = [
    "VOGUE",
    "GLAMOUR",
    "ELLE",
    "STYLIST",
    "REFINERY29",
    "COSMOPOLITAN",
    "BYRDIE",
];

export const LogoCarousel: React.FC = () => {
    return (
        <AnimatedSection className="py-12 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 lg:px-8">
                <h3 className="text-center font-sans text-sm font-semibold uppercase tracking-widest text-charcoal-gray/60 dark:text-sand-beige/80">
                    As Featured In
                </h3>
                <div className="relative mt-8 w-full overflow-hidden">
                    <div className="flex w-max animate-scroll hover:pause">
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 w-64 flex items-center justify-center">
                                <span className="font-serif text-3xl text-charcoal-gray/50 dark:text-sand-beige/60">
                                    {logo}
                                </span>
                            </div>
                        ))}
                    </div>
                     <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-gray-800"></div>
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-gray-800"></div>
                </div>
            </div>
        </AnimatedSection>
    );
};