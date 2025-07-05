// import FeaturedProducts from "@/components/FeaturedProducts";
// import WhyChooseUs from "@/components/layouts/Features";
// import Hero from "@/components/layouts/Hero";

// export default function Home() {
//   return (
//     <div className="bg-beige">
//       <Hero />
//       <WhyChooseUs />

//       <FeaturedProducts />

//       {/* Next: Product Grid Section */}
//     </div>
//   );
// }
// Home Page (page.tsx)
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/layouts/Features";
import Hero from "@/components/layouts/Hero";

export default function Home() {
  return (
    <div className="bg-beige min-h-screen">
      <Hero />
      <WhyChooseUs />
      <FeaturedProducts />
    </div>
  );
}
