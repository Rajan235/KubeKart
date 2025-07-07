// "use client";

// import OrderCard from "@/components/layouts/OrderCard";
// import axiosInstance from "@/lib/axios";
// import { useProtectedRoute } from "@/lib/useProtectedRoute";
// import { useEffect, useState } from "react";

// type OrderItemResponse = {
//   id: string;
//   productId: string;
//   productName: string;
//   productPrice: number;
//   quantity: number;
//   totalPrice: number;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number;
//   orderId: string;
//   sellerId: string;
// };

// type OrderResponse = {
//   id: string;
//   userId: string;
//   status: string;
//   expiresAt: Date | null;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number;
//   orderItems: OrderItemResponse[];
// };
// const dummyOrders: OrderResponse[] = [
//   {
//     id: "order1",
//     userId: "user123",
//     status: "COMPLETED",
//     expiresAt: null,
//     createdAt: new Date("2025-06-15"),
//     updatedAt: new Date("2025-06-16"),
//     version: 1,
//     orderItems: [
//       {
//         id: "oi1",
//         orderId: "order1",
//         productId: "p1",
//         productName: "Organic Olive Oil",
//         productPrice: 250,
//         quantity: 2,
//         totalPrice: 500,
//         createdAt: new Date("2025-06-15"),
//         updatedAt: new Date("2025-06-16"),
//         version: 1,
//         sellerId: "sellerA",
//       },
//       {
//         id: "oi2",
//         orderId: "order1",
//         productId: "p2",
//         productName: "Raw Honey Jar",
//         productPrice: 180,
//         quantity: 1,
//         totalPrice: 180,
//         createdAt: new Date("2025-06-15"),
//         updatedAt: new Date("2025-06-16"),
//         version: 1,
//         sellerId: "sellerB",
//       },
//     ],
//   },
//   {
//     id: "order2",
//     userId: "user123",
//     status: "CANCELLED",
//     expiresAt: null,
//     createdAt: new Date("2025-06-10"),
//     updatedAt: new Date("2025-06-11"),
//     version: 1,
//     orderItems: [
//       {
//         id: "oi3",
//         orderId: "order2",
//         productId: "p3",
//         productName: "Fresh Almonds",
//         productPrice: 300,
//         quantity: 1,
//         totalPrice: 300,
//         createdAt: new Date("2025-06-10"),
//         updatedAt: new Date("2025-06-11"),
//         version: 1,
//         sellerId: "sellerC",
//       },
//     ],
//   },
// ];
// export default function OrdersPage() {
//   const [orders] = useState<OrderResponse[]>(dummyOrders);
// return (
//   <div className="min-h-screen bg-beige px-6 py-16">
//     <h1 className="text-4xl font-bold text-olive mb-8 text-center">
//       My Orders
//     </h1>
//     {/* TODO: Render past orders here */}
//     <div className="text-center text-olive/70">No orders placed yet.</div>
//   </div>
// );
// return (
//   <div className="min-h-screen bg-beige px-6 py-16">
//     <h1 className="text-4xl font-bold text-olive mb-8 text-center">
//       My Orders
//     </h1>

//     <div className="max-w-4xl mx-auto space-y-8">
//       {orders.length === 0 ? (
//         <div className="text-center text-olive/70">No orders placed yet.</div>
//       ) : (
//         orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-white rounded-2xl shadow-md p-6 space-y-4"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-semibold text-olive mb-1">
//                   Order ID: {order.id}
//                 </h2>
//                 <p className="text-sm text-olive/60">
//                   Placed on {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <span
//                 className={`px-4 py-1 rounded-xl text-sm font-semibold ${
//                   order.status === "COMPLETED"
//                     ? "bg-green-100 text-green-700"
//                     : order.status === "CANCELLED"
//                     ? "bg-red-100 text-red-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </div>

//             <div className="divide-y divide-olive/10">
//               {order.orderItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between py-4 items-center"
//                 >
//                   <div>
//                     <p className="font-medium text-olive">
//                       {item.productName}
//                     </p>
//                     <p className="text-sm text-olive/60">
//                       ₹{item.productPrice} × {item.quantity}
//                     </p>
//                     <p className="text-sm text-olive/50">
//                       Seller: {item.sellerId}
//                     </p>
//                   </div>
//                   <div className="text-right font-bold text-olive">
//                     ₹{item.totalPrice}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="text-right font-bold text-olive text-lg mt-2">
//               Total: ₹
//               {order.orderItems.reduce(
//                 (sum, item) => sum + item.totalPrice,
//                 0
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );
// return (
//   <div className="min-h-screen bg-beige px-6 py-16">
//     <h1 className="text-4xl font-bold text-olive mb-8 text-center">
//       My Orders
//     </h1>
//     <div className="max-w-4xl mx-auto space-y-8">
//       {orders.length === 0 ? (
//         <div className="text-center text-olive/70">No orders placed yet.</div>
//       ) : (
//         orders.map((order) => <OrderCard key={order.id} order={order} />)
//       )}
//     </div>
//   </div>
// );
//   return (
//     <div className="min-h-screen bg-beige px-6 py-16">
//       <h1 className="text-4xl font-bold text-olive mb-8 text-center">
//         My Orders
//       </h1>
//       <div className="max-w-4xl mx-auto space-y-8">
//         {orders.length === 0 ? (
//           <div className="text-center text-olive/70">No orders placed yet.</div>
//         ) : (
//           orders.map((order) => <OrderCard key={order.id} order={order} />)
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import OrderCard from "@/components/layouts/OrderCard";
import axiosInstance from "@/lib/axios";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { Order } from "@/types/order";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrdersPage() {
  useProtectedRoute(); // must be logged in

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/orders/index")
      .then((res) => setOrders(res.data))
      .catch(() => toast.error("Failed to fetch orders"))
      .finally(() => setLoading(false));
  }, []);
  const cancelOrder = async (orderId: string) => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
      toast.success("Order cancelled");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
      );
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-olive/70">Loading orders...</div>
    );

  if (!orders.length)
    return (
      <div className="text-center mt-10 text-olive/70">No orders found</div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-olive">📦 Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onCancel={cancelOrder} />
        ))}
      </div>
    </div>
  );
}
