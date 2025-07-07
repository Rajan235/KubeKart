import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { CartItem } from "@/types/cart";

// export type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   imageUrl?: string;
// };

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart/index");
      setItems(res.data.items);
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await axiosInstance.post("/cart/update", { id, quantity });
      fetchCart();
      toast.success("Updated quantity");
    } catch {
      toast.error("Update failed");
    }
  };

  const removeItem = async (id: string) => {
    try {
      await axiosInstance.post("/cart/remove", { id });
      fetchCart();
      toast.success("Item removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    loading,
    total,
    updateQuantity,
    removeItem,
  };
}
