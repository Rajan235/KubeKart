"use client";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-beige px-6 py-16">
      <h1 className="text-4xl font-bold text-olive mb-8 text-center">
        Your Cart
      </h1>
      {/* TODO: Render cart items and total here */}
      <div className="text-center text-olive/70">No items in cart yet.</div>
    </div>
  );
}
