import React, { useState } from 'react';
import { AnimatedSection } from '../shared/AnimatedSection';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const EmailCapture: React.FC = () => {
    const [email, setEmail] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            toast({
                variant: 'default',
                title: 'Welcome to the Bloom Club!',
                description: "We've added you to our list. Look out for glowing updates!",
            });
            setEmail('');
        } else {
            toast({
                variant: 'destructive',
                title: 'Invalid Email',
                description: 'Please enter a valid email address.',
            });
        }
    };
    return (
        <AnimatedSection id="contact" className="py-20 lg:py-32 bg-white scroll-mt-20 dark:bg-gray-800">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium">Join the Bloom Club 🌿</h2>
                    <p id="email-description" className="mt-4 text-lg text-charcoal-gray/80 dark:text-sand-beige/90">
                        Get exclusive offers, skincare tips, and first looks. We send only what’s useful—no spam, just glow.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <div className="flex-grow">
                            <label htmlFor="email-input" className="sr-only">Email address</label>
                            <Input 
                                id="email-input"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="email-description"
                                required
                            />
                        </div>
                        <Button type="submit" className="flex-shrink-0">Subscribe</Button>
                    </form>
                </div>
            </div>
        </AnimatedSection>
    );
};