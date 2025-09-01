
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '../ui/Button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};


export const Hero: React.FC = () => {
    return (
        <section id="hero" className="relative flex h-[80vh] min-h-[600px] items-center justify-center text-center text-white">
            <div className="absolute inset-0">
                <img src="https://picsum.photos/seed/aloe-bg/1920/1080" alt="Close-up of an aloe vera plant with water droplets" className="h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-charcoal-gray/60"></div>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 max-w-3xl px-6"
            >
                <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl font-medium leading-tight">Born from Nature’s Embrace</motion.h1>
                <motion.p variants={itemVariants} className="mt-4 text-lg md:text-xl font-light">Pure aloe-infused care for hair and skin.</motion.p>
                <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#shop" aria-label="Scroll to Shop section">
                      <Button size="lg" className="bg-aloe-green hover:bg-aloe-green/90">Shop Now</Button>
                    </a>
                    <a href="#shop" aria-label="Scroll to Shop section">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Discover Our Collection</Button>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};