// // "use client";

// // //import { OrderResponse } from "@/types/orders"; // optional: move type to shared folder
// // import { format } from "date-fns";
// // type OrderItemResponse = {
// //   id: string;
// //   productId: string;
// //   productName: string;
// //   productPrice: number;
// //   quantity: number;
// //   totalPrice: number;
// //   createdAt: Date;
// //   updatedAt: Date;
// //   version: number;
// //   orderId: string;
// //   sellerId: string;
// // };

// // type OrderResponse = {
// //   id: string;
// //   userId: string;
// //   status: string;
// //   expiresAt: Date | null;
// //   createdAt: Date;
// //   updatedAt: Date;
// //   version: number;
// //   orderItems: OrderItemResponse[];
// // };
// // interface OrderCardProps {
// //   order: OrderResponse;
// // }

// // export default function OrderCard({ order }: OrderCardProps) {
// //   const deliveryDate = format(
// //     new Date(order.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000),
// //     "MMMM d, yyyy"
// //   );

// //   return (
// //     <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h2 className="text-xl font-semibold text-olive mb-1">
// //             Order ID: {order.id}
// //           </h2>
// //           <p className="text-sm text-olive/60">
// //             Placed on {format(order.createdAt, "MMMM d, yyyy")}
// //           </p>
// //         </div>
// //         <span
// //           className={`px-4 py-1 rounded-xl text-sm font-semibold ${
// //             order.status === "COMPLETED"
// //               ? "bg-green-100 text-green-700"
// //               : order.status === "CANCELLED"
// //               ? "bg-red-100 text-red-700"
// //               : "bg-yellow-100 text-yellow-700"
// //           }`}
// //         >
// //           {order.status}
// //         </span>
// //       </div>

// //       <div className="divide-y divide-olive/10">
// //         {order.orderItems.map((item) => (
// //           <div key={item.id} className="flex justify-between py-4 items-center">
// //             <div>
// //               <p className="font-medium text-olive">{item.productName}</p>
// //               <p className="text-sm text-olive/60">
// //                 ₹{item.productPrice} × {item.quantity}
// //               </p>
// //               <p className="text-sm text-olive/50">Seller: {item.sellerId}</p>
// //             </div>
// //             <div className="text-right font-bold text-olive">
// //               ₹{item.totalPrice}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="text-right font-bold text-olive text-lg mt-2">
// //         Total: ₹
// //         {order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0)}
// //       </div>

// //       {/* Order Tracking and Delivery */}
// //       {order.status === "COMPLETED" && (
// //         <div className="mt-2 text-sm text-olive/70">
// //           Delivered on:{" "}
// //           <span className="font-semibold text-olive">{deliveryDate}</span>
// //         </div>
// //       )}
// //       {order.status === "CREATED" || order.status === "PENDING" ? (
// //         <div className="mt-2 text-sm text-yellow-700 font-medium">
// //           Estimated delivery: {deliveryDate}
// //         </div>
// //       ) : null}

// //       {/* Action Buttons */}
// //       <div className="mt-4 flex justify-end gap-4">
// //         <button className="bg-olive text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-olive/90 transition">
// //           Reorder
// //         </button>
// //         <button className="border border-olive text-olive px-4 py-2 rounded-xl text-sm font-medium hover:bg-olive/10 transition">
// //           Download Invoice
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { format } from "date-fns";

// type OrderItem = {
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

// type Order = {
//   id: string;
//   userId: string;
//   status: string;
//   expiresAt: Date | null;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number;
//   orderItems: OrderItem[];
// };

// interface Props {
//   order: Order;
// }

// export default function OrderCard({ order }: Props) {
//   const deliveryDate = format(
//     new Date(order.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days after createdAt
//     "dd MMM yyyy"
//   );

//   const totalPrice = order.orderItems.reduce(
//     (sum, item) => sum + item.totalPrice,
//     0
//   );

//   const statusColorMap: Record<string, string> = {
//     COMPLETED: "bg-green-100 text-green-700",
//     CANCELLED: "bg-red-100 text-red-700",
//     PENDING: "bg-yellow-100 text-yellow-700",
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold text-olive mb-1">
//             Order ID: {order.id}
//           </h2>
//           <p className="text-sm text-olive/60">
//             Placed on {format(order.createdAt, "dd MMM yyyy")}
//           </p>
//           <p className="text-sm text-olive/50">Est. Delivery: {deliveryDate}</p>
//         </div>
//         <span
//           className={`px-4 py-1 rounded-xl text-sm font-semibold ${
//             statusColorMap[order.status] ?? "bg-gray-100 text-gray-700"
//           }`}
//         >
//           {order.status}
//         </span>
//       </div>

//       {/* Items */}
//       <div className="divide-y divide-olive/10">
//         {order.orderItems.map((item) => (
//           <div key={item.id} className="flex justify-between py-4 items-center">
//             <div>
//               <p className="font-medium text-olive">{item.productName}</p>
//               <p className="text-sm text-olive/60">
//                 ₹{item.productPrice} × {item.quantity}
//               </p>
//               <p className="text-sm text-olive/50">Seller: {item.sellerId}</p>
//             </div>
//             <div className="text-right font-bold text-olive">
//               ₹{item.totalPrice}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Total */}
//       <div className="text-right font-bold text-olive text-lg mt-2">
//         Total: ₹{totalPrice}
//       </div>

//       {/* Action buttons */}
//       {/* <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
//         <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition">
//           Reorder
//         </button>
//         <button className="px-4 py-2 border border-olive text-olive rounded-xl font-semibold hover:bg-olive/10 transition">
//           Download Invoice
//         </button>
//       </div> */}
//       <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 flex-wrap">
//         {order.status === "PENDING" && (
//           <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition">
//             Track Order
//           </button>
//         )}

//         {order.status === "PENDING" && (
//           <button className="px-4 py-2 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition">
//             Cancel Order
//           </button>
//         )}

//         {order.status === "COMPLETED" && (
//           <>
//             <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition">
//               Reorder
//             </button>
//             <button className="px-4 py-2 border border-olive text-olive rounded-xl font-semibold hover:bg-olive/10 transition">
//               Download Invoice
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// /components/layouts/OrderCard.tsx
"use client";
import { Order } from "@/types/order";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import { jsPDF } from "jspdf";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, X, Download, Repeat } from "lucide-react";
type Props = {
  order: Order;
  onCancel?: (orderId: string) => void;
};
export default function OrderCard({ order, onCancel }: Props) {
  const statusColorMap: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };
  const deliveryDate = format(
    new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000),
    "dd MMM yyyy"
  );
  const [reorderLoading, setReorderLoading] = useState(false);
  const handleReorder = async () => {
    try {
      setReorderLoading(true);
      await Promise.all(
        order.items.map((item) =>
          axiosInstance.post("/api/cart/add", {
            productId: item.productId,
            quantity: item.quantity,
          })
        )
      );
      toast.success("Items added to cart!");
    } catch (err) {
      toast.error("Some items couldn't be added.");
      console.error(err);
    } finally {
      setReorderLoading(false);
    }
  };
  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("LevoMart Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(
      `Date: ${format(new Date(order.createdAt), "dd MMM yyyy")}`,
      20,
      45
    );

    let y = 60;
    order.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - ₹${item.price} × ${item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Total: ₹${order.totalPrice}`, 20, y + 10);

    doc.save(`invoice-${order.id}.pdf`);
  };
  // return (
  //   <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
  //     {/* Header */}
  //     <div className="flex justify-between items-center">
  //       <Link href={`/orders/${order.id}`} className="block hover:underline">
  //         <div>
  //           <h2 className="text-xl font-semibold text-olive mb-1">
  //             Order ID: {order.id}
  //           </h2>
  //           <p className="text-sm text-olive/60">
  //             Placed on {format(new Date(order.createdAt), "dd MMM yyyy")}
  //           </p>
  //           <p className="text-sm text-olive/50">
  //             Est. Delivery: {deliveryDate}
  //           </p>
  //         </div>
  //       </Link>
  //       <span
  //         className={`px-4 py-1 rounded-xl text-sm font-semibold ${
  //           statusColorMap[order.status] || "bg-gray-100 text-gray-700"
  //         }`}
  //       >
  //         {order.status}
  //       </span>
  //     </div>

  //     {/* Items */}
  //     <div className="divide-y divide-olive/10">
  //       {order.items.map((item) => (
  //         <div
  //           key={item.productId}
  //           className="flex justify-between py-4 items-center"
  //         >
  //           <div>
  //             <p className="font-medium text-olive">{item.name}</p>
  //             <p className="text-sm text-olive/60">
  //               ₹{item.price} × {item.quantity}
  //             </p>
  //           </div>
  //           <div className="text-right font-bold text-olive">
  //             ₹{item.price * item.quantity}
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Total */}
  //     <div className="text-right font-bold text-olive text-lg mt-2">
  //       Total: ₹{order.totalPrice}
  //     </div>

  //     {/* Action Buttons */}
  //     <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 flex-wrap">
  //       {order.status === "PENDING" && (
  //         <>
  //           {/* <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition"> */}
  //           <button
  //             className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 focus:outline-none focus:ring-2 focus:ring-olive/60 transition"
  //             onClick={() => {
  //               toast.info(`Tracking order ${order.id}... 🚚`);
  //             }}
  //           >
  //             Track Order
  //           </button>
  //           <button
  //             className="px-4 py-2 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
  //             onClick={() => {
  //               if (onCancel) onCancel(order.id);
  //               toast.success("Order cancelled successfully!");
  //             }}
  //           >
  //             Cancel Order
  //           </button>
  //         </>
  //       )}

  //       {order.status === "COMPLETED" && (
  //         <>
  //           <button
  //             onClick={handleReorder}
  //             disabled={reorderLoading}
  //             className={`px-4 py-2 bg-olive text-white rounded-xl font-semibold transition ${
  //               reorderLoading
  //                 ? "opacity-50 cursor-not-allowed"
  //                 : "hover:bg-olive/90"
  //             }`}
  //           >
  //             Reorder
  //           </button>
  //           <button
  //             onClick={downloadInvoice}
  //             className="px-4 py-2 border border-olive text-olive rounded-xl font-semibold hover:bg-olive/10 transition"
  //           >
  //             Download Invoice
  //           </button>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-6 space-y-4"
    >
      <div className="flex justify-between items-center">
        <Link href={`/orders/${order.id}`} className="block hover:underline">
          <div>
            <h2 className="text-xl font-semibold text-olive mb-1">
              Order ID: {order.id}
            </h2>
            <p className="text-sm text-olive/60">
              Placed on {format(new Date(order.createdAt), "dd MMM yyyy")}
            </p>
            <p className="text-sm text-olive/50">
              Est. Delivery: {deliveryDate}
            </p>
          </div>
        </Link>
        <span
          className={`px-4 py-1 rounded-xl text-sm font-semibold ${
            statusColorMap[order.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="divide-y divide-olive/10">
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between py-4 items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={`/images/products/${item.productId}.jpg`}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/placeholder.jpg";
                }}
              />
              <div>
                <p className="font-medium text-olive">{item.name}</p>
                <p className="text-sm text-olive/60">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right font-bold text-olive">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-olive text-lg mt-2">
        Total: ₹{order.totalPrice}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 flex-wrap">
        {order.status === "PENDING" && (
          <>
            <button
              className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 focus:outline-none focus:ring-2 focus:ring-olive/60 transition inline-flex items-center gap-2"
              onClick={() => {
                toast.info(`Tracking order ${order.id}... 🚚`);
              }}
            >
              <Truck size={16} /> Track Order
            </button>
            <button
              className="px-4 py-2 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition inline-flex items-center gap-2"
              onClick={() => {
                if (onCancel) onCancel(order.id);
                toast.success("Order cancelled successfully!");
              }}
            >
              <X size={16} /> Cancel Order
            </button>
          </>
        )}

        {order.status === "COMPLETED" && (
          <>
            <button
              onClick={handleReorder}
              disabled={reorderLoading}
              className={`px-4 py-2 bg-olive text-white rounded-xl font-semibold transition inline-flex items-center gap-2 ${
                reorderLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-olive/90"
              }`}
            >
              <Repeat size={16} /> Reorder
            </button>
            <button
              onClick={downloadInvoice}
              className="px-4 py-2 border border-olive text-olive rounded-xl font-semibold hover:bg-olive/10 transition inline-flex items-center gap-2"
            >
              <Download size={16} /> Download Invoice
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
