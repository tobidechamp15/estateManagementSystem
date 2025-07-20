import Image from "next/image";
import React from "react";
import gmailIcon from "../public/assets/gmailIcon.svg";
import linkedinIcon from "../public/assets/linkedinIcon.svg";
import instaIcon from "../public/assets/instaIcon.svg";
import twitIcon from "../public/assets/twitIcon.svg";
import githubIcon from "../public/assets/githubIcon.svg";
import logo from "../public/assets/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Gets the current year

  return (
    <>
      <div className="flex flex-col gap-[40px] items-center  xsm:px-[25px] w-full ">
        <div className="flex w-full flex-col gap-4 ">
          <span className="foot-des md:max-w-[630px]">
            <Image src={logo} alt="logo " />
          </span>
          <div className=" gap-[32px] items-center itemTabs flex flex-wrap">
            <span>Home</span>
            <span>About Us</span>
            <span>How it work</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
      <hr className="w-full border-[#a8a6a6] my-7" />
      <div className=" flex flex-wrap justify-between w-full my-[36px]">
        <span className="reserved">
          © {currentYear} ESMS. All rights reserved.
        </span>
        <div className="flex flex-wrap gap-4  ">
          <span className="reserved">Terms</span>
          <span className="reserved">Privacy</span>
          <span className="reserved">Cookies</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
