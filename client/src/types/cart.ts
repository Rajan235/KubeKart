// types/cart.ts

// DTO for OrderService `/order/create` endpoint
export interface OrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  items: OrderItemDto[];
}

// Cart item returned by CartService `/cart/index`
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  imageUrl?: string;
  price: number;
  quantity: number;
}
