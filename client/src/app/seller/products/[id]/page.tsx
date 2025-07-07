"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        const data = res.data;
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
        });
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/product/${id}`, form);
      toast.success("Product updated successfully");
      router.push("/seller/products");
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-12 px-4 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-4">✏️ Edit Product</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <Button className="w-full bg-olive text-beige" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
}
