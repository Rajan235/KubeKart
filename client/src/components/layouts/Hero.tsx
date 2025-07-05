"use client";

import { FaSearch } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-beige text-olive py-40 px-6 text-2xl">
      <div className="mx-auto text-center text-9xl px-4">
        <h1 className="text-9xl md:text-7xl font-extrabold mb-10 leading-tight tracking-tight">
          Discover Amazing <br /> Products
        </h1>
        <p className="text-2xl md:text-2xl text-olive/90 mb-14">
          Explore our wide range of items.
        </p>
      </div>

      <div className="flex justify-center mt-40">
        <div className="flex items-center  bg-white rounded-full border border-olive/30 shadow-xl px-8 py-4 w-md">
          <FaSearch className="text-olive/70 text-2xl mr-10 " />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 mr-10  text-center bg-transparent text-olive placeholder:text-olive/50 outline-none text-sm"
          />
        </div>
      </div>
    </section>
  );
}
// "use client";

// import { FaSearch } from "react-icons/fa";

// export default function Hero() {
//   return (
//     <section className="bg-beige text-olive py-36 px-6">
//       <div className="max-w-5xl mx-auto text-center px-4">
//         <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
//           Discover Amazing <br /> Products
//         </h1>
//         <p className="text-xl md:text-2xl text-olive/90 mb-12">
//           Explore our wide range of items.
//         </p>

//         <div className="flex justify-center">
//           <div className="flex items-center bg-white rounded-full border border-olive/30 shadow-xl px-6 py-4 w-full max-w-2xl">
//             <FaSearch className="text-olive/70 text-xl mr-4" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="flex-1 bg-transparent text-olive placeholder:text-olive/50 outline-none text-base"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
