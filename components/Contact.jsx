import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setSuccess(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false); // Reset submission state
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col gap-[40px] items-center mb-[190px] xsm:px-[25px] w-full">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <span className="sub-head">Get in Touch</span>
        <span className="sub-des">Let us work together</span>
      </motion.div>

      {success && (
        <motion.p
          className="text-green-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your message has been sent!
        </motion.p>
      )}

      <motion.form
        className="max-w-[690px] w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {["name", "email", "message"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-white font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === "message" ? (
              <textarea
                id={field}
                required
                value={formData[field]}
                onChange={handleChange}
                name={field}
                className="h-[222px] p-3 bg-transparent rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out shadow-sm placeholder-gray-400"
                placeholder={`Enter your ${field}`}
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                required
                value={formData[field]}
                onChange={handleChange}
                id={field}
                name={field}
                className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out shadow-sm placeholder-gray-400"
                placeholder={`Enter your ${field}`}
              />
            )}
          </div>
        ))}
        <motion.button
          type="submit"
          className="relative w-fit self-center inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-300 transition duration-300 ease-out border-2 border-blue-300 rounded-full shadow-md group"
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-300 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-blue-300 transition-all duration-300 transform group-hover:translate-x-full ease">
            {isSubmitting ? "Submitting..." : "Get in Touch"}
          </span>
          <span className="relative invisible">Get in Touch</span>
        </motion.button>
      </motion.form>

      {success && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Message Sent Successfully!
        </motion.div>
      )}
    </div>
  );
};

export default Contact;
