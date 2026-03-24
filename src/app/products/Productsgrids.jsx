"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext"; // ✅ import auth
import { useRouter } from "next/navigation"; // ✅ router

export default function ProductsGrid({ products }) {
  const { addToCart } = useCart();
  const { user } = useAuth(); // ✅ get current user
  const router = useRouter(); // ✅ router for redirection
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get unique categories dynamically from products
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return [...new Set(cats)];
  }, [products]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (!user) {
      router.push("/login");
    } else {
      addToCart(product);
    }
  };

  // Handle Order Now
  const handleOrderNow = (id) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/products/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Category Filter Dropdown */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <label className="font-semibold text-gray-700">Filter by Category:</label>
        <select
          className="border px-3 py-2 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              {/* Product Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="font-bold text-lg mb-1">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                </div>

                <p className="font-semibold text-lg mt-2">${product.price.toFixed(2)}</p>

                {/* Buttons side by side */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  {/* Add to Cart button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="relative flex-1 text-center py-3 rounded-xl font-bold text-orange-600 border-2 border-orange-600 overflow-hidden transition-colors duration-500 group"
                  >
                    <span className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 rounded-xl z-0"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      Add to Cart
                    </span>
                  </button>

                  {/* Order Now button */}
                  <button
                    onClick={() => handleOrderNow(product._id)}
                    className="relative flex-1 text-center py-3 rounded-xl font-bold text-blue-600 border-2 border-blue-600 overflow-hidden transition-colors duration-500 group"
                  >
                    <span className="absolute inset-0 bg-blue-600 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 rounded-xl z-0"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      Order Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center mt-10">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}