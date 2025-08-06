"use client";

import { useEffect, useState } from "react";
import { Lock, Eye, EyeOff, Phone, Mail, User, House } from "lucide-react";
import { useRouter } from "next/navigation"; // Import the router

export default function Signup() {
  const router = useRouter(); // Initialize the router
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState(""); // Add error state

  // Validation checks
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[^\w\s]/.test(password);
  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    const activeUser = localStorage.getItem("userExists");

    if (stored) {
      try {
        const user = JSON.parse(stored);
        setFullName(user.fullName || "");
        setEmail(user.email || "");
        setPhoneNumber(user.phone || "");
        setAddress(user.address || "");

        if (activeUser === "true") {
          setIsActiveUser(true);
          setPassword("********");
          setConfirmPassword("********");
        }
      } catch (err) {
        console.error("Invalid userData in localStorage", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    const accessCode = localStorage.getItem("accessCode");
    e.preventDefault();
    setError("");

    if (isActiveUser) {
      // Navigate to login page if user is active
      window.location.reload();
      return;
    }

    // Validate form for new users
    if (!hasMinLength || !hasSpecialChar) {
      setError(
        "Password must be at least 8 characters with a special character"
      );
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessCode,
          password,
          // Include any other required fields
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // On successful registration
      localStorage.setItem("userExists", "true");
      router.push("/authTabs"); // Or wherever you want to redirect after signup
    } catch (err) {
      setError(err.message || "An error occurred during registration");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-md p-6">
        {/* Display error message if any */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* ... rest of your form JSX remains the same ... */}
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                disabled
                value={fullName}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative">
              <input
                type="email"
                disabled
                value={email}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <input
                type="tel"
                disabled
                value={phoneNumber}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* House Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              House Address
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                disabled
                value={address}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <House className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => !isActiveUser && setPassword(e.target.value)}
                disabled={isActiveUser}
                className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  isActiveUser ? "bg-gray-100" : ""
                }`}
              />
              {isActiveUser && (
                <Lock className="absolute right-10 top-2.5 h-5 w-5 text-gray-400" />
              )}
              <button
                type="button"
                onClick={() => !isActiveUser && setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
                disabled={isActiveUser}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  !isActiveUser && setConfirmPassword(e.target.value)
                }
                disabled={isActiveUser}
                className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  isActiveUser ? "bg-gray-100" : ""
                }`}
              />
              {isActiveUser && (
                <Lock className="absolute right-10 top-2.5 h-5 w-5 text-gray-400" />
              )}
              <button
                type="button"
                onClick={() => !isActiveUser && setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500"
                disabled={isActiveUser}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Hints (hidden for active users) */}
          {!isActiveUser && (
            <ul className="text-xs text-gray-500 space-y-1 mt-2 pl-2">
              <li className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    hasMinLength ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                Must be at least 8 characters
              </li>
              <li className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    hasSpecialChar ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                Must contain one special character
              </li>
            </ul>
          )}

          {/* Submit button with loading state */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : isActiveUser ? (
                "Continue"
              ) : (
                "Get started"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
