/*
 * AquabloomLanding.tsx
 *
 * USAGE:
 * This is a self-contained component file for the Aquabloom landing page.
 * It includes all necessary sub-components, types, hooks, and mocked UI primitives
 * to function standalone in a project with React, Tailwind CSS, framer-motion,
 * and lucide-react.
 *
 * FONT SETUP (in index.html):
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * SEO & METADATA (Example for a Head component like react-helmet):
 * <title>Aquabloom - Born from Nature’s Embrace</title>
 * <meta name="description" content="Discover pure aloe-infused hair & skincare, blending nature with science for your wellness. Sustainable, cruelty-free, and effective." />
 * <meta property="og:title" content="Aquabloom - Born from Nature’s Embrace" />
 * <meta property="og:description" content="Pure aloe-infused care for hair and skin." />
 * <meta property="og:image" content="https://picsum.photos/1200/630?random=1" />
 * <meta property="og:url" content="https://aquabloom.example.com" />
 * <meta name="twitter:card" content="summary_large_image" />
 */

import React, { useState, useEffect, useRef, useCallback, createContext, useContext, useMemo } from 'react';
// FIX: Added Variants to fix typing error for animation variants.
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
// FIX: Removed 'Pinterest' as it is not an exported member of 'lucide-react'.
import { Leaf, Rabbit, Recycle, Menu, X, Instagram, Facebook, Twitter, Star, ChevronRight, Share2 } from 'lucide-react';

//=========== TYPE DEFINITIONS ===========//

export type Product = {
  id: string;
  name: string;
  image: string;
  benefits: string[];
  packaging: string;
  price: string;
};

export type Testimonial = {
  id:string;
  name: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
};

//=========== DEFAULT DATA ===========//

const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Aloe Hydration Cleanser', image: 'https://picsum.photos/seed/cleanser/400/500', benefits: ["Gently purifies", "Balances moisture", "Soothes redness"], packaging: "200ml Recycled PET", price: "KSh 1,850" },
  { id: 'p2', name: 'Rescue & Repair Balm', image: 'https://picsum.photos/seed/balm/400/500', benefits: ["Multi-purpose salve", "Heals dry patches", "Protects skin barrier"], packaging: "100ml Metal Tin", price: "KSh 2,450" },
  { id: 'p3', name: 'Radiance Renewal Serum', image: 'https://picsum.photos/seed/serum/400/500', benefits: ["Aloe + Niacinamide", "Refines texture", "Boosts glow"], packaging: "30ml Glass Dropper", price: "KSh 3,250" },
  { id: 'p4', name: 'Daily Defense Moisturizer SPF 30', image: 'https://picsum.photos/seed/spf/400/500', benefits: ["Lightweight", "UVA/UVB protection", "Non-greasy"], packaging: "50ml Airless Pump", price: "KSh 2,950" },
  { id: 'p5', name: 'Nourish & Soothe Hair Mask', image: 'https://picsum.photos/seed/mask/400/500', benefits: ["Strengthens strands", "Deeply conditions", "Reduces frizz"], packaging: "250ml Recyclable Jar", price: "KSh 2,700" },
  { id: 'p6', name: 'Soothing Aloe Gel', image: 'https://picsum.photos/seed/gel/400/500', benefits: ["Pure aloe vera", "Calms irritation", "Instant hydration"], packaging: "150ml Sugarcane Tube", price: "KSh 1,500" },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Jessica M.', quote: "My sensitive skin finally feels calm and hydrated. The serum is a game-changer!", rating: 5, avatar: "https://picsum.photos/seed/jessica/100/100" },
  { id: 't2', name: 'David K.', quote: "Clean formulas, great feel, and the moisturizer sits perfectly under the Nairobi sun.", rating: 5, avatar: "https://picsum.photos/seed/david/100/100" },
  { id: 't3', name: 'Sarah L.', quote: "The hair mask revived my curls without heaviness. Love the eco packaging!", rating: 4, avatar: "https://picsum.photos/seed/sarah/100/100" },
];


//=========== UTILITY & HELPER FUNCTIONS ===========//

// Simple utility to merge Tailwind classes, akin to `tailwind-merge`
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

//=========== CUSTOM HOOKS ===========//

const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  return prefersReducedMotion;
};

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setEntry(entry);
                // Disconnect after first intersection to fire animation once
                if (node && observer.current) {
                    observer.current.unobserve(node);
                }
            }
        }, options);

        const { current: currentObserver } = observer;
        if (node) currentObserver.observe(node);

        return () => {
            if (currentObserver) currentObserver.disconnect();
        };
    }, [node, options]);

    return [setNode, entry] as const;
};

//=========== MOCKED SHADCN-UI TOAST SYSTEM ===========//
type Toast = { id: string; title: string; description: string; variant: 'default' | 'destructive' };
type ToastsContextType = { addToast: (toast: Omit<Toast, 'id'>) => void };

const ToastsContext = createContext<ToastsContextType | null>(null);

const Toaster: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
                                toast.variant === 'destructive' ? 'border-red-500 bg-red-50 text-red-800' : 'border-charcoal-gray/20 bg-white text-charcoal-gray'
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

const useToast = () => {
    const context = useContext(ToastsContext);
    if (!context) throw new Error("useToast must be used within a Toaster provider");
    
    const toast = (t: Omit<Toast, 'id'>) => {
        context.addToast(t);
    };
    
    return { toast };
};

//=========== MOCKED SHADCN-UI COMPONENTS ===========//

// FIX: Corrected the component's props type to be compatible with `motion.button`, resolving a type conflict with event handlers like `onDrag`.
const Button: React.FC<React.ComponentProps<typeof motion.button> & { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'; size?: 'default' | 'sm' | 'lg' | 'icon' }> = ({
  className, variant = 'default', size = 'default', ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-aloe-green text-white hover:bg-aloe-green/90",
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
    outline: "border border-aloe-green bg-transparent text-aloe-green hover:bg-aloe-green/10",
    secondary: "bg-charcoal-gray/10 text-charcoal-gray hover:bg-charcoal-gray/20",
    ghost: "hover:bg-aloe-green/10 hover:text-aloe-green",
    link: "text-aloe-green underline-offset-4 hover:underline",
  };
  
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  };
  
  return <motion.button className={cn(baseClasses, variants[variant], sizes[size], className)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...props} />;
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
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

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("rounded-2xl border border-charcoal-gray/10 bg-white/50 shadow-md transition-shadow duration-300 hover:shadow-xl", className)} {...props} />
);

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);

const Sheet: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }> = ({ open, onOpenChange, children }) => {
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

//=========== HELPER & ANIMATION COMPONENTS ===========//

// FIX: Updated component props to accept all standard section attributes (like `id`) and passed them down.
const AnimatedSection: React.FC<React.ComponentPropsWithoutRef<'section'>> = ({ children, className, ...props }) => {
    const controls = useAnimation();
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (entry?.isIntersecting && !prefersReducedMotion) {
            controls.start('visible');
        }
    }, [controls, entry, prefersReducedMotion]);

    // FIX: Explicitly typed the variants object with `Variants` from framer-motion to resolve the 'ease' property type error.
    const variants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    
    if (prefersReducedMotion) {
        return <section className={className} {...props}>{children}</section>;
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


const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => (
    <div className={cn("flex items-center gap-1", className)}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("h-5 w-5", i < rating ? 'text-bloom-blush fill-current' : 'text-charcoal-gray/20')} />
        ))}
    </div>
);


//=========== SECTION COMPONENTS ===========//

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#shop', label: 'Shop' },
    { href: '#about', label: 'About' },
    { href: '#sustainability', label: 'Sustainability' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={cn("sticky top-0 z-30 w-full transition-all duration-300", isScrolled ? 'bg-sand-beige/80 shadow-md backdrop-blur-lg' : 'bg-transparent')}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="text-3xl font-serif font-medium text-aloe-green">Aquabloom</a>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-charcoal-gray transition-colors hover:text-aloe-green">{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="default" className="hidden lg:inline-flex">Shop Now</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
                <a href="#" className="text-2xl font-serif font-medium text-aloe-green">Aquabloom</a>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <nav className="mt-12 flex flex-col space-y-6">
                {navLinks.map(link => (
                    <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-xl text-charcoal-gray transition-colors hover:text-aloe-green">{link.label}</a>
                ))}
            </nav>
            <Button variant="default" className="mt-auto w-full">Shop Now</Button>
        </div>
      </Sheet>
    </header>
  );
};


const Hero: React.FC = () => {
    return (
        <section className="relative flex h-[80vh] min-h-[600px] items-center justify-center text-center text-white">
            <div className="absolute inset-0">
                <img src="https://picsum.photos/seed/aloe-bg/1920/1080" alt="Close-up of an aloe vera plant with water droplets" className="h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-charcoal-gray/60"></div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative z-10 max-w-3xl px-6"
            >
                <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight">Born from Nature’s Embrace</h1>
                <p className="mt-4 text-lg md:text-xl font-light">Pure aloe-infused care for hair and skin.</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="bg-aloe-green hover:bg-aloe-green/90">Shop Now</Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Discover Our Collection</Button>
                </div>
            </motion.div>
        </section>
    );
};

const About: React.FC = () => {
    const features = [
        { icon: Leaf, title: 'Sustainable', description: 'Ethically sourced ingredients' },
        { icon: Rabbit, title: 'Cruelty-Free', description: 'Never tested on animals' },
        { icon: Recycle, title: 'Recyclable', description: 'Eco-conscious packaging' },
    ];
    return (
        <AnimatedSection className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/plant/800/900" alt="A healthy aloe vera plant in a terracotta pot" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">From One Plant, a Promise</h2>
                        <p className="mt-6 text-lg text-charcoal-gray/80 leading-relaxed">
                            Aquabloom began with one resilient aloe vera plant and a promise: skincare that feels like a deep breath. Today, our science-backed blends honor nature’s intelligence—pure, gentle, and effective.
                        </p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {features.map(feature => (
                                <div key={feature.title} className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-aloe-green/10 text-aloe-green">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                                    <p className="mt-1 text-sm text-charcoal-gray/70">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <motion.div
            className="group"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Card className="h-full overflow-hidden flex flex-col">
                <div className="relative overflow-hidden pt-[125%]">
                    <img src={product.image} alt={`Photo of ${product.name}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <CardContent className="flex-grow flex flex-col">
                    <h3 className="font-serif text-2xl font-medium">{product.name}</h3>
                    <ul className="mt-3 list-disc list-inside text-charcoal-gray/70 space-y-1">
                        {product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}
                    </ul>
                    <div className="mt-auto pt-6">
                        <p className="text-sm text-charcoal-gray/60">{product.packaging}</p>
                        <p className="mt-2 text-lg font-semibold text-aloe-green">{product.price}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const Products: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <AnimatedSection id="shop" className="py-20 lg:py-32 bg-sand-beige/40">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium">Discover Our Collection</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal-gray/80">
                        A curated selection of aloe-infused essentials for your daily ritual.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    return (
        <Card className="h-full bg-white p-8 flex flex-col">
            <StarRating rating={testimonial.rating} />
            <blockquote className="mt-4 text-lg text-charcoal-gray/90 flex-grow">"{testimonial.quote}"</blockquote>
            <div className="mt-6 flex items-center">
                {testimonial.avatar && <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="h-12 w-12 rounded-full object-cover" />}
                <p className={cn("font-semibold", testimonial.avatar && "ml-4")}>{testimonial.name}</p>
            </div>
        </Card>
    );
};


const Reviews: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [testimonials.length, prefersReducedMotion]);

    if (prefersReducedMotion) {
        return (
            <AnimatedSection id="reviews" className="py-20 lg:py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">Voices of Our Community</h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
                    </div>
                </div>
            </AnimatedSection>
        )
    }

    return (
        <AnimatedSection id="reviews" className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-medium">Voices of Our Community</h2>
                <div className="mt-16 relative h-80 md:h-64 overflow-hidden">
                    <AnimatePresence initial={false} custom={currentIndex}>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="absolute inset-0 px-4 md:px-20"
                        >
                            <TestimonialCard testimonial={testimonials[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>
                 <div className="mt-8 flex justify-center space-x-3">
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={cn("h-2 w-2 rounded-full transition-colors", currentIndex === index ? 'bg-aloe-green' : 'bg-charcoal-gray/20')}/>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const Sustainability: React.FC = () => {
    const commitments = [
        { icon: Recycle, title: "Recyclable Packaging", text: "Our bottles, jars, and tubes are designed to be recycled and repurposed." },
        { icon: Leaf, title: "Vegan Formulas", text: "100% plant-derived ingredients, completely free from animal products." },
        { icon: Rabbit, title: "Cruelty-Free", text: "We are proudly Leaping Bunny certified, ensuring no animal testing ever." },
    ];
    return (
        <AnimatedSection id="sustainability" className="py-20 lg:py-32 bg-sand-beige/40">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="font-serif text-4xl md:text-5xl font-medium">Nature’s touch, responsibly packaged.</h2>
                        <p className="mt-6 text-lg text-charcoal-gray/80 leading-relaxed">
                            Our commitment to the planet is as pure as our ingredients. We believe in beauty that gives back to nature, from sourcing to shipping.
                        </p>
                        <div className="mt-10 space-y-8">
                            {commitments.map(c => (
                                <div key={c.title} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-white text-aqua-blue">
                                        <c.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{c.title}</h3>
                                        <p className="mt-1 text-charcoal-gray/70">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-lg">
                         <img src="https://picsum.photos/seed/packaging/800/900" alt="Eco-friendly Aquabloom product packaging arranged neatly" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const EmailCapture: React.FC = () => {
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
        <AnimatedSection id="contact" className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium">Join the Bloom Club 🌿</h2>
                    <p className="mt-4 text-lg text-charcoal-gray/80">
                        Get exclusive offers, skincare tips, and first looks. We send only what’s useful—no spam, just glow.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <Input 
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email address"
                            required
                        />
                        <Button type="submit" className="flex-shrink-0">Subscribe</Button>
                    </form>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Footer: React.FC = () => {
    const socialLinks = [
        { href: '#', icon: Instagram, label: 'Instagram' },
        { href: '#', icon: Facebook, label: 'Facebook' },
        { href: '#', icon: Twitter, label: 'Twitter' },
    ];

    const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
    const shareText = encodeURIComponent("Check out Aquabloom for pure, nature-infused skincare!");

    return (
        <footer className="bg-charcoal-gray text-sand-beige/80 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-3xl font-serif text-aloe-green">Aquabloom</h3>
                        <p className="mt-2 text-sm italic">Born from Nature’s Embrace</p>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige">Shop</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#shop" className="hover:text-white">All Products</a></li>
                            <li><a href="#" className="hover:text-white">Skincare</a></li>
                            <li><a href="#" className="hover:text-white">Haircare</a></li>
                            <li><a href="#" className="hover:text-white">Sets & Gifts</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige">About</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#about" className="hover:text-white">Our Story</a></li>
                            <li><a href="#sustainability" className="hover:text-white">Sustainability</a></li>
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige">Connect</h4>
                         <div className="flex space-x-4 mt-4">
                            {socialLinks.map(link => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-sand-beige/70 hover:text-white">
                                    <link.icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                        <h4 className="font-semibold tracking-wider uppercase text-sand-beige mt-6">Share</h4>
                        <div className="flex space-x-4 mt-4">
                             <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-sand-beige/70 hover:text-white" aria-label="Share on Facebook"><Facebook className="h-6 w-6" /></a>
                             <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-sand-beige/70 hover:text-white" aria-label="Share on Twitter"><Twitter className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-sand-beige/20 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Aquabloom. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};


//=========== MAIN LANDING PAGE COMPONENT ===========//

interface AquabloomLandingProps {
  products?: Product[];
  testimonials?: Testimonial[];
}

const AquabloomLanding: React.FC<AquabloomLandingProps> = ({
  products = DEFAULT_PRODUCTS,
  testimonials = DEFAULT_TESTIMONIALS,
}) => {
  return (
    <Toaster>
      <main className="bg-sand-beige/50">
        <Header />
        <Hero />
        <About />
        <Products products={products} />
        <Reviews testimonials={testimonials} />
        <Sustainability />
        <EmailCapture />
        <Footer />
      </main>
    </Toaster>
  );
};

export default AquabloomLanding;
