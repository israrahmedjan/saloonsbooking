'use client'

import { Salon } from '@/app/lib/types'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function SalonDetail({ salons }: { salons: Salon }) {

  const featuredImage = salons.salon_gallery?.find(
    (image) => image.is_featured
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {salons.name}
          </h1>

          <p className="text-gray-600 mb-5">
            {/* {salons.description} */}
          </p>


          <div className="mb-5">
            <h3 className="font-semibold">
              Location
            </h3>
{salons.salon_addresses?.length && (
  <p className="text-gray-500">
    {salons.salon_addresses[0]?.city},{" "}
    {salons.salon_addresses[0]?.country}
  </p>
)}
          </div>


         <Link href={`${salons.slug}/booking/`} className='bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-300'>
      
            Book Appointment
          </Link>

        </div>


        {/* Featured Image */}
        <div>
          {featuredImage && (
            <Image
              src={featuredImage.image_url}
              alt={featuredImage.alt_text}
              width={600}
              height={400}
              className="rounded-xl object-cover"
            />
          )}
        </div>

      </section>



      {/* Gallery Section */}
      <section className="mt-14">

        <h2 className="text-3xl font-bold mb-6">
          Salon Gallery
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {salons?.salon_gallery?.map((image)=>(
            <div key={image.id}>

              <Image
                src={image.image_url}
                alt={image.alt_text}
                width={300}
                height={250}
                className="rounded-lg h-48 object-cover"
              />

            </div>
          ))}

        </div>

      </section>



      {/* Services Section */}
      <section className="mt-14">

        <h2 className="text-3xl font-bold mb-6">
          Our Services
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          {salons.services?.map((service)=>(
            
            <div
              key={service.id}
              className="border rounded-xl p-5 shadow-sm"
            >

              <h3 className="text-xl font-semibold">
                {service.name}
              </h3>


              <p className="text-gray-600 mt-2">
                Duration: {service.duration} min
              </p>


              <p className="font-bold mt-2 mb-9">
                Rs {service.price}
              </p>
 

             <p>
              <Link href={`${salons.slug}/services/${service.slug}`} className='bg-black text-white mt-10 px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-300'>
                Book Now
              </Link>
</p>
            </div>

          ))}

        </div>

      </section>



      {/* Address Section */}
      <section className="mt-14 bg-gray-100 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-3">
          Address
        </h2>


        {/* <p>
          {salons?.salon_addresses[0]?.city},{" "}
          {salons?.salon_addresses[0]?.country}
        </p> */}

        {salons.salon_addresses?.length && (
  <p className="text-gray-500">
    {salons.salon_addresses[0]?.city},{" "}
    {salons.salon_addresses[0]?.country}
  </p>
)}

      </section>


    </div>
  )
}

export default SalonDetail