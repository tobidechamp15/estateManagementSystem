import Image from "next/image";
import backImage from "../public/assets/heroBg.svg";
import Hero from "@/components/Hero";
import Navbar from "@/components/NavBar";
import Services from "@/components/Services";
import About from "@/components/About";
import Projects from "@/components/Projects";
import React from "react";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen container">
      {/* <div className="absolute top-0 h-auto w-full z-0">
        <Image src={backImage} alt="backImage" />
      </div> */}
      <div className="flex flex-col heroBg">
        <Navbar />
        <Hero />
      </div>
      <Services />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
