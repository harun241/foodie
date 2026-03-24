"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <p className="p-4 text-center text-lg">Your cart is empty.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map(item => (
          <div
            key={item._id}
            className="flex flex-col border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-bold text-lg mb-1">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg font-semibold transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}