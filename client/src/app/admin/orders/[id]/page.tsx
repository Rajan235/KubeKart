"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { AdminOrderDetail } from "@/types/order";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const statusOptions = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<AdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/order/admin/${id}`);
        setOrder(res.data);
        setStatus(res.data.status);
      } catch {
        toast.error("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const updateStatus = async () => {
    try {
      setUpdating(true);
      await axiosInstance.patch(`/order/admin/${id}`, { status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!order) return <div className="text-center mt-10">Order not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-olive">🧾 Order #{order.id}</h1>
      <div className="bg-white p-4 rounded-xl shadow">
        <p>User ID: {order.userId}</p>
        <p>Total: ₹{order.totalPrice}</p>
        <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">🛍 Items</h2>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="text-sm">
              {item.name} × {item.quantity} @ ₹{item.price} = ₹
              {item.quantity * item.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <label className="block font-semibold text-olive">Update Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <Button
          className="w-full mt-2 bg-olive text-beige hover:bg-olive/90"
          onClick={updateStatus}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}
