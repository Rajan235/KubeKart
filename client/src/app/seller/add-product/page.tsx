// // "use client";

// // import { useSellerRoute } from "@/lib/useSellerRoute";

// // export default function AddProductPage() {
// //   useSellerRoute();

// //   return (
// //     <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
// //       <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
// //       <p>Form coming soon...</p>
// //     </div>
// //   );
// // }
// // // "use client";

// // // import ProductForm from "@/components/product/ProductForm";
// // // import { useSellerRoute } from "@/lib/useSellerRoute";
// // // import axios from "@/lib/axios";
// // // import { useRouter } from "next/navigation";
// // // import { toast } from "sonner";

// // // export default function AddProductPage() {
// // //   useSellerRoute();
// // //   const router = useRouter();

// // //   const handleSubmit = async (data: any) => {
// // //     try {
// // //       await axios.post("/products", data);
// // //       toast.success("Product added");
// // //       router.push("/seller/products");
// // //     } catch {
// // //       toast.error("Failed to add product");
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
// // //       <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
// // //       <ProductForm onSubmit={handleSubmit} />
// // //     </div>
// // //   );
// // // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { motion } from "framer-motion";

// interface ProductFormData {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: string;
// }

// export default function AddProductPage() {
//   const router = useRouter();
//   const [form, setForm] = useState<ProductFormData>({
//     name: "",
//     description: "",
//     price: 0,
//     stock: 0,
//     category: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: name === "price" || name === "stock" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axiosInstance.post("/product/create", form);
//       toast.success("Product created successfully");
//       router.push("/seller/products");
//     } catch {
//       toast.error("Failed to create product");
//     }
//   };

//   return (
//     <motion.div
//       className="max-w-2xl mx-auto mt-12 px-4 space-y-6"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <h1 className="text-3xl font-bold text-olive mb-4">➕ Add New Product</h1>

//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="name">Name</Label>
//           <Input name="name" value={form.name} onChange={handleChange} />
//         </div>

//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="price">Price</Label>
//             <Input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <Label htmlFor="stock">Stock</Label>
//             <Input
//               type="number"
//               name="stock"
//               value={form.stock}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="category">Category</Label>
//           <Input
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//           />
//         </div>

//         <Button className="w-full bg-olive text-beige" onClick={handleSubmit}>
//           Create Product
//         </Button>
//       </div>
//     </motion.div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ProductForm from "@/components/ProductForm";
import axiosInstance from "@/lib/axios";
import { SellerProduct } from "@/types/product";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: SellerProduct) => {
    try {
      await axiosInstance.post("/product/create", data);
      toast.success("Product created successfully");
      router.push("/seller/products");
    } catch {
      toast.error("Failed to create product");
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-12 px-4 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-4">➕ Add New Product</h1>

      <ProductForm onSubmit={handleSubmit} />
    </motion.div>
  );
}
