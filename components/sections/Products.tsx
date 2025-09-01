import React from 'react';
import { Product } from '../types';
import { AnimatedSection } from '../shared/AnimatedSection';
import { ProductCard } from '../shared/ProductCard';

interface ProductsProps {
    products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
    return (
        <AnimatedSection id="shop" className="py-20 lg:py-32 bg-sand-beige/40">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium">Discover Our Collection</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal-gray/80">
                        A curated selection of aloe-infused essentials for your daily ritual.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};