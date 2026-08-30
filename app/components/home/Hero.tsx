"use client";

import Link from "next/link";
import { Calendar1 } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";

export default function HeroSection({heroData}:{heroData:any}) {
 const { setSalon } = useUserStore();
  //console.log("Hero Data", heroData);
    useEffect(()=>
    {
   if(heroData)
   {
      setSalon(heroData);
   }
    
    },[])

    return (
   <section
  className="relative mt-11 min-h-[70vh] md:min-h-[80vh] lg:min-h-screen bg-cover bg-center md:bg-right bg-no-repeat flex items-center"
  style={{
    backgroundImage: "url('/images/banner1.png')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-white/50" />
{heroData && (
<div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
    <div className="max-w-xl lg:max-w-2xl space-y-6">
      {/* Heading */}
      <h1 className="flex flex-col gap-2 font-normal leading-tight">
        <span className="text-4xl sm:text-5xl lg:text-6xl">
          Elevate Your
        </span>

        <span className="text-secondary text-4xl sm:text-5xl lg:text-6xl">
          Natural Beauty
        </span>
      </h1>

      {/* Description */}
      <p className="max-w-lg text-base sm:text-lg text-black/80 leading-7">
        Hi there! I'm Anu, and I'd love to help you look and feel absolutely
        beautiful. Whether it's your wedding day or just a night out, let's
        create magic together!
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          href={`/salons/${heroData.salons.slug}/services/${heroData.slug}`}
          className="btn-type-1 w-full sm:w-auto justify-center text-base md:text-lg py-2.5"
        >
          <Calendar1 size={18} />
          Book Appointment
        </Link>

        <Link
          href={`/salons/${heroData.salons.slug}/services/${heroData.slug}`}
          className="btn-type-2 w-full sm:w-auto justify-center text-base md:text-lg py-2.5 font-semibold"
        >
          Explore Our Services
        </Link>
      </div>
    </div>
  </div>
)}
  
</section>
    );
}