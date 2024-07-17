"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import BoxReveal from "@/components/magicui/box-reveal";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Gallery {
  id: number;
  image_path: string;
}

const Gallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const words = [
    {
      text: "Inspektorat",
      className: "text-green-500 ",
    },
    {
      text: "Jenderal",
      className: "text-green-500 ",
    },
  ];

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    if (!backendUrl) {
      toast.error('Backend URL is not defined');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/galleries`);
      if (!response.ok) {
        throw new Error('Failed to fetch galleries');
      }
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        id: item.ID,
        image_path: item.image_path,
      }));
      setGalleries(formattedData);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast.error('Error fetching galleries');
    }
  };

  const images = galleries.map((gallery) => `${backendUrl}/${gallery.image_path}`);

  return (
    <ImagesSlider className="h-[39rem]" images={images}>
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
        className="z-50 flex flex-col justify-center items-center px-4 md:px-8 lg:px-16"
      >
        <div className="flex flex-col items-center justify-center h-[40rem] space-y-4 md:space-y-6">
          <BoxReveal boxColor="#49AA4A" duration={0.5}>
            <h1 className="text-3xl md:text-5xl text-white font-extrabold text-center">Sistem Manajemen Mutu</h1>
          </BoxReveal>
          <BoxReveal boxColor="#49AA4A" duration={0.5}>
            <h1 className="text-3xl md:text-5xl text-white font-extrabold text-center">ISO 9001:2015</h1>
          </BoxReveal>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4">
            {/* Uncomment buttons if needed */}
            {/* 
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
              Join now
            </button>
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
              Signup
            </button> 
            */}
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </ImagesSlider>
  );
}

export default Gallery;
