import React, { useState, useCallback, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

type Toast = { id: string; title: string; description: string; variant: 'default' | 'destructive' };
type ToastsContextType = { addToast: (toast: Omit<Toast, 'id'>) => void };

const ToastsContext = createContext<ToastsContextType | null>(null);

export const Toaster: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = new Date().toISOString();
        setToasts(currentToasts => [...currentToasts, { ...toast, id }]);
        setTimeout(() => {
            setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const contextValue = useMemo(() => ({ addToast }), [addToast]);
    
    return (
        <ToastsContext.Provider value={contextValue}>
            {children}
            <div className="fixed top-0 right-0 z-[100] p-4 sm:p-6 space-y-2">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            layout
                            initial={{ opacity: 0, y: 50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            className={cn(
                                "relative flex w-full max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg",
                                toast.variant === 'destructive' ? 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700' : 'border-charcoal-gray/20 bg-white text-charcoal-gray dark:bg-gray-800 dark:text-sand-beige dark:border-sand-beige/20'
                            )}
                        >
                            <div className="grid gap-1">
                                <div className="font-semibold">{toast.title}</div>
                                <div className="text-sm opacity-90">{toast.description}</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastsContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastsContext);
    if (!context) throw new Error("useToast must be used within a Toaster provider");
    
    const toast = (t: Omit<Toast, 'id'>) => {
        context.addToast(t);
    };
    
    return { toast };
};