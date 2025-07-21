"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import avatar from "../public/assets/profile.jpg";
import userReview from "../public/assets/userReviews.svg";
import logo from "../public/assets/logo.svg";
import midArrow from "../public/assets/midArrow.svg";
import Link from "next/link";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Adjust this value to determine how much of the element should be in view before the animation starts
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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={heroVariants}
      className=" relative items-start justify-between md:pt-[80px] xsm:mb-[90px] flex xsm:flex-col gap-[20px] md:xsm:px-[25px] "
    >
      <div className="flex flex-col gap-4 md:w-1/2">
        <span className="hero-name text-start">
          Estate Security & Management System
        </span>
        {/* <span className="job-title">Software Engineer</span> */}
        <span className="job-des text-start">
          Effortlessly manage resident registrations, visitor invitations, and
          security verification—all in one platform.
        </span>
        <motion.span
          // whileHover={{ scale: 1.05, backgroundColor: "#4FC3F7", color: "#000" }}
          className=" "
        >
          <Image src={userReview} alt="userReview" />
        </motion.span>
      </div>
      <div className="flex flex-col gap-3 items-center md:w-1/2 xsm:mt-[64px] max-w-[440px]">
        <Image src={logo} alt="logo" />
        <span className="left-head">Create an account</span>
        <span className="left-desc xsm:min-w-[80%]">
          You've been pre-registered! Enter your unique code to acces your
          account.
        </span>
        <form className="flex flex-col gap-2 w-full xsm:mt-6">
          <span className=" font-semibold">Code</span>
          <input
            type="password"
            name="password"
            max="4"
            placeholder="Enter your code"
            id="password"
            className="custom-input"
          />
          <button
            className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
            type="submit"
          >
            Continue
          </button>
        </form>
        <span className="font-normal text-gray-600 ">
          Already have an account?
          <Link href="/" className="text-blue-900 font-semibold">
            {" "}
            Log in
          </Link>
        </span>
      </div>
      <Image
        src={midArrow}
        alt="midArrow"
        className="absolute top-[50%] left-[45%] w-[20%]   midArrow"
      />
    </motion.div>
  );
};

export default Hero;
