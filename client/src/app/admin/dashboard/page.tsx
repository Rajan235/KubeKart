// app/admin/dashboard/page.tsx

"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const adminLinks = [
  { label: "🧾 Manage Orders", href: "/admin/orders" },
  { label: "🛒 Manage Products", href: "/admin/products" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-olive mb-6">🛠️ Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-6 text-center text-lg font-medium text-olive">
                {link.label}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
