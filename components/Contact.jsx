"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import avatarGroup from "../public/assets/groupAvatar.svg";
import avatarContact from "../public/assets/avatarContact.svg";

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const avatarFade = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="flex flex-col gap-[40px] items-center mb-[190px] xsm:px-[25px] w-full"
    >
      <motion.div
        className="flex flex-col items-center justify-center"
        variants={fadeUp}
      >
        <span className="contact-head  text-center ">
          This system has completely transformed the way we manage our estate.
          No more confusion at the gate!
        </span>

        <motion.div
          variants={avatarFade}
          className="flex flex-col items-center justify-center gap-3 py-[64px]"
        >
          <Image src={avatarContact} alt="avatarContact" />
          <span className="contact-des  font-semibold">Faith Darasimi</span>
          <span className="text-base font-normal text-[#475467] leading-6 tracking-normal">
            Resident
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={childVariants}
        className="flex flex-col items-center bg-[#02249E] md:w-[90%]  rounded-2xl p-6 md:p-10 text-center text-white space-y-4"
      >
        <motion.span variants={fadeUp}>
          <Image
            src={avatarGroup}
            alt="Support Team"
            className=" object-cover rounded-full shadow-lg b mb-2"
          />
        </motion.span>

        <motion.span
          variants={fadeUp}
          className="text-xl md:text-2xl font-semibold"
        >
          Still have questions?
        </motion.span>

        <motion.span
          variants={fadeUp}
          className="text-sm md:text-base text-white/80 max-w-md"
        >
          Can’t find the answer you’re looking for? Please chat to our friendly
          team.
        </motion.span>

        <button className="mt-4 px-6 py-2 bg-white text-[#02249E] font-semibold rounded-full shadow-md hover:bg-blue-100 transition duration-300">
          Get in touch
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
