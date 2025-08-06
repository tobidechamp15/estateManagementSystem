"use client";

import { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function AuthTabs() {
  const [tab, setTab] = useState("signup"); // Default to signup initially
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false); // Track if we've checked localStorage

  useEffect(() => {
    // Only run on client side after component mounts
    const exists = localStorage.getItem("userExists");
    setTab(exists === "true" ? "login" : "signup");
    setHasCheckedStorage(true);
  }, []);

  // Don't render until we've checked localStorage
  if (!hasCheckedStorage) {
    return null; // or return a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 md:px-4 py-12">
      <div className="max-w-md w-full space-y-6 md:p-8 bg-white rounded-xl shadow-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            🔒
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {tab === "signup" ? "Finish Account Setup" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {tab === "signup"
              ? "Your account has been pre-registered by estate management"
              : "Please enter your credentials to log in"}
          </p>
        </div>

        <div className="flex justify-center space-x-6 text-sm font-medium">
          <button
            onClick={() => setTab("signup")}
            className={`pb-1 ${
              tab === "signup"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            Sign up
          </button>
          <button
            onClick={() => setTab("login")}
            className={`pb-1 ${
              tab === "login"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            Log in
          </button>
        </div>

        {tab === "signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );
}
