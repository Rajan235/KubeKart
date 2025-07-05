"use client";

import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#fefaf3] py-20 px-6 text-olive">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Why Choose LevoMart
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <FaShippingFast className="text-4xl text-olive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-olive/80">
              Enjoy fast & free shipping on all orders across India.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <FaShieldAlt className="text-4xl text-olive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-olive/80">
              Your transactions are protected with end-to-end encryption.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
            <FaHeadset className="text-4xl text-olive mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-olive/80">
              Need help? Our team is here for you round the clock.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
