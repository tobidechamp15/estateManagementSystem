"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // optional icon, can use any
import React from "react";

const links = ["Home", "About Us", "How it works", "Contact Us"];

const SideBar = ({ isActive, setIsActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsActive(false)}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-4/5 sm:w-3/5 max-w-xs bg-white z-50 shadow-lg flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setIsActive(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2 px-4 py-6">
              {links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => setIsActive(false)}
                  className="text-left text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {link}
                </button>
              ))}
            </nav>

            {/* Footer / CTA */}
            <div className="p-4 border-t">
              <button
                onClick={() => setIsActive(false)}
                className="w-full py-2 px-4 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Contact Support
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
