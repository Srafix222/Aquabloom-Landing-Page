import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Button } from '../ui/Button';

interface ProductCarouselCardProps {
  product: Product;
}

export const ProductCarouselCard: React.FC<ProductCarouselCardProps> = ({ product }) => {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img
        src={product.image}
        alt={`Photo of ${product.name}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* The overlay has a dark background in both light and dark modes. Text color is set to the theme's sand-beige for better readability. */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal-gray/80 to-transparent p-4 text-sand-beige opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="font-serif text-lg font-medium">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
            <p className="text-base font-semibold text-aqua-blue">{product.price}</p>
            <Button size="sm" variant="secondary" className="h-8 px-4 rounded-full text-xs">Add</Button>
        </div>
      </div>
    </div>
  );
};
