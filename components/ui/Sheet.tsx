import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sheet: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }> = ({ open, onOpenChange, children }) => {
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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-sand-beige p-6 shadow-2xl"
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
