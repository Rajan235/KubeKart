// "use client";

// import { useEffect, useState } from "react";
// import axios from "@/lib/axios";
// import { useSellerRoute } from "@/lib/useSellerRoute";
// import Link from "next/link";

// export default function SellerProductsPage() {
//   useSellerRoute();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("/products/seller").then((res) => setProducts(res.data));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
//       <ul className="space-y-4">
//         {products.map((p) => (
//           <li
//             key={p.id}
//             className="bg-white p-4 border rounded shadow flex justify-between"
//           >
//             <div>
//               <p className="font-bold">{p.name}</p>
//               <p>₹{p.price}</p>
//             </div>
//             <Link
//               href={`/seller/products/${p.id}/edit`}
//               className="text-blue-600 underline"
//             >
//               Edit
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axios";

import { toast } from "sonner";
import { motion } from "framer-motion";

import { SellerProduct } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import SellerProductCard from "@/components/layouts/SellerProductCard";
import EmptyState from "@/components/layouts/EmptyState";

export default function SellerProductPage() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  //if (user?.role !== "SELLER") return;
  const fetchProducts = async () => {
    try {
      if (!user?.id || user?.role !== "SELLER") return;
      const sellerId = user?.id;
      const res = await axiosInstance.get(`/product/seller/${sellerId}`);
      setProducts(res.data);
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [user]);

  const deleteProduct = async (id: string) => {
    try {
      if (user?.role !== "SELLER") return;
      await axiosInstance.delete(`/product/seller/${id}`);
      toast.success("Product deleted");
      fetchProducts(); // refresh
    } catch {
      toast.error("Failed to delete product");
    }
  };
  if (!user || user.role !== "SELLER") {
    return (
      <div className="text-center mt-10 text-red-600">Unauthorized Access</div>
    );
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!products.length) return <EmptyState message="No products listed yet." />;

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-12 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-6">📦 My Products</h1>

      <div className="space-y-4">
        {products.map((product) => (
          <SellerProductCard
            key={product.id}
            product={product}
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </motion.div>
  );
}
