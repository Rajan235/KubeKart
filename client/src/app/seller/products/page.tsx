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
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import EmptyState from "@/components/layouts/EmptyState";

interface SellerProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  status?: string;
}

export default function SellerProductPage() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/seller");
      setProducts(res.data);
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      toast.success("Product deleted");
      fetchProducts(); // refresh
    } catch {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          <Card
            key={product.id}
            className="p-4 flex items-center justify-between bg-white shadow-sm rounded-xl"
          >
            <div>
              <h2 className="text-lg font-semibold text-olive">
                {product.name}
              </h2>
              <p className="text-sm text-olive/70">
                ₹{product.price} | Stock: {product.stock}
              </p>
            </div>

            <div className="flex gap-3">
              <Link href={`/seller/products/${product.id}`}>
                <Button variant="outline" size="sm">
                  <FaEdit className="mr-2" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteProduct(product.id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
