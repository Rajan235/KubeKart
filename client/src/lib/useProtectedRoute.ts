"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function useProtectedRoute(requiredRole?: "ADMIN" | "SELLER" | "USER") {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Not logged in → redirect to login
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Role mismatch
    if (requiredRole && user?.role !== requiredRole) {
      router.push("/unauthorized");
    }
  }, [isLoggedIn, user, requiredRole, router]);
}
