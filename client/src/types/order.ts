// /types/order.ts
export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED"
  | "COMPLETED"
  | "DELIVERED"
  | "SHIPPED";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  totalPrice: number;
};
// export interface AdminOrder {
//   id: string;
//   userId: string;
//   status: string;
//   totalPrice: number;
//   createdAt: string;
// }
export interface AdminOrder {
  id: string;
  buyerId: string;
  sellerId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface AdminOrderDetail {
  id: string;
  userId: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
export interface SellerOrderItem {
  itemId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  status: string;
}

export interface SellerOrder {
  orderId: string;
  buyerName: string;
  items: SellerOrderItem[];
}
