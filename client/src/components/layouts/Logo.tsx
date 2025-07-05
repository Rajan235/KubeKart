// // components/Logo.tsx
// "use client";

// import { FaLeaf } from "react-icons/fa"; // this matches your image pretty well
// import Link from "next/link";

// export default function Logo() {
//   return (
//     <Link
//       href="/"
//       className="flex items-center gap-2 text-2xl font-extrabold text-[#3C4E2B] tracking-tight hover:opacity-80 transition"
//     >
//       <FaLeaf className="text-3xl text-[#3C4E2B]" />
//       Levomart
//     </Link>
//   );
// }
// components/Logo.tsx
"use client";

import { FaLeaf } from "react-icons/fa";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <FaLeaf className="text-3xl text-olive group-hover:opacity-80 transition" />
      <span className="text-3xl font-extrabold text-olive tracking-tight group-hover:opacity-80">
        LevoMart
      </span>
    </Link>
  );
}
