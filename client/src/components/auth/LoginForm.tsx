"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token } = res.data;
      if (token) {
        login(token); // AuthContext will fetch current user
        router.push("/"); // or /dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      //alert(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
    // if (data.token) {
    //   login(data.token);
    //   router.push("/"); // redirect to homepage
    // } else {
    //   alert("Invalid login");
    // }
    // } catch (err) {
    //   console.error("Login error:", err);
    // }
  };

  return (
    <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-olive mb-6">Login to LevoMart</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 border border-olive/30 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 p-3 border border-olive/30 rounded"
      />
      <Button
        onClick={handleLogin}
        className="w-full bg-olive text-beige hover:bg-olive/90"
      >
        Login
      </Button>
    </form>
  );
}
