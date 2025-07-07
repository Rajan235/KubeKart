// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import axios from "@/lib/axios";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Textarea } from "@/components/ui/textarea";

// // export default function EditProductPage() {
// //   const { id } = useParams();
// //   const router = useRouter();
// //   const [product, setProduct] = useState<any>(null);

// //   useEffect(() => {
// //     axios.get(`/products/${id}`).then((res) => setProduct(res.data));
// //   }, [id]);

// //   const handleSubmit = async () => {
// //     try {
// //       await axios.put(`/products/${id}`, product);
// //       toast.success("Product updated");
// //       router.push("/admin/products");
// //     } catch {
// //       toast.error("Update failed");
// //     }
// //   };

// //   if (!product) return <div>Loading...</div>;

// //   return (
// //     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
// //       <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

// //       <Input
// //         className="mb-4"
// //         value={product.name}
// //         onChange={(e) => setProduct({ ...product, name: e.target.value })}
// //       />
// //       <Input
// //         type="number"
// //         className="mb-4"
// //         value={product.price}
// //         onChange={(e) =>
// //           setProduct({ ...product, price: Number(e.target.value) })
// //         }
// //       />
// //       <Textarea
// //         className="mb-4"
// //         value={product.description}
// //         onChange={(e) =>
// //           setProduct({ ...product, description: e.target.value })
// //         }
// //       />
// //       <Input
// //         type="number"
// //         className="mb-4"
// //         value={product.stock}
// //         onChange={(e) =>
// //           setProduct({ ...product, stock: Number(e.target.value) })
// //         }
// //       />

// //       <Button onClick={handleSubmit}>Update Product</Button>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Product } from "@/types/product";

// export default function AdminProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   const fetchProduct = async () => {
//     try {
//       const res = await axiosInstance.get(`/product/${id}`);
//       setProduct(res.data);
//     } catch {
//       toast.error("Failed to fetch product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProduct = async () => {
//     try {
//       setUpdating(true);
//       await axiosInstance.patch(`/product/${id}`, product);
//       toast.success("Product updated");
//       router.push("/admin/products");
//     } catch {
//       toast.error("Failed to update");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleChange = (key: keyof Product, value: any) => {
//     setProduct((prev) => prev && { ...prev, [key]: value });
//   };

//   useEffect(() => {
//     if (id) fetchProduct();
//   }, [id]);

//   if (loading || !product)
//     return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4 space-y-6">
//       <h1 className="text-2xl font-bold text-olive">🛠 Edit Product</h1>

//       <Input
//         value={product.name}
//         onChange={(e) => handleChange("name", e.target.value)}
//         placeholder="Product name"
//       />
//       <Textarea
//         value={product.description}
//         onChange={(e) => handleChange("description", e.target.value)}
//         placeholder="Description"
//       />
//       <Input
//         type="number"
//         value={product.price}
//         onChange={(e) => handleChange("price", Number(e.target.value))}
//         placeholder="Price"
//       />
//       <Input
//         value={product.category}
//         onChange={(e) => handleChange("category", e.target.value)}
//         placeholder="Category"
//       />
//       <Input
//         type="number"
//         value={product.stock}
//         onChange={(e) => handleChange("stock", Number(e.target.value))}
//         placeholder="Stock"
//       />

//       <Button
//         onClick={updateProduct}
//         disabled={updating}
//         className="w-full bg-olive text-beige hover:bg-olive/90"
//       >
//         {updating ? "Updating..." : "Update Product"}
//       </Button>
//       <Button
//         variant="destructive"
//         onClick={async () => {
//           const confirm = window.confirm(
//             "Are you sure you want to delete this product?"
//           );
//           if (!confirm) return;

//           try {
//             await axiosInstance.delete(`/product/${id}`);
//             toast.success("Product deleted");
//             router.push("/admin/products");
//           } catch {
//             toast.error("Failed to delete product");
//           }
//         }}
//         className="w-full"
//       >
//         Delete Product
//       </Button>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Zod schema
// const productSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   price: z.number().positive(),
//   category: z.string().min(1),
//   stock: z.number().int().nonnegative(),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// export default function AdminProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchProduct = async () => {
//     try {
//       const res = await axiosInstance.get(`/product/${id}`);
//       const product = res.data;
//       setValue("name", product.name);
//       setValue("description", product.description);
//       setValue("price", product.price);
//       setValue("category", product.category);
//       setValue("stock", product.stock);
//     } catch {
//       toast.error("Failed to fetch product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchProduct();
//   }, [id]);

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       await axiosInstance.patch(`/product/${id}`, data);
//       toast.success("Product updated");
//       router.push("/admin/products");
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   const handleDelete = async () => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this product?"
//     );
//     if (!confirm) return;

//     try {
//       await axiosInstance.delete(`/product/${id}`);
//       toast.success("Product deleted");
//       router.push("/admin/products");
//     } catch {
//       toast.error("Failed to delete product");
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4 space-y-6">
//       <h1 className="text-2xl font-bold text-olive">🛠 Edit Product</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <Input placeholder="Name" {...register("name")} />
//           {errors.name && (
//             <p className="text-red-600 text-sm">{errors.name.message}</p>
//           )}
//         </div>
//         <div>
//           <Textarea placeholder="Description" {...register("description")} />
//           {errors.description && (
//             <p className="text-red-600 text-sm">{errors.description.message}</p>
//           )}
//         </div>
//         <div>
//           <Input
//             type="number"
//             placeholder="Price"
//             {...register("price", { valueAsNumber: true })}
//           />
//           {errors.price && (
//             <p className="text-red-600 text-sm">{errors.price.message}</p>
//           )}
//         </div>
//         <div>
//           <Input placeholder="Category" {...register("category")} />
//           {errors.category && (
//             <p className="text-red-600 text-sm">{errors.category.message}</p>
//           )}
//         </div>
//         <div>
//           <Input
//             type="number"
//             placeholder="Stock"
//             {...register("stock", { valueAsNumber: true })}
//           />
//           {errors.stock && (
//             <p className="text-red-600 text-sm">{errors.stock.message}</p>
//           )}
//         </div>

//         <Button
//           type="submit"
//           className="w-full bg-olive text-beige hover:bg-olive/90"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Updating..." : "Update Product"}
//         </Button>
//       </form>

//       <Button variant="destructive" onClick={handleDelete} className="w-full">
//         Delete Product
//       </Button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for product
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number({ invalid_type_error: "Price must be a number" }).positive(),
  category: z.string().min(1, "Category is required"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int()
    .nonnegative(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [loading, setLoading] = useState(true);
  const [productImage, setProductImage] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      const product = res.data;

      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("stock", product.stock);
      setProductImage(product.imageUrl || null);
    } catch (error) {
      toast.error("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await axiosInstance.patch(`/product/${id}`, data);
      toast.success("Product updated");
      router.push("/admin/products");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/product/${id}`);
      toast.success("Product deleted");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-olive">🛠 Edit Product</h1>

      {productImage && (
        <div className="mb-4">
          <p className="text-olive font-medium mb-2">Current Product Image:</p>
          <img
            src={productImage}
            alt="Product"
            className="w-full h-64 object-contain border rounded-lg shadow"
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Name" {...register("name")} />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Textarea placeholder="Description" {...register("description")} />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Input
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Category" {...register("category")} />
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <Input
            type="number"
            placeholder="Stock"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <p className="text-red-600 text-sm">{errors.stock.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-olive text-beige hover:bg-olive/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </form>

      <Button variant="destructive" onClick={handleDelete} className="w-full">
        Delete Product
      </Button>
    </div>
  );
}
