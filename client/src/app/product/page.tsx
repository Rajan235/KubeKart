// sample products
"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import ProductCard from "@/components/layouts/ProductCard";
import { AxiosError } from "axios";
import { Product } from "@/types/product";
import { AddToCartDto } from "@/types/cart";

export default function ProductsPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    axiosInstance
      .get("/product/user")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(
          "❌ Failed product list request:",
          err?.response?.data || err.message
        );
        toast.error("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (payload: AddToCartDto) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add to cart");
      return;
    }
    // const payload: AddToCartDto = {
    //   productId,
    //   quantity,
    //   productName,
    //   productPrice,
    //   sellerId,
    // };

    try {
      await axiosInstance.post("/cart/add", payload);
      toast.success("Added to cart!");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding to cart");
    }
  };

  const handleQuantityChange = (productId: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-beige rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onQuantityChange={(qty) => handleQuantityChange(product.id, qty)}
            onAddToCart={() =>
              addToCart({
                productId: product.id,
                quantity: getQuantity(product.id),
                productName: product.name,
                productPrice: product.price,
                sellerId: product.userId,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
