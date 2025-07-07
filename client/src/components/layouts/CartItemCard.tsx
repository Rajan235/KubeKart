// "use client";

// import React from "react";

// type CartItem = {
//   productId: string;
//   productName: string;
//   sellerId: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
// };

// interface CartItemCardProps {
//   item: CartItem;
// }

// const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
//       <div>
//         <h2 className="text-lg font-semibold text-olive">{item.productName}</h2>
//         <p className="text-sm text-olive/60">Seller: {item.sellerId}</p>
//         <p className="mt-1 text-sm text-olive/70">
//           ₹{item.price} × {item.quantity}
//         </p>
//       </div>
//       <div className="text-right">
//         <p className="text-lg font-bold text-olive">₹{item.totalPrice}</p>
//       </div>
//     </div>
//   );
// };

// export default CartItemCard;
// "use client";

// type CartItem = {
//   productId: string;
//   productName: string;
//   sellerId: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
// };

// interface Props {
//   item: CartItem;
//   onQuantityChange: (productId: string, delta: number) => void;
//   onRemove: (productId: string) => void;
// }

// export default function CartItemCard({
//   item,
//   onQuantityChange,
//   onRemove,
// }: Props) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
//       <div>
//         <h2 className="text-lg font-semibold text-olive">{item.productName}</h2>
//         <p className="text-sm text-olive/60">Seller: {item.sellerId}</p>
//         <p className="mt-1 text-sm text-olive/70">
//           ₹{item.price} × {item.quantity}
//         </p>
//         <div className="mt-2 flex items-center gap-2">
//           <button
//             onClick={() => onQuantityChange(item.productId, -1)}
//             className="px-3 py-1 bg-olive text-white rounded hover:bg-olive/90"
//           >
//             −
//           </button>
//           <span className="px-2">{item.quantity}</span>
//           <button
//             onClick={() => onQuantityChange(item.productId, 1)}
//             className="px-3 py-1 bg-olive text-white rounded hover:bg-olive/90"
//           >
//             +
//           </button>
//           <button
//             onClick={() => onRemove(item.productId)}
//             className="ml-4 text-sm text-red-600 hover:underline"
//           >
//             Remove
//           </button>
//         </div>
//       </div>

//       <div className="text-right">
//         <p className="text-lg font-bold text-olive">₹{item.totalPrice}</p>
//       </div>
//     </div>
//   );
// }

// function CartItemCard({ item }: { item: CartItem }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
//       <div>
//         <h2 className="text-lg font-semibold text-olive">{item.productName}</h2>
//         <p className="text-sm text-olive/60">Seller: {item.sellerId}</p>
//         <p className="mt-1 text-sm text-olive/70">
//           ₹{item.price} × {item.quantity}
//         </p>
//       </div>
//       <div className="text-right">
//         <p className="text-lg font-bold text-olive">₹{item.totalPrice}</p>
//       </div>
//     </div>
//   );
// }

// export default CartItemCard;
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  };
  onQuantityChange: (id: string, newQty: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: Props) {
  return (
    <li className="flex justify-between items-center border p-4 rounded bg-white shadow-sm">
      <div className="flex items-center gap-4">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={60}
            height={60}
            className="rounded"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p>
            ₹{item.price} x {item.quantity}
          </p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.id, Number(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
        />
        <Button variant="destructive" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
    </li>
  );
}
