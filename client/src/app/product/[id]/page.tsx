"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import Logo from "@/components/layouts/Logo";
import { AddToCartDto } from "@/types/cart";

export default function ProductPage() {
  const id = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // const fetchProduct = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/product/${id}`);
  //     setProduct(res.data);
  //   } catch {
  //     toast.error("Product not found");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (id) fetchProduct();
  // }, [id]);
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setProduct(res.data);
      } catch {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    const payload: AddToCartDto = {
      productId: product.id,
      quantity: 1,
      productName: product.name,
      productPrice: product.price,
      sellerId: product.userId,
    };
    try {
      await axiosInstance.post("/cart/add", {
        payload,
      });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    // return <div className="mt-10 text-center">Loading product...</div>;
    return (
      <div className="w-full bg-beige/90 backdrop-blur-md border-b border-olive/20 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-olive border-t-transparent"></div>
            <span className="text-olive font-medium">
              Checking login status...
            </span>
          </div>
        </div>
      </div>
    );
  }

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
