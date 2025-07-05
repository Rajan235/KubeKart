"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        login(data.token);
        router.push("/"); // redirect to homepage
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        className="mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} className="mt-4 w-full">
        Login
      </Button>
    </div>
  );
}
