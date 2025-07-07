// "use client";

// import { useEffect, useState } from "react";
// import { useAdminRoute } from "@/lib/useAdminRoute";
// import axios from "@/lib/axios";

// export default function AdminProductsPage() {
//   useAdminRoute();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/products/admin") // secured route
//       .then((res) => setProducts(res.data));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">All Products</h2>
//       <ul className="space-y-4">
//         {products.map((product) => (
//           <li key={product.id} className="p-4 border rounded bg-white">
//             <div className="flex justify-between">
//               <div>
//                 <p className="font-bold">{product.name}</p>
//                 <p>₹{product.price}</p>
//               </div>
//               {/* Add edit/delete buttons if needed */}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// {
//   /* <Button
//   variant="outline"
//   onClick={() => router.push(`/admin/products/${product.id}/edit`)}
// >
//   Edit
// </Button>
// <Button
//   variant="destructive"
//   onClick={() => handleDelete(product.id)}
// >
//   Delete
// </Button> */
// }
// // const handleDelete = async (id: string) => {
// //   if (!confirm("Are you sure you want to delete this product?")) return;

// //   try {
// //     await axios.delete(`/products/${id}`);
// //     setProducts((prev) => prev.filter((p) => p.id !== id));
// //     toast.success("Product deleted");
// //   } catch {
// //     toast.error("Failed to delete product");
// //   }
// // };
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AdminProduct } from "@/types/product";

export default function AdminProductListPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/admin/all");
      setProducts(res.data);
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete(`/product/admin/${id}`);
      toast.success("Product deleted");
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!products.length)
    return <div className="text-center mt-10">No products found</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-olive mb-6">📦 All Products</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-olive">
                  {product.name}
                </h2>
                <p className="text-sm text-olive/70">₹{product.price}</p>
                <p className="text-xs text-gray-500">
                  Seller ID: {product.sellerId}
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
