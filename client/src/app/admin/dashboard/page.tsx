// // app/admin/dashboard/page.tsx

// "use client";

// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";

// const adminLinks = [
//   { label: "🧾 Manage Orders", href: "/admin/orders" },
//   { label: "🛒 Manage Products", href: "/admin/products" },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-4">
//       <h1 className="text-3xl font-bold text-olive mb-6">🛠️ Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {adminLinks.map((link) => (
//           <Link key={link.href} href={link.href}>
//             <Card className="hover:shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
//               <CardContent className="p-6 text-center text-lg font-medium text-olive">
//                 {link.label}
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaBox, FaClipboardList } from "react-icons/fa";

const dashboardLinks = [
  {
    href: "/admin/products",
    icon: <FaBox className="text-2xl text-olive" />,
    title: "All Products",
  },

  // {
  //   href: "/admin/add-product",
  //   icon: <FaPlusCircle className="text-2xl text-olive" />,
  //   title: "Add Product",
  // },

  {
    href: "/admin/orders",
    icon: <FaClipboardList className="text-2xl text-olive" />,
    title: "All Orders",
  },
];

export default function AdminDashboard() {
  return (
    <motion.div
      className="max-w-5xl mx-auto mt-12 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-olive mb-6 text-center">
        🧾 Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-3">
                {link.icon}
                <CardTitle className="text-xl text-center text-olive">
                  {link.title}
                </CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
