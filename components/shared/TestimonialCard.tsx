import React from 'react';
import { Testimonial } from '../types';
import { Card } from '../ui/Card';
import { StarRating } from './StarRating';
import { cn } from '../lib/utils';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <Card className="h-full bg-white p-8 flex flex-col">
            <StarRating rating={testimonial.rating} />
            <blockquote className="mt-4 text-lg text-charcoal-gray/90 flex-grow dark:text-sand-beige/95">"{testimonial.quote}"</blockquote>
            <div className="mt-6 flex items-center">
                {testimonial.avatar && <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="h-12 w-12 rounded-full object-cover" />}
                <p className={cn("font-semibold dark:text-sand-beige", testimonial.avatar && "ml-4")}>{testimonial.name}</p>
            </div>
        </Card>
    );
};
