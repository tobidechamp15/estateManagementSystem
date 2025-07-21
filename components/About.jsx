"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import greenBullets from "../public/assets/greenBullets.svg";
import aboutImg from "../public/assets/aboutImg.svg";
import Image from "next/image";

const About = () => {
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

  const aboutVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const features = [
    "Easy resident onboarding",
    "Digital visitor invitations & QR codes",
    "Real-time security monitoring",
    "Automated notifications & alerts",
  ];
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={aboutVariants}
      className="flex flex-col md:flex-row md:justify-between gap-[40px] items-center  mb-[190px] xsm:mt-4"
    >
      <div className="md:w-1/2">
        <div className="flex flex-col items-start justify-center">
          <span className="abt-head ">About Us</span>
          <span className="abt-des my-3">
            {" "}
            A Smarter Way to Manage Estate Access
          </span>
        </div>
        <motion.div className="flex flex-col gap-[40px] text-black">
          <motion.span
            className="text-start  my-3  abt-body"
            variants={aboutVariants}
          >
            Our system simplifies estate management by streamlining resident
            registration, visitor approvals, and security oversight. No more
            manual logs or long wait times—just a seamless, secure experience
            for everyone.
          </motion.span>
          {features.map((feature) => (
            <motion.div
              variants={childVariants}
              className="flex gap-3 items-center"
            >
              <Image src={greenBullets} alt="greenBullets" />
              <motion.span
                variants={aboutVariants}
                className="text-start   font-[Inter] text-[17px] leading-6"
              >
                {feature}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Image src={aboutImg} alt="aboutImg" />
      </div>
    </motion.div>
  );
};

export default About;
