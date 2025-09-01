import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const Button: React.FC<React.ComponentProps<typeof motion.button> & { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'; size?: 'default' | 'sm' | 'lg' | 'icon' }> = ({
  className, variant = 'default', size = 'default', ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-aloe-green text-white hover:bg-aloe-green/90 dark:bg-aqua-blue dark:text-charcoal-gray dark:hover:bg-aqua-blue/90",
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
    outline: "border border-aloe-green bg-transparent text-aloe-green hover:bg-aloe-green/10 dark:border-aqua-blue dark:text-aqua-blue dark:hover:bg-aqua-blue/10",
    secondary: "bg-charcoal-gray/10 text-charcoal-gray hover:bg-charcoal-gray/20 dark:bg-sand-beige/10 dark:text-sand-beige dark:hover:bg-sand-beige/20",
    ghost: "hover:bg-aloe-green/10 hover:text-aloe-green dark:hover:bg-sand-beige/10 dark:hover:text-sand-beige",
    link: "text-aloe-green underline-offset-4 hover:underline dark:text-aqua-blue",
  };
  
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  };
  
  return <motion.button className={cn(baseClasses, variants[variant], sizes[size], className)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...props} />;
};