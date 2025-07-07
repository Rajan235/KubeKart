"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

interface SellerOrderItem {
  itemId: string;
  productId: string;
  productName: string;
  quantity: number;
  status: string;
}

interface SellerOrder {
  orderId: string;
  buyerName: string;
  items: SellerOrderItem[];
}

const STATUS_OPTIONS = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/seller");
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    try {
      await axiosInstance.post("/order/update-status", {
        itemId,
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
        <Card
          key={order.orderId}
          className="bg-white border rounded-2xl shadow-md"
        >
          <CardContent className="p-6 space-y-4">
            <div className="font-semibold text-lg text-olive">
              Order ID: {order.orderId}
            </div>
            <div className="text-sm text-olive/70">
              Buyer: {order.buyerName}
            </div>

            {order.items.map((item) => (
              <div
                key={item.itemId}
                className="border-t pt-4 mt-4 flex justify-between items-center"
              >
                <div>
                  <div className="text-olive font-medium">
                    {item.productName}
                  </div>
                  <div className="text-sm text-olive/60">
                    Quantity: {item.quantity}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-sm">Status</Label>
                  <Select
                    value={item.status}
                    onValueChange={(val) =>
                      handleStatusChange(item.itemId, val)
                    }
                  >
                    <SelectTrigger className="w-[120px] text-olive border-olive">
                      {item.status}
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
