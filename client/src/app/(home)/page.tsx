import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/layouts/Features";
import Hero from "@/components/layouts/Hero";

export default function Home() {
  return (
    // <div>
    //   <main className="flex min-h-screen items-center justify-center bg-olive text-beige">
    //     <h1 className="text-4xl font-bold">OlivoMart is working ✅</h1>
    //   </main>
    // </div>
    <div className="bg-beige">
      <Hero />
      <WhyChooseUs />
      <section className="px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-olive mb-6 text-center">
          Featured Products
        </h2>
        <FeaturedProducts />
      </section>
      {/* Next: Product Grid Section */}
    </div>
  );
}
