"use client"

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";


export default function Home() {
  return (

      <main className="font-poppins">
        <div className="w-full text-blue-950">
          <Header />
          <Gallery />
          <Card />
          <Footer />
          
         
          
        </div>
      </main>
    
  );
}
