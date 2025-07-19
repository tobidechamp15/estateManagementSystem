import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={aboutVariants}
      className="flex flex-col gap-[40px] items-center xsm:px-[25px] mb-[190px]"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="sub-head ">About me</span>
        <span className="sub-des ">Get to know me</span>
      </div>
      <div className="flex flex-col gap-[40px]">
        <motion.span
          className="text-center text-white max-w-[840px] font-[Inter] text-[17px] leading-6"
          variants={aboutVariants}
        >
          Hi there! I'm Tobiloba, a software engineer specializing in full-stack
          development, system optimization, application architecture, and
          DevOps. With a passion for building robust and scalable solutions, I'm
          dedicated to helping businesses enhance their digital presence and
          streamline their operations in today's technology-driven world.
        </motion.span>
        <motion.span
          className="text-center text-white max-w-[840px] font-[Inter] text-[17px] leading-6"
          variants={aboutVariants}
        >
          I bring a blend of technical expertise, hands-on experience, and a
          commitment to clear communication to every project. Whether it's
          designing efficient systems, optimizing performance, or implementing
          scalable solutions, I'm here to help you harness the full potential of
          technology to achieve your goals.
        </motion.span>
        <motion.span
          className="text-center text-white max-w-[840px] font-[Inter] text-[17px] leading-6"
          variants={aboutVariants}
        >
          Let's work together to transform your ideas into robust and scalable
          software solutions that drive real results. Get in touch, and let's
          start unlocking the power of technology for your business today!
        </motion.span>
      </div>
      <div className="flex flex-wrap gap-4">
        <motion.a
          href="/cv/Oluwatobiloba-Oluwadare CV.pdf" // Correct path
          target="_blank" // Opens in a new tab
          whileHover={{
            scale: 1.05,
            backgroundColor: "#4FC3F7",
            color: "#000",
          }}
          className="font-[Montserrat] w-fit my-3 border text-white cursor-pointer border-[#4FC3F7] py-[18px] px-[50px] rounded-[75px] transition duration-300 ease-in-out"
        >
          View CV
        </motion.a>
        <motion.a
          href="/cv/Oluwatobiloba-Oluwadare CV.pdf" // Correct path
          download="Oluwatobiloba-Oluwadare CV.pdf"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#4FC3F7",
            color: "#000",
          }}
          className="font-[Montserrat] w-fit my-3 border text-white cursor-pointer border-[#4FC3F7] py-[18px] px-[50px] rounded-[75px] transition duration-300 ease-in-out"
        >
          Download CV
        </motion.a>
      </div>
    </motion.div>
  );
};

export default About;
