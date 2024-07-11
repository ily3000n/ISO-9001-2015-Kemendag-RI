"use client";
import React from "react";
import Image from 'next/image'; // Import the Image component from Next.js
import { TypeAnimation } from 'react-type-animation';

const Header = () => {
  return (
    <div className="h-full w-full bg-white flex items-center justify-center p-3">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center justify-start w-2/4">
          <Image 
            src="/logo.svg" // Replace with the path to your logo image
            alt="Logo"
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-end w-2/4">
          {/* <h1 className="md:text-7xl text-2xl lg:text-md font-bold text-blue-950 text-left"> */}
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
              style={{ fontSize: '2rem' }}
              repeat={Infinity}
              className="md:text-7xl text-2xl lg:text-md font-bold text-blue-950 text-left"
            />
          {/* </h1> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
