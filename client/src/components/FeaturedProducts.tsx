"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// const products = [
//   {
//     id: 1,
//     name: "Canvas Bag",
//     price: 19.99,
//     image: "../../images/1.png",
//     category: "Accessories",
//   },
//   {
//     id: 2,
//     name: "Leather Wallet",
//     price: 24.99,
//     image: "../../images/2.png",
//     category: "Accessories",
//   },
//   {
//     id: 3,
//     name: "Cotton Shirt",
//     price: 29.99,
//     image: "../../images/3.png",
//     category: "Clothing",
//   },
//   {
//     id: 4,
//     name: "Headphones",
//     price: 59.99,
//     image: "../../images/4.png",
//     category: "Electronics",
//   },
//   {
//     id: 5,
//     name: "Sneakers",
//     price: 49.99,
//     image: "../../images/6.png",
//     category: "Footwear",
//   },
// ];
interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: string;
  stock?: number;
}
const sampleProducts: Product[] = [
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with USB receiver and adjustable DPI.",
    price: 899,
    category: "Electronics",
    userId: "user123",
    stock: 50,
  },
  {
    name: "Leather Journal",
    description: "Handcrafted leather journal with 200 unlined pages.",
    price: 499,
    category: "Stationery",
    userId: "user456",
    stock: 30,
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with deep bass and long battery life.",
    price: 1299,
    category: "Electronics",
    userId: "user789",
    stock: 20,
  },
  {
    name: "Running Shoes",
    description: "Lightweight and breathable running shoes for men.",
    price: 2499,
    category: "Footwear",
    userId: "user321",
    stock: 100,
  },
  {
    name: "Organic Green Tea",
    description:
      "Pack of 100 organic green tea bags with natural antioxidants.",
    price: 299,
    category: "Grocery",
    userId: "user111",
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation and mic.",
    price: 4599,
    category: "Electronics",
    userId: "user222",
    stock: 40,
  },
  {
    name: "Yoga Mat",
    description: "Eco-friendly yoga mat with non-slip surface and cushioning.",
    price: 799,
    category: "Fitness",
    userId: "user333",
    stock: 60,
  },
  {
    name: "Smartwatch",
    description: "Fitness smartwatch with heart rate monitor and GPS tracking.",
    price: 2999,
    category: "Wearables",
    userId: "user444",
    stock: 15,
  },
  {
    name: "LED Desk Lamp",
    description:
      "Rechargeable LED desk lamp with touch control and brightness settings.",
    price: 699,
    category: "Home & Living",
    userId: "user555",
    stock: 25,
  },
  {
    name: "Cotton T-Shirt",
    description: "Plain white 100% cotton t-shirt, comfortable and breathable.",
    price: 399,
    category: "Clothing",
    userId: "user666",
    stock: 80,
  },
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  // useEffect(() => {
  //     setHoveredProduct(null);
  //   }, []);

  return (
    <section className="bg-beige py-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-olive">
            Featured Products
          </h2>
          <div className="w-32 h-1 bg-olive/40 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-olive/70 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        {/* Products Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            > */}
        {/* Product Image */}
        {/* <div className="relative aspect-square overflow-hidden bg-beige/30">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-olive/40 text-6xl">📦</span>
                </div> */}
        {/* Category Badge */}
        {/* <div className="absolute top-4 left-4 bg-olive/90 text-beige px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </div>
              </div> */}

        {/* Product Info */}
        {/* <div className="p-6">
                <h3 className="text-xl font-bold text-olive mb-3 group-hover:text-olive/80 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-olive">
                    ${product.price}
                  </span>
                  <span className="text-2xl font-bold text-olive">
                    ${product.description}
                  </span>
                  <span className="text-2xl font-bold text-olive">
                    ${product.stock}
                  </span>
                  <button className="bg-olive text-beige px-4 py-2 rounded-full text-sm font-medium hover:bg-olive/90 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            // slides: {
            //   perView: 4,
            //   spacing: 16,
            // },
          }}
          className="w-full"
        >
          <CarouselContent>
            {
              sampleProducts.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
                    onMouseEnter={() => setHoveredProduct(index)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Product Image Placeholder */}
                    <div className="relative aspect-square overflow-hidden bg-beige/30">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-olive/40 text-6xl">📦</span>
                      </div>
                      <div className="absolute top-4 left-4 bg-olive/90 text-beige px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-olive mb-2 group-hover:text-olive/80">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-olive">
                          ₹{product.price}
                        </span>
                        {product.stock !== undefined && (
                          <span className="text-sm text-gray-400">
                            In Stock: {product.stock}
                          </span>
                        )}
                      </div>

                      <button className="mt-4 w-full bg-olive text-beige px-4 py-2 rounded-full text-sm font-medium hover:bg-olive/90 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))
              // <CarouselItem className="basis-1/3">...</CarouselItem>
              // <CarouselItem className="basis-1/3">...</CarouselItem>
              // <CarouselItem className="basis-1/3">...</CarouselItem>
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <button className="bg-olive text-beige px-12 py-4 rounded-full text-lg font-semibold hover:bg-olive/90 transition-colors shadow-lg hover:shadow-xl">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
{
  /* <Link href={`/product/${product.id}`}>
  <div className="hover:scale-[1.01] transition-transform"> */
}
{
  /* Card layout */
}
{
  /* <h2 className="font-bold">{product.name}</h2>
    <p>₹{product.price}</p>
  </div>
</Link> */
}
