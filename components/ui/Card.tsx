import React from 'react';
import { cn } from '../lib/utils';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("rounded-2xl border border-charcoal-gray/10 bg-white/50 shadow-md transition-shadow duration-300 hover:shadow-xl", className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);
