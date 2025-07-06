// "use client";

// //import { OrderResponse } from "@/types/orders"; // optional: move type to shared folder
// import { format } from "date-fns";
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
// interface OrderCardProps {
//   order: OrderResponse;
// }

// export default function OrderCard({ order }: OrderCardProps) {
//   const deliveryDate = format(
//     new Date(order.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000),
//     "MMMM d, yyyy"
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold text-olive mb-1">
//             Order ID: {order.id}
//           </h2>
//           <p className="text-sm text-olive/60">
//             Placed on {format(order.createdAt, "MMMM d, yyyy")}
//           </p>
//         </div>
//         <span
//           className={`px-4 py-1 rounded-xl text-sm font-semibold ${
//             order.status === "COMPLETED"
//               ? "bg-green-100 text-green-700"
//               : order.status === "CANCELLED"
//               ? "bg-red-100 text-red-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {order.status}
//         </span>
//       </div>

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

//       <div className="text-right font-bold text-olive text-lg mt-2">
//         Total: ₹
//         {order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0)}
//       </div>

//       {/* Order Tracking and Delivery */}
//       {order.status === "COMPLETED" && (
//         <div className="mt-2 text-sm text-olive/70">
//           Delivered on:{" "}
//           <span className="font-semibold text-olive">{deliveryDate}</span>
//         </div>
//       )}
//       {order.status === "CREATED" || order.status === "PENDING" ? (
//         <div className="mt-2 text-sm text-yellow-700 font-medium">
//           Estimated delivery: {deliveryDate}
//         </div>
//       ) : null}

//       {/* Action Buttons */}
//       <div className="mt-4 flex justify-end gap-4">
//         <button className="bg-olive text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-olive/90 transition">
//           Reorder
//         </button>
//         <button className="border border-olive text-olive px-4 py-2 rounded-xl text-sm font-medium hover:bg-olive/10 transition">
//           Download Invoice
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { format } from "date-fns";

type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  orderId: string;
  sellerId: string;
};

type Order = {
  id: string;
  userId: string;
  status: string;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  orderItems: OrderItem[];
};

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const deliveryDate = format(
    new Date(order.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days after createdAt
    "dd MMM yyyy"
  );

  const totalPrice = order.orderItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const statusColorMap: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-olive mb-1">
            Order ID: {order.id}
          </h2>
          <p className="text-sm text-olive/60">
            Placed on {format(order.createdAt, "dd MMM yyyy")}
          </p>
          <p className="text-sm text-olive/50">Est. Delivery: {deliveryDate}</p>
        </div>
        <span
          className={`px-4 py-1 rounded-xl text-sm font-semibold ${
            statusColorMap[order.status] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-olive/10">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex justify-between py-4 items-center">
            <div>
              <p className="font-medium text-olive">{item.productName}</p>
              <p className="text-sm text-olive/60">
                ₹{item.productPrice} × {item.quantity}
              </p>
              <p className="text-sm text-olive/50">Seller: {item.sellerId}</p>
            </div>
            <div className="text-right font-bold text-olive">
              ₹{item.totalPrice}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-right font-bold text-olive text-lg mt-2">
        Total: ₹{totalPrice}
      </div>

      {/* Action buttons */}
      {/* <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
        <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition">
          Reorder
        </button>
        <button className="px-4 py-2 border border-olive text-olive rounded-xl font-semibold hover:bg-olive/10 transition">
          Download Invoice
        </button>
      </div> */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 flex-wrap">
        {order.status === "PENDING" && (
          <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition">
            Track Order
          </button>
        )}

        {order.status === "PENDING" && (
          <button className="px-4 py-2 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition">
            Cancel Order
          </button>
        )}

        {order.status === "COMPLETED" && (
          <>
            <button className="px-4 py-2 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition">
              Reorder
            </button>
            <button className="px-4 py-2 border border-olive text-olive rounded-xl font-semibold hover:bg-olive/10 transition">
              Download Invoice
            </button>
          </>
        )}
      </div>
    </div>
  );
}
