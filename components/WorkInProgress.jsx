"use client";
import { motion } from "framer-motion";
import { FaTools, FaHardHat, FaRocket } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";

export default function WorkInProgress() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4"
    >
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 py-8 px-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <FaHardHat className="text-5xl text-yellow-300 animate-bounce" />
              <FaTools className="text-3xl text-white absolute -bottom-2 -right-2" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Work in Progress</h1>
          <p className="text-indigo-100 text-lg">
            We're building something amazing here!
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <GiProgression className="text-2xl text-indigo-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800">
                Under Construction
              </h3>
              <p className="text-gray-600">
                This page is currently being developed. Please check back soon
                for updates!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaRocket className="text-2xl text-indigo-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800">
                Exciting Features Coming
              </h3>
              <p className="text-gray-600">
                We're working hard to bring you new and improved functionality.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="bg-indigo-600 h-4 rounded-full"
              ></motion.div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-1">
              65% complete
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="/home"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return Home
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
