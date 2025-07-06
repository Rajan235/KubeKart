"use client";

import Image from "next/image";
import { format } from "date-fns";

const dummyUser = {
  id: "user123",
  name: "Rajan Bansal",
  email: "rajan@example.com",
  joinedAt: new Date("2024-01-10"),
  profilePic: "https://i.pravatar.cc/150?img=3",
};

export default function ProfileDashboard() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-olive">
      {/* Left Panel – Profile Info */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col items-center text-center">
          <Image
            src={dummyUser.profilePic}
            alt="profile"
            width={96}
            height={96}
            className="rounded-full mb-4"
          />
          <h2 className="text-xl font-bold">{dummyUser.name}</h2>
          <p className="text-sm text-olive/60">{dummyUser.email}</p>
          <p className="mt-2 text-sm text-olive/60">
            Member since{" "}
            <span className="font-medium text-olive">
              {format(dummyUser.joinedAt, "MMMM yyyy")}
            </span>
          </p>
        </div>
      </div>

      {/* Right Panel – Actions */}
      <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h3 className="text-lg font-semibold mb-4">Account Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="w-full bg-olive text-white py-3 rounded-xl font-semibold hover:bg-olive/90 transition">
            Edit Profile
          </button>
          <button className="w-full border border-olive text-olive py-3 rounded-xl font-semibold hover:bg-olive/10 transition">
            Manage Address
          </button>
          <button className="w-full border border-olive text-olive py-3 rounded-xl font-semibold hover:bg-olive/10 transition">
            View Orders
          </button>
          <button className="w-full text-red-600 font-semibold py-3 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
