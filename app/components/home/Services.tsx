"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, DollarSign, Star } from "lucide-react";
import { getAverageRating } from "@/app/lib/auth";

// ============================================
// COMPONENT: Service Card (Only Card)
// ============================================
const ServiceCard = ({ service }:any) => {

 const rating = getAverageRating(service.reviews);
return(
  <div className="overflow-hidden rounded-lg shadow-sm transition-transform hover:scale-105">
    <div className="relative h-64">
      <Image
        src={service.image || "/images/services/no-image.jpeg"}
        alt={service.name}
        fill
        className="object-cover"
      />
    </div>
    <div className="space-y-4 p-5">
      <div className="flex justify-between items-center"><h4 className="text-lg text-primary">{service.name}</h4>
      <span className="flex items-center gap-1">  <Star size={16} />{rating ? rating.average : "✨ New"}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{service.duration || "60 Min"}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={16} />
          <span>{service.price}</span>
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
);
}

// ============================================
// COMPONENT: Service Grid (Heading + Cards)
// ============================================
const ServiceGrid = ({ title, description, services, isMain = false }:any) => {
  if (!services || services.length === 0) return null;

  return (
    <div className={`container mx-auto px-4 ${!isMain ? "mt-20" : ""}`}>
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        {isMain ? (
          <>
            <h4 className="text-secondary uppercase font-[500]">What I Offer</h4>
            <h2 className="mt-3">Services Crafted with Love</h2>
            <p className="mt-4 text-lg mb-6">
              Every service I offer comes from years of passion and experience. 
              I use only the best products and take my time to ensure you leave feeling amazing.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-secondary">{title}</h3>
            <p className="mt-2">{description}</p>
          </>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service:any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function Services({ services }:any) {
  const hairServices = services.filter(
    (item:any) => item.service_categories?.slug === "hair-services"
  );
  const makeupServices = services.filter(
    (item:any) => item.service_categories?.slug === "makeup"
  );
  const nailServices = services.filter(
    (item:any) => item.service_categories?.slug === "nail-services"
  );

  return (
    <section className="py-16">
      <ServiceGrid services={makeupServices} isMain={true} />
      <ServiceGrid 
        title="Nail Services" 
        description="Complete bridal transformation for your special day" 
        services={nailServices} 
      />
      <ServiceGrid 
        title="Hair Styling" 
        description="Complete bridal transformation for your special day" 
        services={hairServices} 
      />
    </section>
  );
}