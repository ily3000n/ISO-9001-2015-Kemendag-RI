"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Gallery = () => {
  const words = [
  
    {
      text: "Inspektorat",
      className: "text-blue-500 dark:text-sky-400",
    },
  
    {
      text: "Jenderal",
      className: "text-blue-500 dark:text-sky-400",
    },
  ];
  const images = [
    "slider1.jpg",
    "slider2.jpg",
    "slider3.jpg",
    "slider4.jpg",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <h1 className="text-5xl text-white font-extrabold">Sistem Penjaminan Mutu</h1>
          <h1 className="text-5xl text-white font-extrabold">ISO 9001:2015</h1>
          <TypewriterEffectSmooth words={words} />
        
      
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
        
      </motion.div>
    </ImagesSlider>
  );
}

export default Gallery;
