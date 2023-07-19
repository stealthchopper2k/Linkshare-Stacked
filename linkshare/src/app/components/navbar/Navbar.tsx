"use client";
import React from "react";
import Image from "next/image";
import LogBtn from "../login/handle";

const Navbar: React.FC = () => {
  return (
    <nav className="z-10 bg-black border-b-4 border-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="#" className="flex items-center">
          <Image
            src="/rab-bit.svg"
            alt="Flowbite Logo"
            width={32}
            height={32}
            className="h-8 mr-2"
          />

          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            RabbitHole
          </span>
        </a>
        <div
          className="hidden w-full md:block md:w-auto text-white"
          id="navbar-dropdown"
        >
          <LogBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
