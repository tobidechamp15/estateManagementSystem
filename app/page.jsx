"use client";

import NavBar from "@/components/NavBar";
import React from "react";
import "./globals.css";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="bg-[#1A1A1A]   flex flex-col items-center ">
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
