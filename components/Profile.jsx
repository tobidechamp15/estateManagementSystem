"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Header";
import defaultUser from "../public/assets/defaultUser.svg";
import SuccessMessage from "./SuccessMessage";
import { Lock, Mail, Phone } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem("log in userData");
    if (stored) {
      try {
        const storedUser = JSON.parse(stored);
        setUser(storedUser.user);
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    const stored = localStorage.getItem("log in userData");
    if (stored) {
      const storedData = JSON.parse(stored);
      storedData.user = user;
      console.log(user);
      localStorage.setItem("log in userData", JSON.stringify(storedData));
      try {
        const updatedUser = {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
        };
        const response = await fetch(`/api/users/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        const data = await response;
        setSuccess("User updated successfully");
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen "
    >
      {success && <SuccessMessage message={success} />}
      <Header />
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 py-6 px-8 text-white">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-indigo-100">Manage your personal information</p>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={user.image || defaultUser}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all shadow-md group-hover:opacity-100 opacity-90">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>
              </div>

              <div className="flex-grow space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="tel"
                        disabled
                        value={user.phone}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={saveProfile}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
