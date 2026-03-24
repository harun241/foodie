"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // ✅ import auth
import { useRouter } from "next/navigation"; // ✅ import router

export default function TopRatedFoods() {
  const { user } = useAuth(); // ✅ get current user
  const router = useRouter(); // ✅ router for redirection
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Typewriter states
  const title = "Top Rated Foods";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch top rated foods
  useEffect(() => {
    fetch("/api/top-rated")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Continuous typewriter effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 80;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          const next = title.slice(0, prev.length + 1);
          if (next === title) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
          return next;
        } else {
          const next = title.slice(0, prev.length - 1);
          if (next === "") setIsDeleting(false);
          return next;
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  // Handle Order Now click
  const handleOrderNow = (id) => {
    if (!user) {
      router.push("/login"); // redirect to login if not logged in
    } else {
      router.push(`/products/${id}`); // go to product details page if logged in
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No top rated foods found yet.
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        {displayText}
        <span className="animate-pulse">|</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-56 w-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                ⭐ {item.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <span className="text-green-600 font-extrabold">${item.price}</span>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {item.description}
              </p>

              <div className="mt-auto bg-gray-50 p-3 rounded-xl italic text-xs text-gray-600 border-l-4 border-orange-400">
                "{item.comment}"
              </div>

              {/* Order Now */}
              <button
                onClick={() => handleOrderNow(item._id)}
                className="relative mt-5 w-full text-center py-3 rounded-xl font-bold text-blue-600 border-2 border-blue-600 overflow-hidden transition-colors duration-500 group"
              >
                <span className="absolute inset-0 bg-blue-600 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 rounded-xl z-0"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Order Now
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}