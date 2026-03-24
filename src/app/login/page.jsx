"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/"); // redirect after login
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogle}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition"
      >
        Login with Google
      </button>

      {/* Register Link */}
      <p className="text-center mt-4 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-orange-500 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}