"use client";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const pathname = usePathname();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("log in userData");

    if (stored) {
      try {
        const storedUser = JSON.parse(stored);
        const user = storedUser.user;
        setFullName(user.fullName || "");
        setEmail(user.email || "");
        setPhoneNumber(user.phone || "");
        setAddress(user.address || "");
        setImage(user.image || "");
      } catch (err) {
        console.error("Invalid userData in localStorage", err);
      }
    }
  }, []);

  const isActive = (path) => pathname === path;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="flex justify-around items-center shadow py-4">
      <section className="container flex justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" role="img" aria-label="shield">
            <Image src={logo} alt="logo" />
          </Link>
        </div>

        <nav className="flex gap-3 items-center text-lg">
          <Link href="/home">
            <button
              className={`font-semibold ${
                isActive("/home") ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Home
            </button>
          </Link>
          <Link href="/home/myVisitors">
            <button
              className={`font-semibold ${
                isActive("/home/myVisitors") ? "text-blue-500" : "text-gray-500"
              }`}
            >
              My Visitors
            </button>
          </Link>
          <Link href="/home/notifications">
            <button
              className={`font-semibold ${
                isActive("/home/notifications")
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Notifications
            </button>
          </Link>
        </nav>

        <div className="flex gap-3 items-center">
          <button className="border rounded px-2 py-1 text-sm">
            Jan 12, 2024
          </button>
          <button className="hidden md:flex bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200">
            + New Visitor
          </button>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
              className="bg-gray-300 rounded-full p-2 hover:bg-gray-500 transition-all cursor-pointer"
            >
              <img src={image} className="w-8 h-8 rounded-full" alt="Profile" />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <DropdownMenu
                  fullName={fullName}
                  email={email}
                  isOpen={isDropdownOpen}
                  onClose={closeDropdown}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </header>
  );
}
