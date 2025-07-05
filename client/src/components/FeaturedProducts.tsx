"use client";

import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Canvas Bag",
    price: 19.99,
    image: "../../images/1.png",
    category: "Accessories",
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: 24.99,
    image: "../../images/2.png",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Cotton Shirt",
    price: 29.99,
    image: "../../images/3.png",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Headphones",
    price: 59.99,
    image: "../../images/4.png",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Sneakers",
    price: 49.99,
    image: "../../images/6.png",
    category: "Footwear",
  },
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="bg-beige !py-6 !px-6">
      <div className="!max-w-7xl !mx-auto">
        {/* Section Header */}
        <div className="!text-center !mb-10">
          <h2 className="!text-4xl md:!text-5xl !font-bold !mb-6 text-olive">
            Featured Products
          </h2>
          <div className="!w-32 !h-1 bg-olive/40 !mx-auto !rounded-full !mb-4"></div>
          <p className="!text-xl text-olive/70 !max-w-2xl !mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-5 !gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="!group bg-white !rounded-3xl !shadow-lg hover:!shadow-2xl !transition-all !duration-300 !overflow-hidden hover:!scale-105"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="!relative !aspect-square !overflow-hidden bg-beige/30">
                <div className="!w-full !h-full !flex !items-center !justify-center">
                  <span className="text-olive/40 !text-6xl">📦</span>
                </div>
                {/* Category Badge */}
                <div className="!absolute !top-4 !left-4 bg-olive/90 text-beige !px-3 !py-1 !rounded-full !text-sm !font-medium">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="!p-6">
                <h3 className="!text-xl !font-bold text-olive !mb-3 group-hover:!text-olive/80 !transition-colors">
                  {product.name}
                </h3>
                <div className="!flex !items-center !justify-between">
                  <span className="!text-2xl !font-bold text-olive">
                    ${product.price}
                  </span>
                  <button className="!bg-olive text-beige !px-4 !py-2 !rounded-full !text-sm !font-medium hover:bg-olive/90 !transition-colors !opacity-0 group-hover:!opacity-100 !transform !translate-y-2 group-hover:!translate-y-0 !transition-all !duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="!text-center !mt-16">
          <button className="bg-olive text-beige !px-12 !py-4 !rounded-full !text-lg !font-semibold hover:!bg-olive/90 !transition-colors !shadow-lg hover:!shadow-xl">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
