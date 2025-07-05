"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils"; // or your utility classNames
// import { Button } from "@/components/ui/button";
//import { usePathname } from "next/navigation";

type Role = "USER" | "SELLER" | "ADMIN" | null;

const roleLinks = {
  USER: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Cart", href: "/cart" },
    { label: "Orders", href: "/orders" },
  ],
  SELLER: [
    { label: "Dashboard", href: "/seller/dashboard" },
    { label: "Products", href: "/seller/products" },
    { label: "Add Product", href: "/seller/add-product" },
    { label: "Orders", href: "/seller/orders" },
  ],
  ADMIN: [
    { label: "Admin Panel", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Products", href: "/admin/products" },
    { label: "Moderation", href: "/admin/moderation" },
  ],
};

export default function Navbar() {
  //const pathname = usePathname();
  const [role, setRole] = useState<Role>(null); // Replace this with real role from auth context

  // Simulate role for demo (replace later with real logic)
  useEffect(() => {
    setRole("USER"); // or SELLER or ADMIN
  }, []);

  const links = role ? roleLinks[role] : [];

  return (
    <nav className="bg-olive text-white px-4 py-3 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold tracking-wide">
        🛒 MyShop
      </Link>

      <div className="flex gap-4 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            // className={cn(
            //   "text-beige hover:text-white transition-colors font-medium",
            //   pathname === link.href && "underline underline-offset-4"
            // )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex gap-2">
        {/* <Button variant="secondary">Login</Button>
        <Button>Signup</Button> */}
      </div>
    </nav>
  );
}
