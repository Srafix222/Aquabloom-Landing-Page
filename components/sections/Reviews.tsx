import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../types';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { cn } from '../lib/utils';
import { AnimatedSection } from '../shared/AnimatedSection';
import { TestimonialCard } from '../shared/TestimonialCard';

interface ReviewsProps {
    testimonials: Testimonial[];
}

export const Reviews: React.FC<ReviewsProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [testimonials.length, prefersReducedMotion]);

    if (prefersReducedMotion) {
        return (
            <AnimatedSection id="reviews" className="py-20 lg:py-32 bg-white scroll-mt-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">Voices of Our Community</h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
                    </div>
                </div>
            </AnimatedSection>
        )
    }

    return (
        <AnimatedSection id="reviews" className="py-20 lg:py-32 bg-white scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-medium">Voices of Our Community</h2>
                <div className="mt-16 relative h-80 md:h-64 overflow-hidden">
                    <AnimatePresence initial={false} custom={currentIndex}>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="absolute inset-0 px-4 md:px-20"
                        >
                            <TestimonialCard testimonial={testimonials[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>
                 <div className="mt-8 flex justify-center space-x-3">
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={cn("h-2 w-2 rounded-full transition-colors", currentIndex === index ? 'bg-aloe-green' : 'bg-charcoal-gray/20')}/>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};