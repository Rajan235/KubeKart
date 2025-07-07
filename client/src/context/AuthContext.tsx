"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
// Define your user and role types
type Role = "USER" | "SELLER" | "ADMIN" | null;
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  // Load current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser();
    }
  }, []);
  const fetchCurrentUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");
      setUser(res.data);
    } catch (err) {
      console.error("AuthContext: failed to fetch user", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (storedToken && storedUser) {
  //     setToken(storedToken);
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // const login = (newToken: string) => {
  //   const decoded: User = parseJwt(newToken); // simple JWT parser
  //   setToken(newToken);
  //   setUser(decoded);
  //   localStorage.setItem("token", newToken);
  //   localStorage.setItem("user", JSON.stringify(decoded));
  // };

  // const logout = () => {
  //   setToken(null);
  //   setUser(null);
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  // };
  const login = (token: string) => {
    localStorage.setItem("token", token);
    fetchCurrentUser();
  };

  /**
   * Logs the user out by clearing the authentication token from localStorage,
   * setting the user state to null, and redirecting to the login page.
   */

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };
// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// function parseJwt(token: string): any {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (error) {
//     console.error(error);
//   }
// }
