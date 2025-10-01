// src/api/products.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1200,
    description: "Powerful laptop for developers",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 40,
    description: "Comfortable ergonomic mouse",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 90,
    description: "RGB backlit mechanical keyboard",
    image: "https://via.placeholder.com/200"
  }
];