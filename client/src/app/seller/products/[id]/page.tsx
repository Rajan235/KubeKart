"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

import { motion } from "framer-motion";
import { Product, ProductFormData } from "@/types/product";
import ProductForm from "@/components/ProductForm";
import Loading from "@/components/utility-component/Loading";
import EmptyState from "@/components/layouts/EmptyState";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

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

  const handleSubmit = async (updatedData: ProductFormData) => {
    try {
      if (!updatedData.id) {
        toast.error("Missing product ID");
        return;
      }
      await axiosInstance.put(`/product/seller/${updatedData.id}`, updatedData);
      toast.success("Product updated successfully");
      router.push("/seller/products");
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (loading) return <Loading message="Loading product..." />;
  if (!product) {
    return (
      <div className="flex flex-col py-20">
        <main className="flex-1 flex items-center justify-center">
          <EmptyState
            title="Product Not Available"
            description="Please check back later or contact support."
          />
        </main>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-12 px-4 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-4">Edit Product</h1>

      <ProductForm initialData={product ?? undefined} onSubmit={handleSubmit} />
    </motion.div>
  );
}
