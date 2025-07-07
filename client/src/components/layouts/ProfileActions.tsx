"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { LogOut, Edit, MapPin, PackageCheck } from "lucide-react";
import { toast } from "sonner";

export default function ProfileActions() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-6">Account Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          className="w-full flex gap-2 justify-center"
          onClick={() => router.push("/profile/edit")}
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
        <Button
          variant="outline"
          className="w-full flex gap-2 justify-center"
          onClick={() => router.push("/profile/address")}
        >
          <MapPin className="w-4 h-4" />
          Manage Address
        </Button>
        <Button
          variant="outline"
          className="w-full flex gap-2 justify-center"
          onClick={() => router.push("/orders")}
        >
          <PackageCheck className="w-4 h-4" />
          View Orders
        </Button>
        <Button
          variant="ghost"
          className="text-red-600 hover:underline w-full flex gap-2 justify-center"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
