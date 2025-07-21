"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import visitorIcon from "../public/assets/visitorIcon.svg";
import residentIcon from "../public/assets/residentIcon.svg";
import securityIcon from "../public/assets/securityIcon.svg";

const projectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const features = [
    {
      img: residentIcon,
      category: "For Residents",
      items: [
        "Receive a unique invite & register easily",
        "Invite visitors with a few clicks",
      ],
    },
    {
      img: visitorIcon,
      category: "For Visitors",
      items: [
        "Get digital visitor passes instantly",
        "Scan QR code at security for seamless entry",
      ],
    },
    {
      img: securityIcon,
      category: "For Security Personnel",
      items: [
        "Verify visitors with instant QR scans",
        "Monitor active & expected visitors in real time",
      ],
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-[40px] items-center mb-[80px] "
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3 },
        },
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="pill">How it works</span>
      </div>

      <motion.div
        variants={projectVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1000px] w-full"
      >
        {features.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center gap-4"
            variants={projectVariants}
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <Image
                src={project.img}
                alt={project.category}
                width={48}
                height={48}
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              {project.category}
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {project.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
