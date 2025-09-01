import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

export const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => (
    <div className={cn("flex items-center gap-1", className)}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("h-5 w-5", i < rating ? 'text-bloom-blush fill-current' : 'text-charcoal-gray/20 dark:text-sand-beige/20')} />
        ))}
    </div>
);