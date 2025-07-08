"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { SellerProduct } from "@/types/product";
import defaultForm from "@/constants/ProductForm";

interface ProductFormProps {
  initialData?: SellerProduct;
  onSubmit: (data: SellerProduct) => void;
}
export default function ProductForm({
  initialData,
  onSubmit,
}: ProductFormProps) {
  const [form, setForm] = useState<SellerProduct>(
    //{
    //   name: "",
    //   price: 0,
    //   description: "",
    //   stock: 0,
    //   imageUrl: "",
    //   category: "",
    //   id: "",
    //   userId: "",
    // }
    initialData || defaultForm
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm({ ...form, imageUrl: data.secure_url });
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = () => {
    if (!form.name || form.price <= 0 || form.stock < 0) {
      toast.error("Please fill all fields correctly");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Product name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: +e.target.value })}
      />
      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: +e.target.value })}
      />
      <Input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      {/* Image Upload */}
      <div className="space-y-2">
        {form.imageUrl && (
          <Image
            src={form.imageUrl}
            alt="Product image"
            width={300}
            height={300}
            className="rounded"
          />
        )}
        <Input type="file" onChange={handleImageUpload} disabled={uploading} />
      </div>

      <Button onClick={handleSubmit} disabled={uploading}>
        {initialData ? "Update Product" : "Add Product"}
      </Button>
    </div>
  );
}
