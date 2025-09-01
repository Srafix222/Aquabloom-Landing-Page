import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sheet: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }> = ({ open, onOpenChange, children }) => {
    const sheetRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<Element | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange(false);
            }
        };

        if (open) {
            triggerRef.current = document.activeElement;
            document.addEventListener('keydown', handleKeyDown);
            
            // Delay focus to allow for transition
            setTimeout(() => {
                const focusableElements = sheetRef.current?.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements && focusableElements.length > 0) {
                    (focusableElements[0] as HTMLElement).focus();
                }
            }, 100);
        } else if (triggerRef.current instanceof HTMLElement) {
            triggerRef.current.focus();
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onOpenChange]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 z-40 bg-black/60"
                        aria-hidden="true"
                    />
                    <motion.div
                        ref={sheetRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-sand-beige p-6 shadow-2xl dark:bg-gray-900"
                        role="dialog"
                        aria-modal="true"
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};