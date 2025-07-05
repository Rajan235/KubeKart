"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils"; // or your utility classNames
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaUserCircle } from "react-icons/fa";

import Logo from "./Logo";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  const pathname = usePathname();
  const [role, setRole] = useState<Role>(null); // Replace this with real role from auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Simulate role for demo (replace later with real logic)
  useEffect(() => {
    setRole("USER"); // simulate role, replace with real auth
    setIsLoggedIn(true); // simulate login state
  }, []);

  const links = role ? roleLinks[role] : [];

  return (
    <header className="w-full bg-beige border-b border-olive/30 shadow-sm sticky top-0 z-50">
      <nav className="w-full mx-auto px-8 py-6 md:py-8 flex items-center justify-between">
        {/* Logo */}
        {/* <Link
          href="/"
          className="text-3xl font-bold text-olive tracking-tight hover:text-olive/80 transition"
        >
          <FaLeaf className="text-3xl text-olive" /> LevoMart
        </Link> */}
        <Logo />

        {/* Role-based links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base font-bold text-olive/80 hover:text-olive transition-colors ",
                pathname === link.href &&
                  "text-olive font-semibold underline underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Auth Buttons / Profile */}
        <div className="relative">
          {!isLoggedIn ? (
            <div className="flex gap-4">
              <Button
                variant="outline"
                className=" text-base border-olive text-olive hover:bg-olive hover:text-beige transition"
              >
                Login
              </Button>
              <Button className="text-base bg-olive text-beige hover:bg-olive/90 transition">
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-b-lg bg-olive text-beige hover:bg-olive/90"
              >
                <FaUserCircle className="text-xl mr-4" />
                {/* Profile */}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-md border rounded z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/logout"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Auth Buttons
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-olive text-olive hover:bg-olive hover:text-beige transition"
          >
            Login
          </Button>
          <Button className="bg-olive text-beige hover:bg-olive/90 transition">
            Sign Up
          </Button>
        </div> */}
      </nav>
    </header>
  );
  //   return (
  //     <header className="w-full bg-beige border-b border-olive/30 shadow-sm sticky top-0 z-50">
  //       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
  //         {/* Logo */}
  //         <Link href="/" className="text-2xl font-bold font-serif text-olive tracking-tight">
  //           LevoMart
  //         </Link>

  //         {/* Role-based links */}
  //         <div className="hidden md:flex items-center gap-6">
  //           {links.map((link) => (
  //             <Link
  //               key={link.href}
  //               href={link.href}
  //               className={cn(
  //                 "text-sm font-medium text-olive/80 hover:text-olive transition-colors",
  //                 pathname === link.href &&
  //                   "text-olive font-semibold underline underline-offset-4"
  //               )}
  //             >
  //               {link.label}
  //             </Link>
  //           ))}
  //         </div>

  //         {/* Auth/Profile */}
  //         <div>
  //           {!isLoggedIn ? (
  //             <div className="flex gap-3">
  //               <Button variant="outline" className="border-olive text-olive hover:bg-olive hover:text-beige">
  //                 Login
  //               </Button>
  //               <Button className="bg-olive text-beige hover:bg-olive/90">
  //                 Sign Up
  //               </Button>
  //             </div>
  //           ) : (
  //             <DropdownMenu>
  //               <DropdownMenuTrigger asChild>
  //                 <Button variant="ghost" className="p-0">
  //                   <Avatar className="h-8 w-8 border border-olive">
  //                     <AvatarFallback className="bg-olive text-beige text-xs">
  //                       LM
  //                     </AvatarFallback>
  //                   </Avatar>
  //                 </Button>
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent align="end">
  //                 <DropdownMenuItem asChild>
  //                   <Link href="/profile">Profile</Link>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem asChild>
  //                   <Link href="/orders">My Orders</Link>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem asChild>
  //                   <Link href="/logout" className="text-red-600">Logout</Link>
  //                 </DropdownMenuItem>
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           )}
  //         </div>
  //       </nav>
  //     </header>
  //   );
}
