'use client'
import React from 'react'
import { Salon,Service } from '@/app/lib/types';
import Link from 'next/link';
import { Sparkles } from "lucide-react";
import Cart from './Cart';
function SaloonServices({salons,service_id}:{salons:Salon,service_id:number}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className=''>

      <Cart />
  {/* {JSON.stringify(service_id,null,2)} */}
          <div className="space-y-3 rounded-2xl p-6 shadow-sm mb-10">
          {/* ccc   {baseUrl} */}
         <h4 className="flex items-center gap-2 border-secondary/20 border-b leading-16  text-xl font-semibold">
  <Sparkles className="h-5 w-5 text-secondary" />
  Explore More Services
</h4>
  { salons.services?.map((service:Service) => (
   <div
  key={service.id}
  className={`rounded-xl p-4 ${
    service_id === service.id
      ? "bg-secondary/10 text-white border-secondary"
      : "bg-white"
  } hover:bg-secondary/10 shadow-sm transition`}
> <Link href={`${baseUrl}/salons/${salons.slug}/services/${service.slug}`}>
   <h3 className="text-lg text-primary ">
       
        {service.name}
       
      </h3> 

      <div className="mt-2 flex items-center justify-between text-sm">
        <span>{service.duration}</span>
        <span className="font-medium text-secondary">
          {service.price}
        </span>
      </div>
      </Link>
    </div>
  ))}
</div>  
    </div>
  )
}

export default SaloonServices