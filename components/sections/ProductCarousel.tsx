import React from 'react';
import { Product } from '../types';
import { AnimatedSection } from '../shared/AnimatedSection';
import { ProductCarouselCard } from '../shared/ProductCarouselCard';

interface ProductCarouselProps {
    products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    const duplicatedProducts = [...products, ...products];

    return (
        <AnimatedSection className="py-20 lg:py-24 bg-sand-beige/40 dark:bg-gray-900">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium">Discover More</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal-gray/80 dark:text-sand-beige/90">
                        Explore other favorites from our collection.
                    </p>
                </div>
            </div>
            <div className="relative mt-16 w-full overflow-hidden">
                <div className="flex w-max animate-scroll-slow hover:pause">
                    {duplicatedProducts.map((product, index) => (
                        <div key={`${product.id}-${index}`} className="flex-shrink-0 w-64 md:w-72 px-4">
                            <ProductCarouselCard product={product} />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sand-beige/40 to-transparent dark:from-gray-900"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sand-beige/40 to-transparent dark:from-gray-900"></div>
            </div>
        </AnimatedSection>
    );
};