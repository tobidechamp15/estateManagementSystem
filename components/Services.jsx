import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import webDevIcon from "../public/assets/web-dev-icon.png";
import cloudIcon from "../public/assets/cloudIcon.png";
import databaseIcon from "../public/assets/databaseIcon.png";
import optIcon from "../public/assets/optIcon.png";
import supportIcon from "../public/assets/supportIcon.png";

const services = [
  {
    icon: webDevIcon,
    title: "Custom Software Development",
    description:
      "Creating bespoke software solutions tailored to meet specific business needs",
  },
  {
    icon: cloudIcon,
    title: "Cloud Computing Solutions",
    description:
      "Implementing cloud-based solutions for scalable and secure data storage and processing.",
  },
  {
    icon: databaseIcon,
    title: "Database Design and Management",
    description:
      "Designing and managing relational and non-relational databases for efficient data storage and retrieval.",
  },
  {
    icon: optIcon,
    title: "Performance Optimization",
    description:
      "Analyzing and optimizing software performance to improve speed, scalability, and efficiency.",
  },
  {
    icon: supportIcon,
    title: "Software Maintenance and Support",
    description:
      "Providing ongoing maintenance and support for existing software applications to ensure they run smoothly.",
  },
];

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Services = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={parentVariants}
      className="flex flex-col gap-[40px] items-center mb-[190px] xsm:px-[25px]"
    >
      <motion.div
        className="flex flex-col items-center justify-center"
        variants={childVariants}
      >
        <span className="sub-head">What I do</span>
        <span className="sub-des">My Services</span>
      </motion.div>

      <motion.section
        className="flex flex-wrap justify-center gap-4 max-w-[929px]"
        variants={parentVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="service-card gap-3 py-[29px] px-[26px] flex flex-col text-white max-w-[289px]"
          >
            <Image src={service.icon} alt={service.title} width={44} height={44} />
            <span className="service-name">{service.title}</span>
            <span className="service-desc">{service.description}</span>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
};

export default Services;