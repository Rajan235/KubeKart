"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

import { motion } from "framer-motion";

import { OrderStatus, SellerOrder } from "@/types/order";
import SellerOrderCard from "@/components/layouts/SellerOrderCard";

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PAID",
  "CANCELLED",
  "COMPLETED",
  "DELIVERED",
  "SHIPPED",
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/seller/index");
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    try {
      await axiosInstance.post("/order/seller/update", {
        id: itemId,
        status: newStatus,
      });
      toast.success("Status updated");
      fetchOrders();
    } catch {
      toast.error("Failed to update status");
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
    <motion.div
      className="max-w-5xl mx-auto mt-10 px-4 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-olive">📦 Seller Orders</h1>

      {orders.map((order) => (
        <SellerOrderCard
          key={order.orderId}
          order={order}
          handleStatusChange={handleStatusChange}
          statusOptions={STATUS_OPTIONS}
        />
      ))}
    </motion.div>
  );
}
