"use client";

import CartItemCard from "@/components/layouts/CartItemCard";
import { useMemo, useState } from "react";

type CartItem = {
  productId: string;
  productName: string;
  sellerId: string;
  price: number;
  quantity: number;
  totalPrice: number;
};
type Cart = {
  userId: string;
  items: CartItem[];
};
const dummyCart = {
  userId: "user123",
  items: [
    {
      productId: "p1",
      productName: "Organic Olive Oil",
      sellerId: "sellerA",
      price: 250,
      quantity: 2,
      totalPrice: 500,
    },
    {
      productId: "p2",
      productName: "Raw Honey Jar",
      sellerId: "sellerB",
      price: 180,
      quantity: 1,
      totalPrice: 180,
    },
  ],
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart>(dummyCart);
  const handleQuantityChange = (productId: string, delta: number) => {
    const updatedItems = cart.items
      .map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + delta,
              totalPrice: (item.quantity + delta) * item.price,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart({ ...cart, items: updatedItems });
  };
  const handleRemove = (productId: string) => {
    setCart({
      ...cart,
      items: cart.items.filter((item) => item.productId !== productId),
    });
  };

  const handleClearCart = () => {
    setCart({ ...cart, items: [] });
  };

  const totalItems = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items]
  );

  const cartTotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.totalPrice, 0),
    [cart.items]
  );

  // return (
  //   <div className="min-h-screen bg-beige px-6 py-16">
  //     <h1 className="text-4xl font-bold text-olive mb-8 text-center">
  //       Your Cart
  //     </h1>

  //     <div className="max-w-3xl mx-auto space-y-6">
  //       {cart.items.length === 0 ? (
  //         <div className="text-center text-olive/70">No items in cart yet.</div>
  //       ) : (
  //         cart.items.map((item) => (
  //           <CartItemCard key={item.productId} item={item} />
  //         ))
  //       )}

  //       {cart.items.length > 0 && (
  //         <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
  //           <div className="flex justify-between mb-2 text-lg font-semibold text-olive">
  //             <span>Total Items:</span>
  //             <span>{totalItems}</span>
  //           </div>
  //           <div className="flex justify-between text-xl font-bold text-olive">
  //             <span>Cart Total:</span>
  //             <span>₹{cartTotal}</span>
  //           </div>
  //           <button className="mt-6 w-full bg-olive text-white py-3 rounded-xl font-semibold hover:bg-olive/90 transition">
  //             Proceed to Checkout
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-beige px-6 py-16">
      <h1 className="text-4xl font-bold text-olive mb-8 text-center">
        Your Cart
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {cart.items.length === 0 ? (
          <div className="text-center text-olive/70">No items in cart yet.</div>
        ) : (
          cart.items.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))
        )}

        {cart.items.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex justify-between text-lg font-semibold text-olive">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-olive">
              <span>Cart Total:</span>
              <span>₹{cartTotal}</span>
            </div>
            <button className="w-full bg-olive text-white py-3 rounded-xl font-semibold hover:bg-olive/90 transition">
              Proceed to Checkout
            </button>
            <button
              onClick={handleClearCart}
              className="w-full border border-olive text-olive py-2 rounded-xl font-semibold hover:bg-olive/10 transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
