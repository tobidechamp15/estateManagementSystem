"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/assets/logo.svg";
import ham from "../public/assets/ham.svg";
import SideBar from "./SideBar";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const handleSidebar = () => {
    setIsActive(!isActive);
    console.log("sidebar handled");
  };
  return (
    <div className="flex justify-between min-w-full items-center py-2">
      {isActive && <SideBar setIsActive={setIsActive} isActive={isActive} />}
      <section className="flex gap-[40px]   ">
        <span>
          <Image src={logo} alt="logo" />
        </span>
        <div className=" gap-[32px] items-center itemTabs hidden md:flex">
          <span>Home</span>
          <span>About Us</span>
          <span>How it work</span>
          <span>Contact Us</span>
        </div>
      </section>
      <a
        href="/login"
        className="hidden md:flex bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
      >
        Log in
      </a>
      <Image
        src={ham}
        alt="ham"
        className="block md:hidden cursor-pointer"
        onClick={handleSidebar}
      />
    </div>
  );
};

export default Navbar;
