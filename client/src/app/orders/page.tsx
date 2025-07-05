"use client";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-beige px-6 py-16">
      <h1 className="text-4xl font-bold text-olive mb-8 text-center">
        My Orders
      </h1>
      {/* TODO: Render past orders here */}
      <div className="text-center text-olive/70">No orders placed yet.</div>
    </div>
  );
}
