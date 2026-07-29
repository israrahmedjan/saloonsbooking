"use client";

import Link from "next/link";
import { Calendar1 } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function HeroSection() {

    useEffect(()=>
    {
       async function get_category()
        {
// const { data, error } = await supabase
//   .from("services")
//   .select(`
//     *,
//     service_categories!inner(*),
//     salons!inner(*)
//   `)
//   .eq("salons.slug", 'royal-beauty-salon')
//   .in("service_categories.slug", [
//     "haircuts",
//     "hairstyling"
//   ])

//   const { data, error } = await supabase
//   .from("services")
//   .select(`
//     *
//   `)
//   .eq("saloon_id", 1) // Salon ID
//   .eq("id", 1)        // Category ID
//   .single();


  //console.log('category data111', data);
        }
   get_category();
    },[])

    return (
        <section
            className="relative mt-11 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/banner1.png')",
            }}
        >
            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-white/50 text-black" />

            <div className="relative container mx-auto px-4 py-20 lg:py-32">
                <div className="max-w-2xl space-y-6">
                    {/* 1. Small Label */}
                    {/* <div>
            <span>Premium Salon & Beauty Care</span>
          </div> */}

                    {/* 2. Main Heading */}
                    <div>
                        <h1 className="flex flex-col gap-2 font-normal">
                            <span>Elevate Your</span>
                            <span className="text-secondary">Natural Beauty</span>
                        </h1>
                    </div>

                    {/* 3. Description */}
                    <div>
                        <p className="text-lg text-black/80">
                            Hi there! I'm Anu, and I'd love to help you look and feel absolutely beautiful.
                            Whether it's your wedding day or just a night out, let's create magic together!
                        </p>
                    </div>

                    {/* 4. Features */}
                    <div className="flex flex-wrap gap-4 mt-12">
                        <Link
                            href="/appointment"
                            className="btn-type-1 text-lg py-2"
                        >
                            <Calendar1 size={18} />
                            Book Appointment
                        </Link>

                        <Link
                            href="/appointment"
                            className="btn-type-2 text-lg text-secondary py-2 font-semibold"
                        >

                            Expolore Our Services
                        </Link>
                    </div>



                </div>
            </div>
        </section>
    );
}