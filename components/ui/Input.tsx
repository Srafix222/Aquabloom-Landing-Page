import React from 'react';
import { cn } from '../lib/utils';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-full border border-charcoal-gray/20 bg-white px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-charcoal-gray/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
