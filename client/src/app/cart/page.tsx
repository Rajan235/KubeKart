// "use client";

// import CartItemCard from "@/components/layouts/CartItemCard";
// import { useProtectedRoute } from "@/lib/useProtectedRoute";
// import { useMemo, useState } from "react";

// type CartItem = {
//   productId: string;
//   productName: string;
//   sellerId: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
// };
// type Cart = {
//   userId: string;
//   items: CartItem[];
// };
// const dummyCart = {
//   userId: "user123",
//   items: [
//     {
//       productId: "p1",
//       productName: "Organic Olive Oil",
//       sellerId: "sellerA",
//       price: 250,
//       quantity: 2,
//       totalPrice: 500,
//     },
//     {
//       productId: "p2",
//       productName: "Raw Honey Jar",
//       sellerId: "sellerB",
//       price: 180,
//       quantity: 1,
//       totalPrice: 180,
//     },
//   ],
// };

// export default function CartPage() {
//   useProtectedRoute();
//   const [cart, setCart] = useState<Cart>(dummyCart);
//   const handleQuantityChange = (productId: string, delta: number) => {
//     const updatedItems = cart.items
//       .map((item) =>
//         item.productId === productId
//           ? {
//               ...item,
//               quantity: item.quantity + delta,
//               totalPrice: (item.quantity + delta) * item.price,
//             }
//           : item
//       )
//       .filter((item) => item.quantity > 0);

//     setCart({ ...cart, items: updatedItems });
//   };
//   const handleRemove = (productId: string) => {
//     setCart({
//       ...cart,
//       items: cart.items.filter((item) => item.productId !== productId),
//     });
//   };

//   const handleClearCart = () => {
//     setCart({ ...cart, items: [] });
//   };

//   const totalItems = useMemo(
//     () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
//     [cart.items]
//   );

//   const cartTotal = useMemo(
//     () => cart.items.reduce((sum, item) => sum + item.totalPrice, 0),
//     [cart.items]
//   );

//   // return (
//   //   <div className="min-h-screen bg-beige px-6 py-16">
//   //     <h1 className="text-4xl font-bold text-olive mb-8 text-center">
//   //       Your Cart
//   //     </h1>

//   //     <div className="max-w-3xl mx-auto space-y-6">
//   //       {cart.items.length === 0 ? (
//   //         <div className="text-center text-olive/70">No items in cart yet.</div>
//   //       ) : (
//   //         cart.items.map((item) => (
//   //           <CartItemCard key={item.productId} item={item} />
//   //         ))
//   //       )}

//   //       {cart.items.length > 0 && (
//   //         <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
//   //           <div className="flex justify-between mb-2 text-lg font-semibold text-olive">
//   //             <span>Total Items:</span>
//   //             <span>{totalItems}</span>
//   //           </div>
//   //           <div className="flex justify-between text-xl font-bold text-olive">
//   //             <span>Cart Total:</span>
//   //             <span>₹{cartTotal}</span>
//   //           </div>
//   //           <button className="mt-6 w-full bg-olive text-white py-3 rounded-xl font-semibold hover:bg-olive/90 transition">
//   //             Proceed to Checkout
//   //           </button>
//   //         </div>
//   //       )}
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="min-h-screen bg-beige px-6 py-16">
//       <h1 className="text-4xl font-bold text-olive mb-8 text-center">
//         Your Cart
//       </h1>

//       <div className="max-w-3xl mx-auto space-y-6">
//         {cart.items.length === 0 ? (
//           <div className="text-center text-olive/70">No items in cart yet.</div>
//         ) : (
//           cart.items.map((item) => (
//             <CartItemCard
//               key={item.productId}
//               item={item}
//               onQuantityChange={handleQuantityChange}
//               onRemove={handleRemove}
//             />
//           ))
//         )}

//         {cart.items.length > 0 && (
//           <div className="mt-8 bg-white p-6 rounded-2xl shadow-md space-y-4">
//             <div className="flex justify-between text-lg font-semibold text-olive">
//               <span>Total Items:</span>
//               <span>{totalItems}</span>
//             </div>
//             <div className="flex justify-between text-xl font-bold text-olive">
//               <span>Cart Total:</span>
//               <span>₹{cartTotal}</span>
//             </div>
//             <button className="w-full bg-olive text-white py-3 rounded-xl font-semibold hover:bg-olive/90 transition">
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClearCart}
//               className="w-full border border-olive text-olive py-2 rounded-xl font-semibold hover:bg-olive/10 transition"
//             >
//               Clear Cart
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// const handleCheckout = async () => {
//   try {
//     const res = await axios.post("/checkout", {}); // if needed, pass cartId
//     const { checkoutUrl } = res.data;

//     if (checkoutUrl) {
//       window.location.href = checkoutUrl; // Stripe Checkout redirect
//     } else {
//       toast.success("Order placed successfully");
//       router.push("/orders");
//     }
//   } catch {
//     toast.error("Checkout failed");
//   }
// };

//    <Button
//   className="mt-6 w-full bg-olive text-beige hover:bg-olive/90"
//   onClick={handleCheckout}
// >
//   Proceed to Checkout
// </Button>

"use client";

import { motion } from "framer-motion";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import EmptyState from "@/components/layouts/cartEmptyState";
import CartItemCard from "@/components/layouts/CartItemCard";
import CartSummary from "@/components/layouts/CartSummary";
import { useCart } from "@/hooks/useCart";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { CreateOrderDto, OrderItemDto } from "@/types/cart";

// interface CartItem {
//   id: string;
//   productId: string;
//   name: string;
//   imageUrl?: string;
//   price: number;
//   quantity: number;
// }

export default function CartPage() {
  useProtectedRoute(); // must be logged in
  const { items, total, loading, updateQuantity, removeItem } = useCart();
  // const [items, setItems] = useState<CartItem[]>([]);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleCheckout = async () => {
    try {
      const payload: CreateOrderDto = {
        items: items.map<OrderItemDto>((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const res = await axiosInstance.post("/order/create", payload);
      const { paymentUrl } = res.data;

      if (paymentUrl) {
        window.location.href = paymentUrl; // Stripe or similar
      } else {
        toast.success("Order placed successfully");
        router.push("/orders");
      }
    } catch {
      toast.error("Checkout failed");
    }
  };
  // const fetchCart = async () => {
  //   try {
  //     const res = await axiosInstance.get("/cart/index");
  //     setItems(res.data.items);
  //   } catch {
  //     toast.error("Failed to load cart");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCart();
  // }, []);

  // const updateQty = async (id: string, newQty: number) => {
  //   try {
  //     await axiosInstance.post("/cart/update", { id, quantity: newQty });
  //     toast.success("Quantity updated");
  //     fetchCart();
  //   } catch {
  //     toast.error("Failed to update");
  //   }
  // };

  // const removeItem = async (id: string) => {
  //   try {
  //     await axiosInstance.post("/cart/remove", { id });
  //     toast.success("Removed from cart");
  //     fetchCart();
  //   } catch {
  //     toast.error("Failed to remove");
  //   }
  // };
  // const clearCart = async () => {
  //   try {
  //     await axiosInstance.post("/cart/clear");
  //     setItems([]);
  //     toast.success("Cart cleared");
  //   } catch {
  //     toast.error("Failed to clear cart");
  //   }
  // };
  // const total = items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;
  if (!items.length) return <EmptyState />;

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* <div className="max-w-3xl mx-auto mt-10 p-4"> */}
      <h1 className="text-3xl font-bold mb-6 text-olive">🛒 Your Cart</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          // <li
          //   key={item.id}
          //   className="flex justify-between items-center border p-4 rounded-xl bg-white shadow-sm"
          // >
          //   <div className="flex items-center gap-4">
          //     <Image
          //       src={item.imageUrl || "/placeholder.png"}
          //       alt={item.name}
          //       width={60}
          //       height={60}
          //       className="rounded-lg object-cover"
          //     />
          //     <div>
          //       <h2 className="text-lg font-semibold text-olive mb-1">
          //         {item.name}
          //       </h2>
          //       <p className="text-sm text-olive/70">
          //         ₹{item.price} × {item.quantity} = ₹
          //         {item.price * item.quantity}
          //       </p>
          //     </div>
          //   </div>

          //   <div className="flex items-center gap-2">
          //     <Button
          //       size="icon"
          //       variant="ghost"
          //       onClick={() => updateQty(item.id, item.quantity - 1)}
          //     >
          //       <Minus className="w-4 h-4" />
          //     </Button>
          //     <span className="px-2 text-sm font-medium text-olive">
          //       {item.quantity}
          //     </span>
          //     <Button
          //       size="icon"
          //       variant="ghost"
          //       onClick={() => updateQty(item.id, item.quantity + 1)}
          //     >
          //       <Plus className="w-4 h-4" />
          //     </Button>
          //     <Button
          //       size="icon"
          //       variant="destructive"
          //       onClick={() => removeItem(item.id)}
          //     >
          //       <Trash2 className="w-4 h-4" />
          //     </Button>
          //   </div>
          // </li>
          <CartItemCard
            key={item.id}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>

      {/* <div className="mt-8 bg-white p-6 rounded-2xl shadow-md space-y-4">
        <div className="flex justify-between text-lg font-semibold text-olive">
          <span>Total Items:</span>
          <span>{items.reduce((sum, i) => sum + i.quantity, 0)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-olive">
          <span>Cart Total:</span>
          <span>₹{total}</span>
        </div>
        <Button className="w-full bg-olive text-beige hover:bg-olive/90">
          Proceed to Checkout
        </Button>
        <Button
          onClick={clearCart}
          variant="outline"
          className="w-full border-olive text-olive hover:bg-olive/10"
        >
          Clear Cart
        </Button>
      </div> */}
      <CartSummary total={total} onCheckout={handleCheckout} />
    </motion.div>
  );
}
