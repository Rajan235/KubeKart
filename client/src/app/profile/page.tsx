"use client";

import RequireAuth from "@/components/auth/RequireAuth";
//import ProfileCard from "@/components/layouts/ProfileCard";
import ProfileDashboard from "@/components/layouts/ProfileDashboard";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-beige flex items-center justify-center px-6">
        <ProfileDashboard />
      </div>
    </RequireAuth>
  );
}
