"use client";

import ProductCard from "./layouts/ProductCard";

const featuredProducts = [
  {
    name: "Canvas Bag",
    price: "19.99",
    image: "/images/bag.png",
  },
  {
    name: "Leather Wallet",
    price: "24.99",
    image: "/images/wallet.png",
  },
  {
    name: "Cotton Shirt",
    price: "29.99",
    image: "/images/shirt.png",
  },
  {
    name: "Headphones",
    price: "59.99",
    image: "/images/headphones.png",
  },
  {
    name: "Sneakers",
    price: "49.99",
    image: "/images/shoes.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#fefaf3] px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-olive mb-8 text-center">
        Featured Products
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 w-max px-1">
          {featuredProducts.map((product, idx) => (
            <div key={idx} className="min-w-[200px] sm:min-w-[240px]">
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
