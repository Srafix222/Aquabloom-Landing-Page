/*
 * AquabloomLanding.tsx
 *
 * USAGE:
 * This is the main orchestrator for the Aquabloom landing page.
 * It imports all page sections and assembles the final layout.
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

import React from 'react';
import { Product, Testimonial } from './types';
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from './data';
import { Toaster } from './ui/Toast';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Products } from './sections/Products';
import { Reviews } from './sections/Reviews';
import { Sustainability } from './sections/Sustainability';
import { EmailCapture } from './sections/EmailCapture';
import { Footer } from './sections/Footer';

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
