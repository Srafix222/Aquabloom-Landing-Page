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
