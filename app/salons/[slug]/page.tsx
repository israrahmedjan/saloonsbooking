import SalonDetail from "@/app/components/saloons/salonDetail";
import { supabase } from "@/app/lib/supabaseClient";
import { Salon } from "@/app/lib/types";
import React from "react";

async function Page({ params }: { params: { slug: string } }) {
const { slug } = await params;
  console.log('Test slug',slug);
  
  let salons: Salon | null = null;
    try {
      
   const { data, error } = await supabase
    .from("salons")
    .select(`
      id,
      name,
      slug,
      description,

      services (
        id,
        name,
        price,
        slug,
        duration
      ),

      salon_gallery (
        id,
        image_url,
        alt_text,
        title,
        is_featured
      ),

      salon_addresses (
        id,
        city,
        country
      )
    `)
    .eq("slug", slug)
    .single();
    if (error) {
      console.log(error.message);
      return;
    }
      salons = data;
  
      console.log("Salons Data:");
     // console.log(JSON.stringify(data, null, 2));
  
    } catch (error: unknown) {
  console.log(
    "Supabase Error:",
    error instanceof Error 
      ? error.message 
      : "Something went wrong"
  );
}
  

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Salon Details: 
      </h1>
 <pre className="mt-10 bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
  { salons && 
  (
    <div>
      <SalonDetail salons={salons} />
    </div>
  ) }

</pre>
    </div>
  );
}

export default Page;