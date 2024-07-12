// eslint-disable-next-line no-unused-vars
"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Use Next.js Link component

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <div className='max-w-[100%] mx-auto py-auto px-4 grid lg:grid-cols-3 gap-8 text-white bg-slate-800 font-poppins'>
        <div className='flex items-center'>
          <Image 
            src="/logo.png" // Ganti dengan path ke logo Anda
            alt="Logo"
            width={300} // Adjusted the width and height for the logo
            height={300} 
            className="mr-4"
          />
        
        </div>
        <div className='flex flex-col text-sm '>
          <h2 className='font-bold mb-2 mt-2'>Navigation</h2>
          <ul>
            <li><Link href="/" className='text-sm text-white'>Home</Link></li>
            <li><Link href="/about" className='text-sm text-white'>About Us</Link></li>
            <li><Link href="/contact" className='text-sm text-white'>Contact</Link></li>
            <li><Link href="/services" className='text-sm text-white'>Services</Link></li>
            <li><Link href="/privacy" className='text-sm text-white'>Privacy Policy</Link></li>
          </ul>
        </div>
        <div className='flex flex-col text-sm'>
          <h2 className=' font-bold mb-2 mt-2'>Contact Us</h2>
          <p className='text-sm'>Email: info@example.com</p>
          <p className='text-sm'>Phone: (123) 456-7890</p>
          <p className='text-sm'>Address: Jl. M. I. Ridwan Rais, No. 5 Daerah Khusus Ibukota
          Jakarta 10110, Indonesia</p>
          <div className='flex mt-2 text-sm'>
            <a href="https://facebook.com" className='text-sm text-white mr-4'>Facebook</a>
            <a href="https://twitter.com" className='text-sm text-white mr-4'>Twitter</a>
            <a href="https://instagram.com" className='text-sm text-white'>Instagram</a>
          </div>
        </div>
        <div className='lg:col-span-3 text-center'>
          <p className='text-sm'>&copy; {currentYear} Inspektorat Jenderal Kementerian Perdagangan Republik Indonesia. All rights reserved.</p>
        </div>
      </div>
    );
};

export default Footer;
