"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const DropdownMenu = ({ fullName, email, isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 border-b">
        <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
        <p className="text-xs text-gray-500 truncate">{email}</p>
      </div>

      <Link href="/profile" onClick={onClose}>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          Profile
        </button>
      </Link>

      <Link href="/settings" onClick={onClose}>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          Settings
        </button>
      </Link>

      <div className="border-t border-gray-100"></div>

      <button
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
        onClick={onClose}
      >
        Logout
      </button>
    </motion.div>
  );
};

export default DropdownMenu;
