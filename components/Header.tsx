"use client";
import React from "react";
import Image from 'next/image'; // Import the Image component from Next.js
import { TypeAnimation } from 'react-type-animation';

const Header = () => {
  return (
    <div className="h-full w-full bg-white flex items-center justify-between overflow-hidden p-5">
      <div className="flex items-center w-full justify-between">
        <div className="w-2/4 flex justify-start ">
          <Image 
            src="/logo.svg" // Replace with the path to your logo image
            alt="Logo"
            width={250} // Adjust width as needed
            height={250} // Adjust height as needed
            className="object-contain"
          />
        </div>
        <div className="w-2/4 flex justify-end">
          <h1 className="md:text-7xl text-2xl lg:text-4xl font-bold text-blue-950 text-left">
            <div>
                ISO 9001:2015
            
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
