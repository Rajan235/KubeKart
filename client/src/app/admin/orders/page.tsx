// "use client";

// import { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";
// import { AdminOrder } from "@/types/order";
// import { toast } from "sonner";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<AdminOrder[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get("/order/admin");
//         setOrders(res.data);
//       } catch {
//         toast.error("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading)
//     return <div className="text-center mt-10">Loading orders...</div>;

//   if (!orders.length)
//     return <div className="text-center mt-10">No orders found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-4">
//       <h1 className="text-2xl font-bold text-olive mb-6">📦 All Orders</h1>

//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li
//             key={order.id}
//             className="border p-4 rounded-lg bg-white shadow-sm flex justify-between items-center"
//           >
//             <div>
//               <p className="text-lg font-semibold text-olive">
//                 Order #{order.id}
//               </p>
//               <p className="text-sm text-olive/70">
//                 User: {order.userId} • ₹{order.totalPrice} •{" "}
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//               <p className="text-sm mt-1">
//                 Status: <span className="font-medium">{order.status}</span>
//               </p>
//             </div>

//             <div className="flex gap-2">
//               <Link href={`/admin/orders/${order.id}`}>
//                 <Button variant="outline">View</Button>
//               </Link>
//               {/* optional future: <Button variant="destructive">Delete</Button> */}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminOrder } from "@/types/order";
import { formatDateTime } from "@/lib/date-utils"; // optional util

export default function AdminOrderListPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/admin/all");
      setOrders(res.data);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await axiosInstance.delete(`/order/admin/${id}`);
      toast.success("Order deleted");
      setOrders(orders.filter((o) => o.id !== id));
    } catch {
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading orders...</div>;
  if (!orders.length)
    return <div className="text-center mt-10">No orders found</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-olive mb-6">📦 All Orders</h1>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-olive">
                Order #{order.id}
              </h2>
              <p className="text-sm text-gray-600">
                Buyer: {order.buyerId} | Seller: {order.sellerId}
              </p>
              <p className="text-sm text-gray-600">
                ₹{order.totalAmount} | Status: {order.status}
              </p>
              <p className="text-xs text-gray-500">
                {formatDateTime(order.createdAt)}
              </p>
            </div>
            <Button variant="destructive" onClick={() => deleteOrder(order.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
