"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";

// const services = [
//   {
//     id: 1,
//     title: "Hair Styling",
//     image: "/images/fasher.png",
//     rating: 4.9,
//     duration: "60 Min",
//   },
//   {
//     id: 2,
//     title: "Bridal Makeup",
//     image: "/images/fasher.png",
//     rating: 5.0,
//     duration: "120 Min",
//   },
//   {
//     id: 3,
//     title: "Facial Treatment",
//     image: "/images/fasher.png",
//     rating: 4.8,
//     duration: "45 Min",
//   },
//   {
//     id: 4,
//     title: "Nail Care",
//    image: "/images/fasher.png",
//     rating: 4.7,
//     duration: "40 Min",
//   },
// ];

export default function Services({services,}: {services: any[]})  {

  const hairServices = services.filter(
  (item) => item.service_categories.slug === "hair-services"
);
const MakeupServices = services.filter(
  (item) => item.service_categories.slug === "makeup"
);
const nailServices = services.filter(
  (item) => item.service_categories.slug === "nail-services"
);


  console.log('Hair Cut categoires', hairServices);
  return (
    <section className="py-16">
      {MakeupServices.length>0 && (
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h4 className=" text-secondary uppercase font-[500]">
            What I Offer
          </h4>

          <h2 className="mt-3">
            Services Crafted with Love
          </h2>

          <p className="mt-4 text-lg mb-6">
            Every service I offer comes from years of passion and
            experience. I use only the best products and take my time to
            ensure you leave feeling amazing.
          </p>
          <h3 className="text-secondary">Bridal Makeup</h3>
          <p className="mt-2">Complete bridal transformation for your special day</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {MakeupServices.map((service) => (
            <div key={service.id} className="overflow-hidden rounded-lg shadow-sm transition-transform hover:scale-105">
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={service.image  || "/images/services/no-image.jpeg"}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 p-5">
                <h4 className="text-lg text-primary">{service.name}</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
              {/* <span>
  {service.reviews.length > 0
    ? (
        service.reviews.reduce((sum:number, review:any) => sum + review.rating, 0) /
        service.reviews.length
      ).toFixed(1)
    : "0.0"}
</span> */}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <Link
                  href={`/salons/${service.salons?.slug}/services/${service?.slug}`}
                  className="block text-center btn-type-2 font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
)}


      {/* Party Events */}
          <div className="container mx-auto px-4 mt-20">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
  
         
          <h3 className="text-secondary">Nail Services</h3>
          <p className="mt-2">Complete bridal transformation for your special day</p>
        </div>

        {/* Cards */}
        {nailServices.length>0 && (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {nailServices.map((service) => (
            <div key={service.id} className="overflow-hidden rounded-lg shadow-sm transition-transform hover:scale-105">
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={service.image  || "/images/services/no-image.jpeg"}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 p-5">
                <h4 className="text-lg text-primary">{service.name}</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                     {/* <span>
  {service.reviews.length > 0
    ? (
        service.reviews.reduce((sum:number, review:any) => sum + review.rating, 0) /
        service.reviews.length
      ).toFixed(1)
    : "0.0"}
</span> */}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <Link
                  href={`/salons/${service.salons?.slug}/services/${service?.slug}`}
                  className="block text-center btn-type-2 font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>)}
        
      </div>



           {/* Hair Style */}
           {hairServices.length>0 && (   <div className="container mx-auto px-4 mt-20">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
  
         
          <h3 className="text-secondary">Hair Styling</h3>
          <p className="mt-2">Complete bridal transformation for your special day</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {hairServices.map((service) => (
            <div key={service.id} className="overflow-hidden rounded-lg shadow-sm transition-transform hover:scale-105">
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={service.image  || "/images/services/no-image.jpeg"}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 p-5">
                <h4 className="text-lg text-primary">{service.name}</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    {/* <span>
  {service.reviews.length > 0
    ? (
        service.reviews.reduce((sum:number, review:any) => sum + review.rating, 0) /
        service.reviews.length
      ).toFixed(1)
    : "0.0"}
</span> */}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                </div>

               <Link
                  href={`/salons/${service.salons?.slug}/services/${service?.slug}`}
                  className="block text-center btn-type-2 font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>)}
       
    </section>
  );
}