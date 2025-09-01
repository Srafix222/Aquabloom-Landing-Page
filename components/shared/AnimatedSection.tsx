import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// FIX: Use `React.ComponentProps<typeof motion.section>` for props.
// This ensures that the props are compatible with `motion.section`, resolving a type conflict
// with some event handlers like `onDrag` that have different signatures between standard
// React HTML attributes and framer-motion's motion components.
export const AnimatedSection: React.FC<React.ComponentProps<typeof motion.section>> = ({ children, className, ...props }) => {
    const controls = useAnimation();
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (entry?.isIntersecting && !prefersReducedMotion) {
            controls.start('visible');
        }
    }, [controls, entry, prefersReducedMotion]);

    const variants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    
    if (prefersReducedMotion) {
        // FIX: The original code returned a standard `<section>`, causing a type error for `children`.
        // By returning a `motion.section` here without animation props, we ensure type compatibility
        // for all props (including `children` and event handlers) and effectively disable the animation.
        return <motion.section className={className} {...props}>{children}</motion.section>;
    }

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
            {...props}
        >
            {children}
        </motion.section>
    );
};
