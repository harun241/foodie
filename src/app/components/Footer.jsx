"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaHamburger } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* About / Brand */}
        <div className="space-y-4">
         <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <FaHamburger className="text-yellow-400 text-3xl animate-pulse" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-green-500">
            FoodieHub
          </span>
        </Link>
          <p className="text-gray-400">
            Discover delicious foods, explore amazing recipes, and enjoy meals from around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-orange-500 transition-colors">Menu</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <div className="flex items-center gap-4 text-gray-400">
            <Link href="#" className="hover:text-orange-500 transition-colors"><FaFacebookF /></Link>
            <Link href="#" className="hover:text-orange-500 transition-colors"><FaTwitter /></Link>
            <Link href="#" className="hover:text-orange-500 transition-colors"><FaInstagram /></Link>
          </div>
          <div className="text-gray-400 text-sm">
            Email: info@foodiehub.com <br />
            Phone: +880 1234 567890
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FoodieHub. All rights reserved.
      </div>
    </footer>
  );
}