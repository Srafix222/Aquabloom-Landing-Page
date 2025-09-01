import React from 'react';
import { Recycle, Leaf, Rabbit } from 'lucide-react';
import { AnimatedSection } from '../shared/AnimatedSection';

export const Sustainability: React.FC = () => {
    const commitments = [
        { icon: Recycle, title: "Recyclable Packaging", text: "Our bottles, jars, and tubes are designed to be recycled and repurposed." },
        { icon: Leaf, title: "Vegan Formulas", text: "100% plant-derived ingredients, completely free from animal products." },
        { icon: Rabbit, title: "Cruelty-Free", text: "We are proudly Leaping Bunny certified, ensuring no animal testing ever." },
    ];
    return (
        <AnimatedSection id="sustainability" className="py-20 lg:py-32 bg-sand-beige/40 scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">Nature’s touch, responsibly packaged.</h2>
                        <p className="mt-6 text-lg text-charcoal-gray/80 leading-relaxed">
                            Our commitment to the planet is as pure as our ingredients. We believe in beauty that gives back to nature, from sourcing to shipping.
                        </p>
                        <div className="mt-10 space-y-8">
                            {commitments.map(c => (
                                <div key={c.title} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-white text-aqua-blue">
                                        <c.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{c.title}</h3>
                                        <p className="mt-1 text-charcoal-gray/70">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-lg">
                         <img src="https://picsum.photos/seed/packaging/800/900" alt="Eco-friendly Aquabloom product packaging arranged neatly" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};