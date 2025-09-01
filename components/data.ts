import { Product, Testimonial } from './types';

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Aloe Hydration Cleanser', image: 'https://picsum.photos/seed/cleanser/400/500', benefits: ["Gently purifies", "Balances moisture", "Soothes redness"], packaging: "200ml Recycled PET", price: "KSh 1,850" },
  { id: 'p2', name: 'Rescue & Repair Balm', image: 'https://picsum.photos/seed/balm/400/500', benefits: ["Multi-purpose salve", "Heals dry patches", "Protects skin barrier"], packaging: "100ml Metal Tin", price: "KSh 2,450" },
  { id: 'p3', name: 'Radiance Renewal Serum', image: 'https://picsum.photos/seed/serum/400/500', benefits: ["Aloe + Niacinamide", "Refines texture", "Boosts glow"], packaging: "30ml Glass Dropper", price: "KSh 3,250" },
  { id: 'p4', name: 'Daily Defense Moisturizer SPF 30', image: 'https://picsum.photos/seed/spf/400/500', benefits: ["Lightweight", "UVA/UVB protection", "Non-greasy"], packaging: "50ml Airless Pump", price: "KSh 2,950" },
  { id: 'p5', name: 'Nourish & Soothe Hair Mask', image: 'https://picsum.photos/seed/mask/400/500', benefits: ["Strengthens strands", "Deeply conditions", "Reduces frizz"], packaging: "250ml Recyclable Jar", price: "KSh 2,700" },
  { id: 'p6', name: 'Soothing Aloe Gel', image: 'https://picsum.photos/seed/gel/400/500', benefits: ["Pure aloe vera", "Calms irritation", "Instant hydration"], packaging: "150ml Sugarcane Tube", price: "KSh 1,500" },
  { id: 'p7', name: 'Clarifying Aloe Toner', image: 'https://picsum.photos/seed/toner/400/500', benefits: ["Minimizes pores", "Refreshes skin", "Alcohol-free"], packaging: "150ml Glass Bottle", price: "KSh 2,100" },
  { id: 'p8', name: 'Overnight Recovery Cream', image: 'https://picsum.photos/seed/cream/400/500', benefits: ["Deeply nourishes", "Restores barrier", "Wake up glowing"], packaging: "50ml Glass Jar", price: "KSh 3,800" },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Jessica M.', quote: "My sensitive skin finally feels calm and hydrated. The serum is a game-changer!", rating: 5, avatar: "https://picsum.photos/seed/jessica/100/100" },
  { id: 't2', name: 'David K.', quote: "Clean formulas, great feel, and the moisturizer sits perfectly under the Nairobi sun.", rating: 5, avatar: "https://picsum.photos/seed/david/100/100" },
  { id: 't3', name: 'Sarah L.', quote: "The hair mask revived my curls without heaviness. Love the eco packaging!", rating: 4, avatar: "https://picsum.photos/seed/sarah/100/100" },
];