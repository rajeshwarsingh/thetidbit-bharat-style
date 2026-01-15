export interface ProductColor {
  name: string;
  hex: string;
  id: string;
  images: string[]; // Index 0: Model/Lifestyle, Index 1: Product Shot, Index 2: Flat Lay
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  tag?: string;
}

export interface ProductDetails {
  id: string;
  brand: string;
  name: string;
  tagline: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  category: string[];
  material: string;
  shape: string;
  dimensions: string;
  weight: string;
  origin: string;
  returnPolicy: string;
  delivery: string;
  features: string[];
  colors: ProductColor[];
}