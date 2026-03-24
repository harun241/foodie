// components/PrivateRoute.jsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // not logged in
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        router.push("/unauthorized"); // logged in but not allowed
      }
    }
  }, [user, role, loading]);

  if (loading || !user || (allowedRoles.length && !allowedRoles.includes(role))) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}