"use client";

// import Image from "next/image";
// import { format } from "date-fns";

// import { LogOut, Edit, MapPin, PackageCheck } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileActions from "./ProfileActions";

// const dummyUser = {
//   id: "user123",
//   name: "Rajan Bansal",
//   email: "rajan@example.com",
//   joinedAt: new Date("2024-01-10"),
//   profilePic: "https://i.pravatar.cc/150?img=3",
// };

export default function ProfileDashboard() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="text-center py-20 text-xl font-medium text-gray-600">
        Loading your profile...
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-olive py-12 px-4">
      <ProfileInfoCard user={user} />
      <ProfileActions />
    </div>
  );
  // return (
  //   <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-olive py-12 px-4">
  //     {/* Left Panel – Profile Info */}
  //     <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
  //       <div className="flex flex-col items-center text-center">
  //         <Image
  //           src={dummyUser.profilePic}
  //           alt={`${dummyUser.name} profile picture`}
  //           width={96}
  //           height={96}
  //           className="rounded-full mb-4"
  //           priority
  //         />
  //         <h2 className="text-xl font-bold">{dummyUser.name}</h2>
  //         <p className="text-sm text-olive/60">{dummyUser.email}</p>
  //         <p className="mt-1 text-sm text-olive/60 capitalize">
  //           Role:{" "}
  //           <span className="font-medium text-olive">{dummyUser.role}</span>
  //         </p>
  //         <p className="mt-1 text-sm text-olive/60">
  //           Orders:{" "}
  //           <span className="font-medium text-olive">
  //             {dummyUser.totalOrders}
  //           </span>
  //         </p>
  //         <p className="mt-2 text-sm text-olive/60">
  //           Member since{" "}
  //           <span className="font-medium text-olive">
  //             {format(dummyUser.joinedAt, "MMMM yyyy")}
  //           </span>
  //         </p>
  //       </div>
  //     </div>

  //     {/* Right Panel – Actions */}
  //     <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md">
  //       <h3 className="text-lg font-semibold mb-6">Account Actions</h3>

  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //         <button className="w-full bg-olive text-white py-3 px-4 rounded-xl font-semibold hover:bg-olive/90 transition flex items-center justify-center gap-2">
  //           <Edit className="w-4 h-4" /> Edit Profile
  //         </button>
  //         <button className="w-full border border-olive text-olive py-3 px-4 rounded-xl font-semibold hover:bg-olive/10 transition flex items-center justify-center gap-2">
  //           <MapPin className="w-4 h-4" /> Manage Address
  //         </button>
  //         <button className="w-full border border-olive text-olive py-3 px-4 rounded-xl font-semibold hover:bg-olive/10 transition flex items-center justify-center gap-2">
  //           <PackageCheck className="w-4 h-4" /> View Orders
  //         </button>
  //         <button className="w-full text-red-600 font-semibold py-3 hover:underline flex items-center justify-center gap-2">
  //           <LogOut className="w-4 h-4" /> Logout
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
