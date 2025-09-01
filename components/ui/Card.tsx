import React from 'react';
import { cn } from '../lib/utils';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("rounded-2xl border border-charcoal-gray/10 bg-white/50 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-charcoal-gray dark:border-sand-beige/20 dark:shadow-2xl dark:shadow-black/20", className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);