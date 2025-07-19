import Image from "next/image";
import React from "react";
import gmailIcon from "../public/assets/gmailIcon.svg";
import linkedinIcon from "../public/assets/linkedinIcon.svg";
import instaIcon from "../public/assets/instaIcon.svg";
import twitIcon from "../public/assets/twitIcon.svg";
import githubIcon from "../public/assets/githubIcon.svg";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col gap-[40px] items-center  xsm:px-[25px] w-full ">
        <div className="flex w-full items-center justify-around">
          <span className="foot-des md:max-w-[630px]">
            Let's Work Together!{`  `}
          </span>
          {/* <a
            href=" tobidechamp15@gmail.com"
            className="gmail flex flex-wrap gap-2 items-center border border-gray-300 p-2 rounded-xl"
          >
            <Image src={gmailIcon} />
            tobidechamp15@gmail.com
          </a> */}
        </div>
      </div>
      <hr className="w-full border-[#484E53] my-7" />
      <div className=" flex flex-wrap justify-around w-full my-[36px]">
        <span className="reserved">@2024 all rights reserved.</span>
        <div className="flex gap-3 items-center">
          <a href="https://www.linkedin.com/in/tobiloba-emmanuel-4bba71249/">
            <Image src={linkedinIcon} />
          </a>
          <a href="https://www.instagram.com/de_champ__/">
            <Image src={instaIcon} />
          </a>
          <a href="https://x.com/tobidechamp15">
            <Image src={twitIcon} />
          </a>
          <a
            href="https://github.com/tobidechamp15"
            style={{ clipPath: "circle(50% at 50% 50%)" }}
          >
            <Image src={githubIcon} className="w-[32px] bg-[#aeb0b4]" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
