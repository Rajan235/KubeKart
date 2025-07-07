export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Dashboard</h1>
      <div className="flex gap-6 mb-6">
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/users">Users</Link>
      </div>
      {children}
    </div>
  );
}
