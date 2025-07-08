"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

import { motion } from "framer-motion";
import { SellerProduct } from "@/types/product";
import ProductForm from "@/components/ProductForm";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<SellerProduct | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/seller/${id}`);
        const data = res.data;

        setProduct(data);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleDelete = async (updatedData: SellerProduct) => {
    try {
      if (!updatedData.id) {
        toast.error("Missing product ID");
        return;
      }
      await axiosInstance.delete(`/product/admin/${updatedData.id}`);
      toast.success("Product deleted successfully");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-12 px-4 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-4">✏️ Delete Product</h1>

      {/* <div className="space-y-4">
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
      </div> */}
      <ProductForm initialData={product ?? undefined} onSubmit={handleDelete} />
      <Button
        className="w-full bg-olive text-beige"
        onClick={() => product?.id && handleDelete(product)}
      >
        Delete Product
      </Button>
    </motion.div>
  );
}
