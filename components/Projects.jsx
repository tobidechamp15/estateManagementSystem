import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import runRideImg from "../public/assets/RunRideLand.png";
import taskify from "../public/assets/taskifyImg.jpg";
import invoiceXpress from "../public/assets/invoicexpressImg.png";
import thrift4all from "../public/assets/thrift4allmg.png";
import send from "../public/assets/send.svg";
import trendMart from "../public/assets/trendMart.svg";
import turnUpLagos from "../public/assets/turnuplagos.png";
import theWorkNub from "../public/assets/theworknub.png";

const projectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
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

  return (
    <motion.div
      className="flex flex-col gap-[40px] items-center mb-[190px] xsm:px-[25px]"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="sub-head ">Projects</span>
        <span className="sub-des ">Some of my Work</span>
      </div>
      <div className="skills flex gap-[55px] flex-wrap max-w-[1000px] items-center justify-center">
        <span className="">React</span>
        <span className="">Firebase</span>
        <span className="">JavaScript</span>
        <span className="">JQuery</span>
        <span className="">Next.js</span>
        <span className="">Framer Motion</span>
      </div>
      <div className="flex mt-[50px] gap-3 flex-wrap max-w-[1200px] justify-center">
        {[
          {
            href: "https://run-ride.vercel.app/",
            src: runRideImg,
            alt: "Run-Ride project screenshot",
            name: "Run-Ride",
            tech: "React | Firebase | GitHub",
          },
          {
            href: "https://taskify-tobiloba.vercel.app/",
            src: taskify,
            alt: "Taskify project screenshot",
            name: "Taskify",
            tech: "React | Firebase | GitHub",
          },
          {
            href: "https://invoicexpress.netlify.app",
            src: invoiceXpress,
            alt: "invoiceXpress project screenshot",
            name: "invoiceXpress",
            tech: "React | Firebase | Bootstrap",
          },
          {
            href: "https://thrift4all.vercel.app/",
            src: thrift4all,
            alt: "Thrift4all project screenshot",
            name: "Thrift4all",
            tech: "React | Tailwindcss | GitHub",
          },
          {
            href: "https://trendmart-tobiloba.netlify.app/",
            src: trendMart,
            alt: "TrendMart project screenshot",
            name: "Trend Mart",
            tech: "NextJs | Tailwindcss | NextAuth | MongoDB",
          },
          {
            href: "https://turnuplagos.netlify.app/",
            src: turnUpLagos,
            alt: "Turnuplagos project screenshot",
            name: "Turn Up Lagos",
            tech: "React | Tailwindcss | GitHub | Firebase",
          },
          {
            href: "https://turnuplagos.netlify.app/",
            src: theWorkNub,
            alt: "Turnuplagos project screenshot",
            name: "The Work Nub",
            tech: "NextJs | Tailwindcss | GitHub",
          },
        ].map((project, index) => (
          <motion.a
            key={index}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer group relative flex flex-col gap-6 bg-black p-3 rounded-xl transform transition duration-300 hover:scale-105 hover:bg-gray-800"
            variants={projectVariants}
          >
            <div className="img-container overflow-hidden rounded-lg">
              <Image
                src={project.src}
                className="w-full h-full object-cover transition duration-300 transform group-hover:scale-110 min-w-[365px]"
                alt={project.alt}
              />
            </div>
            <div className="flex justify-between items-center">
              <section className="flex flex-col gap-2">
                <span className="project-name text-white text-lg font-semibold transition duration-300 group-hover:text-[#4FC3F7]">
                  {project.name}
                </span>
                <span className="project-tech text-gray-400 text-sm">
                  {project.tech}
                </span>
              </section>
              <Image
                src={send}
                className="w-6 h-6 transition duration-300 transform group-hover:rotate-45 group-hover:text-[#4FC3F7]"
                alt="Send icon"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3F7] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-xl"></div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
