import React from 'react';
import { Leaf, Rabbit, Recycle } from 'lucide-react';
import { AnimatedSection } from '../shared/AnimatedSection';

export const About: React.FC = () => {
    const features = [
        { icon: Leaf, title: 'Sustainable', description: 'Ethically sourced ingredients' },
        { icon: Rabbit, title: 'Cruelty-Free', description: 'Never tested on animals' },
        { icon: Recycle, title: 'Recyclable', description: 'Eco-conscious packaging' },
    ];
    return (
        <AnimatedSection id="about" className="py-20 lg:py-32 bg-white scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img src="https://www.aloe-vera-gel-shop.com/newshop/wp-content/uploads/2015/05/aloe-harvest.jpg" alt="A healthy aloe vera plant in a terracotta pot" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">From One Plant, a Promise</h2>
                        <p className="mt-6 text-lg text-charcoal-gray/80 leading-relaxed">
                            Aquabloom began with one resilient aloe vera plant and a promise: skincare that feels like a deep breath. Today, our science-backed blends honor nature’s intelligence—pure, gentle, and effective.
                        </p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {features.map(feature => (
                                <div key={feature.title} className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-aloe-green/10 text-aloe-green">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                                    <p className="mt-1 text-sm text-charcoal-gray/70">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};