"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PrivateRoute from "../components/PrivateRoute";
import ProductsGrid from "../products/Productsgrids";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading || !user) return <p>Loading...</p>;

  return <div>Welcome, {user.email}</div>;
}
<PrivateRoute>
   < ProductsGrid></ProductsGrid>
</PrivateRoute>