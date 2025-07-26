"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import userReview from "../public/assets/userReviews.svg";
import logo from "../public/assets/logo.svg";
import midArrow from "../public/assets/midArrow.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setError("Please enter your code");
      return;
    }

    try {
      setLoading(true);
      setError("");
      let accessCode = code;
      const res = await fetch(`/api/auth/check-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessCode }),
      });

      if (!res.ok) {
        throw new Error("Invalid code. Please try again.");
      }

      const data = await res.json();
      const userExists = data.exists;
      console.log(data.exists);
      if (userExists) {
        router.push("/login");
      } else {
        router.push("/signup");
      }
      // Handle successful authentication here
      // router.push('/dashboard') or similar
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={heroVariants}
      className="relative items-start justify-between md:pt-[80px] xsm:mb-[90px] flex xsm:flex-col gap-[20px] md:xsm:px-[25px]"
    >
      <div className="flex flex-col gap-4 md:w-1/2">
        <span className="hero-name text-start">
          Estate Security & Management System
        </span>
        <span className="job-des text-start">
          Effortlessly manage resident registrations, visitor invitations, and
          security verification—all in one platform.
        </span>
        <motion.span>
          <Image src={userReview} alt="User reviews and testimonials" />
        </motion.span>
      </div>
      <div className="flex flex-col gap-3 items-center md:w-1/2 xsm:mt-[64px] max-w-[440px]">
        <Image src={logo} alt="Estate Security System Logo" />
        <span className="left-head">Create an account</span>
        <span className="left-desc xsm:min-w-[80%]">
          You've been pre-registered! Enter your unique code to access your
          account.
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full xsm:mt-6"
        >
          <label htmlFor="code" className="font-semibold">
            Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            maxLength="4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code"
            className="custom-input"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200 disabled:bg-blue-400"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>
        <span className="font-normal text-gray-600">
          Already have an account?
          <Link href="/" className="text-blue-900 font-semibold">
            {" "}
            Log in
          </Link>
        </span>
      </div>
      <Image
        src={midArrow}
        alt="Decorative arrow"
        className="absolute top-[50%] left-[45%] w-[20%] midArrow"
      />
    </motion.div>
  );
};

export default Hero;
