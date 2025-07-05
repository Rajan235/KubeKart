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
// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//       <h2 className="text-2xl font-bold text-olive mb-6">Login to LevoMart</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full mb-4 p-3 border border-olive/30 rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full mb-6 p-3 border border-olive/30 rounded"
//       />
//       <Button className="w-full bg-olive text-beige hover:bg-olive/90">Login</Button>
//     </form>
//   );
// }
