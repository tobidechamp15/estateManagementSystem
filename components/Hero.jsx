import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import avatar from "../public/assets/profile.jpg";

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
      className="container min-h-screen items-center justify-center xsm:pt-[50px] xsm:mb-[190px] flex flex-col bg-hero-bg bg-no-repeat bg-cover bg-center xsm:px-[25px]"
    >
      <Image src={avatar} alt="Avatar" className="rounded-full w-[202px]" />
      <span className="hero-name text-center">Oluwadare Oluwatobiloba</span>
      <span className="job-title">Software Engineer</span>
      <span className="job-des text-center">
        As a dedicated software engineer with expertise in developing robust
        applications, optimizing systems, and driving innovation through
        cutting-edge technologies, I excel in tackling complex technical
        challenges and delivering impactful solutions that enhance user
        experiences and streamline operations.
      </span>
      <motion.span
        whileHover={{ scale: 1.05, backgroundColor: "#4FC3F7", color: "#000" }}
        className="font-[Montserrat] my-3 border text-white cursor-pointer border-[#4FC3F7] py-[18px] px-[50px] rounded-[75px] transition duration-300 ease-in-out"
      >
        Contact Me
      </motion.span>
    </motion.div>
  );
};

export default Hero;
