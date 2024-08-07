"use client";
import React from "react";
import Image from 'next/image'; // Import the Image component from Next.js
import { TypeAnimation } from 'react-type-animation';

const Header = () => {
  return (
    <div className="h-full w-full bg-blue-950 flex items-center justify-center p-3 text-white ">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center justify-start w-2/4">
        <a href="/">
          <Image 
            src="/logo_textwhite.svg" // Replace with the path to your logo image
            alt="Logo"
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
            className="object-contain"
            
          />
          </a>
        </div>
        <div className="flex items-center justify-end w-2/4">
          <TypeAnimation
            sequence={[
              'ISO',
              1000,
              'ISO 9001 ',
              1000,
              'ISO 9001 : ',
              1000,
              'ISO 9001 : 2015',
              1000,
            ]}
            speed={50}
            style={{ fontSize: '' }}
            repeat={Infinity}
            className="md:text-3xl sm:text-3xl lg:text-md font-bold text-white text-left"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
