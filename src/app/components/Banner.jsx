"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
  const fullText = "Welcome to FoodieHub";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 80;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          const next = fullText.slice(0, prev.length + 1);
          if (next === fullText) {
            setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
          }
          return next;
        } else {
          const next = fullText.slice(0, prev.length - 1);
          if (next === "") setIsDeleting(false); // restart typing
          return next;
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  // Highlight "FoodieHub" only
  const highlight = "FoodieHub";
  const parts = displayText.split(highlight);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 items-center gap-8">

        {/* LEFT */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {parts[0]}
            {displayText.includes(highlight) && (
              <span className="text-orange-500">{highlight}</span>
            )}
            {parts[1] || ""}
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Discover delicious foods, explore amazing recipes and enjoy the best
            meals from around the world.
          </p>

          <Link href="/products" className="inline-block group">
            <button className="relative px-6 py-3 rounded-lg font-semibold border-2 border-orange-500 text-orange-500 overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <span className="absolute inset-0 bg-orange-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Explore Menu
              </span>
            </button>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="/banner.png"
            alt="Food Banner"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;