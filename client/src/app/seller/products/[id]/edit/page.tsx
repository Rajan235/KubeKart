// "use client";

// import { useSellerRoute } from "@/lib/useSellerRoute";
// import { useParams } from "next/navigation";

// export default function EditProductPage() {
//   useSellerRoute();
//   const { id } = useParams();

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Edit Product #{id}</h2>
//       <p>Edit form coming next...</p>
//     </div>
//   );
// }
// "use client";

// import ProductForm from "@/components/product/ProductForm";
// import { useSellerRoute } from "@/lib/useSellerRoute";
// import { useEffect, useState } from "react";
// import axios from "@/lib/axios";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function EditProductPage() {
//   useSellerRoute();
//   const { id } = useParams();
//   const router = useRouter();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get(`/products/${id}`).then((res) => setProduct(res.data));
//   }, [id]);

//   const handleSubmit = async (updatedProduct: any) => {
//     try {
//       await axios.put(`/products/${id}`, updatedProduct);
//       toast.success("Product updated");
//       router.push("/seller/products");
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
//       <ProductForm initialData={product} onSubmit={handleSubmit} />
//     </div>
//   );
// }
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
("use client");

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import { Textarea } from "@/components/ui/textarea";

interface SellerProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}

export default function EditProductPage() {
  const { id } = useParams(); // dynamic route param
  const router = useRouter();
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      setSaving(true);
      await axiosInstance.post(`/product/update/${product.id}`, product);
      toast.success("Product updated");
      router.push("/seller/products");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SellerProduct, value: string | number) => {
    if (!product) return;
    setProduct({ ...product, [field]: value });
  };

  if (loading)
    return <div className="text-center mt-10">Loading product...</div>;
  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 p-4">
      <h1 className="text-2xl font-bold text-olive">✏️ Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={product.stock}
            onChange={(e) => handleChange("stock", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input
            value={product.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-olive text-beige hover:bg-olive/90"
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import axiosInstance from "@/lib/axios";
// import { Textarea } from "@/components/ui/textarea";

// interface SellerProduct {
//   id: string;
//   name: string;
//   price: number;
//   stock: number;
//   description: string;
//   imageUrl: string;
// }

// export default function EditProductPage() {
//   const { id } = useParams(); // dynamic route param
//   const router = useRouter();
//   const [product, setProduct] = useState<SellerProduct | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axiosInstance.get(`/product/${id}`);
//         setProduct(res.data.product);
//       } catch {
//         toast.error("Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product) return;

//     try {
//       setSaving(true);
//       await axiosInstance.post(`/product/update/${product.id}`, product);
//       toast.success("Product updated");
//       router.push("/seller/products");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChange = (field: keyof SellerProduct, value: string | number) => {
//     if (!product) return;
//     setProduct({ ...product, [field]: value });
//   };

//   if (loading) return <div className="text-center mt-10">Loading product...</div>;
//   if (!product) return <div className="text-center mt-10">Product not found</div>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 space-y-6 p-4">
//       <h1 className="text-2xl font-bold text-olive">✏️ Edit Product</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label>Name</Label>
//           <Input
//             value={product.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <Label>Price</Label>
//           <Input
//             type="number"
//             value={product.price}
//             onChange={(e) => handleChange("price", Number(e.target.value))}
//             required
//           />
//         </div>
//         <div>
//           <Label>Stock</Label>
//           <Input
//             type="number"
//             value={product.stock}
//             onChange={(e) => handleChange("stock", Number(e.target.value))}
//             required
//           />
//         </div>
//         <div>
//           <Label>Description</Label>
//           <Textarea
//             value={product.description}
//             onChange={(e) => handleChange("description", e.target.value)}
//           />
//         </div>
//         <div>
//           <Label>Image URL</Label>
//           <Input
//             value={product.imageUrl}
//             onChange={(e) => handleChange("imageUrl", e.target.value)}
//           />
//         </div>

//         <Button type="submit" className="w-full bg-olive text-beige hover:bg-olive/90" disabled={saving}>
//           {saving ? "Saving..." : "Update Product"}
//         </Button>
//       </form>
//     </div>
//   );
// }
