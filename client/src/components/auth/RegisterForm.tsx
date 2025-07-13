"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
//mport { useAuth } from "@/context/AuthContext";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

export default function RegisterForm() {
  const router = useRouter();
  //const { login } = useAuth();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  type ErrorResponse = {
    message: string;
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Stop page reload

    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      // const { token } = res.data;
      // if (token) {
      //   login(token); // auto login after register
      //   router.push("/");
      // } else {
      //   alert("Registration failed");
      // }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.error("Registration error:", error);
      alert(
        "Registration failed: " +
          (err.response?.data?.message || "Unknown error")
      );
    }
    router.push("/auth/login");
  };

  return (
    <form
      className="bg-white p-8 rounded-xl shadow-lg border border-[#b7b7a4] w-full max-w-md"
      onSubmit={handleRegister}
    >
      <h2 className="text-2xl font-bold text-olive mb-6">Create an Account</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-3 border border-olive/30 rounded"
      />
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
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-6 p-3 border border-olive/30 rounded"
      />
      <Button
        type="submit"
        className="w-full bg-olive text-beige hover:bg-olive/90"
      >
        Register
      </Button>
    </form>
  );
}
