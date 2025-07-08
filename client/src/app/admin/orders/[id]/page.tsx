// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import { AdminOrderDetail } from "@/types/order";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";

// const statusOptions = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

// export default function AdminOrderDetailPage() {
//   const { id } = useParams();
//   const [order, setOrder] = useState<AdminOrderDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axiosInstance.get(`/order/admin/${id}`);
//         setOrder(res.data);
//         setStatus(res.data.status);
//       } catch {
//         toast.error("Failed to fetch order");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   const updateStatus = async () => {
//     try {
//       setUpdating(true);
//       await axiosInstance.patch(`/order/admin/${id}`, { status });
//       toast.success("Status updated");
//     } catch {
//       toast.error("Failed to update status");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!order) return <div className="text-center mt-10">Order not found</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 px-4 space-y-6">
//       <h1 className="text-2xl font-bold text-olive">🧾 Order #{order.id}</h1>
//       <div className="bg-white p-4 rounded-xl shadow">
//         <p>User ID: {order.userId}</p>
//         <p>Total: ₹{order.totalPrice}</p>
//         <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow">
//         <h2 className="text-lg font-semibold mb-2">🛍 Items</h2>
//         <ul className="space-y-2">
//           {order.items.map((item, index) => (
//             <li key={index} className="text-sm">
//               {item.name} × {item.quantity} @ ₹{item.price} = ₹
//               {item.quantity * item.price}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow space-y-2">
//         <label className="block font-semibold text-olive">Update Status</label>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         >
//           {statusOptions.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//         <Button
//           className="w-full mt-2 bg-olive text-beige hover:bg-olive/90"
//           onClick={updateStatus}
//           disabled={updating}
//         >
//           {updating ? "Updating..." : "Update Status"}
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { SellerOrder } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminOrderDetailsPage() {
  const id = useParams();
  const [order, setOrder] = useState<SellerOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get(`/order/seller/${id}`);
      setOrder(res.data); // assuming backend returns { order: {...} }
    } catch {
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!order) return <div className="text-center mt-10">Order not found</div>;

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-6">
        📄 Order Details: {order.orderId}
      </h1>

      <Card className="bg-white shadow-sm rounded-xl">
        <CardContent className="p-6 space-y-4">
          <div>
            <span className="font-medium text-olive">Buyer:</span>{" "}
            {order.buyerName}
          </div>
          {/* <div>
            <span className="font-medium text-olive">Created At:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div> */}

          <div className="border-t pt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.itemId}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <div className="font-medium text-olive">
                    {item.productName}
                  </div>
                  <div className="text-sm text-olive/70">
                    Quantity: {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-olive font-semibold">₹{item.price}</div>
                  <div className="text-sm text-olive/60">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
