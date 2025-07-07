export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  sellerId: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  sellerId: string;
  createdAt: string;
}
