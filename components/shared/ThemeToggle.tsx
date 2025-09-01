import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../ui/Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="relative w-10 h-10"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme === 'light' ? 'sun' : 'moon'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === 'light' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};
