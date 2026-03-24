"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHamburger, FaShoppingCart } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import BookTableModal from "./BookTableModal";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, role, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = (path) =>
    `relative hover:text-orange-500 transition-colors ${
      pathname === path
        ? "text-orange-500 font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-orange-500"
        : "text-gray-700"
    }`;

  const handleBookTable = () => {
    if (!user) router.push("/login");
    else setIsModalOpen(true);
  };

  const renderDesktopLinks = () => (
    <>
      <Link href="/" className={navLinkClass("/")}>Home</Link>
      <Link href="/products" className={navLinkClass("/products")}>Menu</Link>

      {user && role === "user" && (
        <Link href="/cart" className={`relative flex items-center gap-1 ${navLinkClass("/cart")}`}>
          <FaShoppingCart className="text-xl" /> Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      )}

      {user && role === "admin" && (
        <>
          <Link href="/products/add" className={navLinkClass("/products/add")}>Add Item</Link>
          <Link href="/booking" className={navLinkClass("/booking")}>Bookings</Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <FaHamburger className="text-yellow-400 text-3xl animate-pulse" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-green-500">
            FoodieHub
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center gap-6 font-medium">
          {renderDesktopLinks()}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/+8801234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-500 font-semibold hover:text-green-600 transition-colors"
          >
            <FaWhatsapp className="text-xl" /> +880 1234 567890
          </a>

          <button
            onClick={handleBookTable}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Book Table
          </button>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 text-2xl">
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col gap-4 animate-slideDown">
          {renderDesktopLinks()}

          <a
            href="https://wa.me/+8801234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-500 font-semibold hover:text-green-600 transition-colors"
          >
            <FaWhatsapp className="text-xl" /> +880 1234 567890
          </a>

          <button
            onClick={handleBookTable}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Book Table
          </button>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}

      {/* Book Table Modal */}
      <BookTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}