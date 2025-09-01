import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      className="group"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full overflow-hidden flex flex-col">
        {/* Square Image Box with Hover Overlay */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={`Photo of ${product.name}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal-gray/60 p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-lg font-semibold">{product.packaging}</p>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-grow flex flex-col p-4">
          <h3 className="font-serif text-xl font-medium">{product.name}</h3>
          <ul className="mt-3 list-disc list-inside text-charcoal-gray/70 space-y-1 dark:text-sand-beige/80">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-auto pt-4">
            <p className="mt-1 text-lg font-semibold text-aloe-green dark:text-aqua-blue">{product.price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 mt-3">
              <label htmlFor={`quantity-${product.id}`} className="text-sm text-charcoal-gray/70 dark:text-sand-beige/80">Qty:</label>
              <input
                id={`quantity-${product.id}`}
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 rounded-none bg-transparent border-0 border-b-2 border-charcoal-gray/20 px-2 py-1 text-center text-sm transition-colors focus:ring-0 focus:border-aloe-green dark:border-sand-beige/20 dark:focus:border-aqua-blue"
              />
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full mt-3 rounded-xl">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};