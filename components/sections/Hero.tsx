import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
    return (
        <section className="relative flex h-[80vh] min-h-[600px] items-center justify-center text-center text-white">
            <div className="absolute inset-0">
                <img src="https://picsum.photos/seed/aloe-bg/1920/1080" alt="Close-up of an aloe vera plant with water droplets" className="h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-charcoal-gray/60"></div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative z-10 max-w-3xl px-6"
            >
                <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight">Born from Nature’s Embrace</h1>
                <p className="mt-4 text-lg md:text-xl font-light">Pure aloe-infused care for hair and skin.</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="bg-aloe-green hover:bg-aloe-green/90">Shop Now</Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Discover Our Collection</Button>
                </div>
            </motion.div>
        </section>
    );
};
