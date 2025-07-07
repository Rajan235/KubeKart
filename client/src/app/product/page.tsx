// "use client";

// import { useState } from "react";

// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   userId: string;
//   stock?: number;
// }
// const sampleProducts: Product[] = [
//   {
//     name: "Wireless Mouse",
//     description:
//       "Ergonomic wireless mouse with USB receiver and adjustable DPI.",
//     price: 899,
//     category: "Electronics",
//     userId: "user123",
//     stock: 50,
//   },
//   {
//     name: "Leather Journal",
//     description: "Handcrafted leather journal with 200 unlined pages.",
//     price: 499,
//     category: "Stationery",
//     userId: "user456",
//     stock: 30,
//   },
//   {
//     name: "Bluetooth Speaker",
//     description:
//       "Portable Bluetooth speaker with deep bass and long battery life.",
//     price: 1299,
//     category: "Electronics",
//     userId: "user789",
//     stock: 20,
//   },
//   {
//     name: "Running Shoes",
//     description: "Lightweight and breathable running shoes for men.",
//     price: 2499,
//     category: "Footwear",
//     userId: "user321",
//     stock: 100,
//   },
//   {
//     name: "Organic Green Tea",
//     description:
//       "Pack of 100 organic green tea bags with natural antioxidants.",
//     price: 299,
//     category: "Grocery",
//     userId: "user111",
//   },
//   {
//     name: "Noise Cancelling Headphones",
//     description: "Over-ear headphones with active noise cancellation and mic.",
//     price: 4599,
//     category: "Electronics",
//     userId: "user222",
//     stock: 40,
//   },
//   {
//     name: "Yoga Mat",
//     description: "Eco-friendly yoga mat with non-slip surface and cushioning.",
//     price: 799,
//     category: "Fitness",
//     userId: "user333",
//     stock: 60,
//   },
//   {
//     name: "Smartwatch",
//     description: "Fitness smartwatch with heart rate monitor and GPS tracking.",
//     price: 2999,
//     category: "Wearables",
//     userId: "user444",
//     stock: 15,
//   },
//   {
//     name: "LED Desk Lamp",
//     description:
//       "Rechargeable LED desk lamp with touch control and brightness settings.",
//     price: 699,
//     category: "Home & Living",
//     userId: "user555",
//     stock: 25,
//   },
//   {
//     name: "Cotton T-Shirt",
//     description: "Plain white 100% cotton t-shirt, comfortable and breathable.",
//     price: 399,
//     category: "Clothing",
//     userId: "user666",
//     stock: 80,
//   },
// ];

// export default function ProductsPage() {
//   const [quantities, setQuantities] = useState<Record<string, number>>({});

//   const handleQuantityChange = (productId: string, value: number) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [productId]: Math.max(1, value), // Minimum 1
//     }));
//   };

//   const getQty = (productId: string) => quantities[productId] || 1;
//   return (
//     <div className="bg-beige min-h-screen px-6 py-16">
//       <h1 className="text-4xl font-bold text-olive mb-10 text-center">
//         All Products
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {sampleProducts.map((product, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
//           >
//             {/* <div className="bg-[#f0f0f0] h-48 mb-4 rounded-lg flex items-center justify-center">
//               <span className="text-5xl">📦</span>
//             </div>
//             <h2 className="text-xl font-semibold text-olive mb-2">
//               {product.name}
//             </h2>
//             <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//               {product.description}
//             </p>
//             <div className="mt-auto">
//               <p className="text-lg font-bold text-olive mb-1">
//                 ₹{product.price}
//               </p>
//               <p className="text-xs text-gray-500">{product.category}</p>
//               {product.stock !== undefined && (
//                 <p className="text-xs text-gray-400">
//                   In stock: {product.stock}
//                 </p>
//               )}
//             </div> */}
//             <div className="bg-[#f0f0f0] h-48 mb-4 rounded-lg flex items-center justify-center">
//               <span className="text-5xl">📦</span>
//             </div>
//             <h2 className="text-xl font-semibold text-olive mb-2">
//               {product.name}
//             </h2>
//             <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//               {product.description}
//             </p>
//             <div className="mt-auto space-y-2">
//               <p className="text-lg font-bold text-olive">₹{product.price}</p>
//               <p className="text-xs text-gray-500">{product.category}</p>
//               {product.stock !== undefined && (
//                 <p className="text-xs text-gray-400">
//                   In stock: {product.stock}
//                 </p>
//               )}

//               {/* Quantity and Add to Cart */}
//               {product.stock && product.stock > 0 ? (
//                 <div className="flex items-center gap-2 mt-2">
//                   <input
//                     type="number"
//                     min={1}
//                     max={product.stock}
//                     defaultValue={1}
//                     value={getQty(product.name)}
//                     className="w-16 border rounded-lg px-2 py-1 text-sm"
//                     onChange={(e) =>
//                       // (product.quantityToAdd = Math.min(
//                       //   product.stock || 1,
//                       //   Math.max(1, Number(e.target.value))
//                       // ))
//                       handleQuantityChange(product.name, Number(e.target.value))
//                     }
//                   />
//                   <button
//                     className="bg-olive text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-olive/90 transition"
//                     onClick={() => {
//                       // const qty = product.quantityToAdd || 1;
//                       // alert(`Added ${qty} of ${product.name} to cart!`);
//                       const qty = getQty(product.name);
//                       alert(`Added ${qty} of ${product.name} to cart!`);
//                       // In real app: call `addToCart(product, qty)`
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-sm text-red-500 mt-2 font-medium">
//                   Out of Stock
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// sample products
"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import ProductCard from "@/components/layouts/ProductCard";
import { AxiosError } from "axios";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
// };
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  userId: string;
  stock?: number;
}
export default function ProductPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (productId: string, quantity: number) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add to cart");
      return;
    }

    try {
      await axiosInstance.post("/cart/add", { productId, quantity });
      toast.success("Added to cart!");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
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

  // return (
  //   <div className="max-w-4xl mx-auto p-4">
  //     <h1 className="text-2xl font-bold mb-4">Products</h1>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //       {products.map((product) => (
  //         <div
  //           key={product.id}
  //           className="border rounded p-4 shadow-sm bg-white flex flex-col justify-between"
  //         >
  //           <div>
  //             <h2 className="text-lg font-semibold">{product.name}</h2>
  //             <p className="text-sm text-gray-600">{product.description}</p>
  //             <p className="font-bold mt-2">₹{product.price}</p>
  //           </div>
  //           <Button className="mt-4" onClick={() => addToCart(product.id)}>
  //             Add to Cart
  //           </Button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          // <div
          //   key={product.id}
          //   className="border rounded p-4 shadow-sm bg-white flex flex-col justify-between"
          // >
          //   <div>
          //     <h2 className="text-lg font-semibold">{product.name}</h2>
          //     <p className="text-sm text-gray-600">{product.description}</p>
          //     <p className="font-bold mt-2">₹{product.price}</p>
          //   </div>
          //   <Button className="mt-4" onClick={() => addToCart(product.id)}>
          //     Add to Cart
          //   </Button>
          // </div>
          <ProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onQuantityChange={(qty) => handleQuantityChange(product.id, qty)}
            onAddToCart={() => addToCart(product.id, getQuantity(product.id))}
          />
        ))}
      </div>
    </div>
  );
}
