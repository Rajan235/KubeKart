"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      setProduct(res.data);
    } catch {
      toast.error("Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await axiosInstance.post("/cart/add", {
        productId: product?.id,
        quantity: 1,
      });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (loading)
    return <div className="mt-10 text-center">Loading product...</div>;
  if (!product)
    return <div className="mt-10 text-center">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />
      )}
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-olive mt-2">₹{product.price}</p>
      <p className="mt-4 text-gray-700">{product.description}</p>

      <Button
        onClick={addToCart}
        className="mt-6 bg-olive text-beige hover:bg-olive/90"
      >
        Add to Cart
      </Button>
    </div>
  );
}
