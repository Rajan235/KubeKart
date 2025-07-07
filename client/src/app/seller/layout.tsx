import Link from "next/link";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <div className="flex gap-6 mb-6">
        <Link href="/seller/products">Products</Link>
        <Link href="/seller/add-product">Add Product</Link>
        {/* Later: orders, analytics */}
      </div>
      {children}
    </div>
  );
}
