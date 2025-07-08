import { ShoppingCart } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-20 text-olive/70">
      <ShoppingCart size={40} className="mx-auto mb-4" />
      <p className="text-lg">Your cart is empty</p>
      <p className="text-sm mt-2">Start adding some amazing products!</p>
    </div>
  );
}
