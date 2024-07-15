"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Use Next.js Link component
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <div className='max-w-[100%] mx-auto py-auto px-4 grid lg:grid-cols-3 gap-8 text-white bg-slate-800 font-poppins text-sm'>
        <div className='flex  flex-col'>
          <Image 
            src="/logo.png" // Path to your logo
            alt="Logo"
            width={300} 
            height={300} 
            className="mr-4 py-5"
          />
          <p>Jalan M. I. Ridwan Rais, No. 5 Daerah Khusus Ibukota
          Jakarta 10110, Indonesia</p>
        </div>
        <div className='flex flex-col items-center lg:text-left lg:text-md'>
          <h2 className='font-bold mb-2 my-7'>Contact Us</h2>
          <p>Email: informasipublik.itjen@kemendag.go.id</p>
          <p>Hotline: 08561100095</p>
          
          <div className='flex mt-2 text-2xl'>
            {/* <a target="blank" href="https://facebook.com" className='text-white mr-4'><FaFacebookSquare /></a> */}
            <a target="blank" href="https://x.com/Itjen_Kemendag" className='text-white mr-4'><FaXTwitter /></a>
            <a target="blank" href="https://www.instagram.com/itjen_kemendag" className='text-white'><IoLogoInstagram /></a>
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <Image 
            src="/ayodagang.svg" // Path to your ayodagang.svg image
            alt="Ayo Dagang Logo"
            width={300} 
            height={300} 
          />
        </div>
        <div className='lg:col-span-3 text-center mb-5'>
          <p>&copy; {currentYear} Inspektorat Jenderal Kementerian Perdagangan Republik Indonesia. All rights reserved.</p>
        </div>
      </div>  
    );
};

export default Footer;
