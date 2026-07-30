import CalendarContant from "@/app/components/booking/calendar";
import Breadcrumbs from "@/app/components/general/breadcrumbs";
import ServiceHeader from "@/app/components/booking/ServiceHeader";
import { supabase } from "@/app/lib/supabaseClient";
import { Salon } from "@/app/lib/types";
import React from "react";
import { Calendar, DollarSign, Clock3 } from "lucide-react";
import Reviews from "@/app/components/booking/reviews";

// ============================================
// TYPES
// ============================================
type Props = {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
};



// ============================================
// HELPER FUNCTIONS
// ============================================

// Get average rating from reviews
const getAverageRating = (reviews: any[] | undefined): string | null => {
  if (!reviews || reviews.length === 0) return null;
  
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = total / reviews.length;
  return average.toFixed(1);
};

// Get review count
const getReviewCount = (reviews: any[] | undefined): number => {
  return reviews?.length || 0;
};

// Format price
const formatPrice = (price: number): string => {
  return `$${price?.toFixed(2) || "0.00"}`;
};

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ============================================
// MAIN COMPONENT
// ============================================
export default async function Page({ params }: Props) {
  // ============================================
  // 1. PARAMS EXTRACT
  // ============================================
  const { slug, serviceSlug } = await params;

  // ============================================
  // 2. STATE VARIABLES
  // ============================================
  let salons: any | null = null;
  let service: any | null = null;
  let serviceReviews: any[] = [];
  let errorMessage: string | null = null;

  // ============================================
  // 3. FETCH DATA FROM SUPABASE
  // ============================================
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
          duration,
          max_slots,
          reviews (
            id,
            rating,
            comment,
            user_id,
            created_at
          )
        )
      `)
      .eq("slug", slug)
      .single();

    if (error) {
      errorMessage = error.message;
      console.error("Supabase Error:", errorMessage);
    } else {
      salons = data;
    }
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : "Something went wrong";
    console.error("Supabase Error:", errorMessage);
  }

  // ============================================
  // 4. FIND CURRENT SERVICE
  // ============================================
  if (salons?.services) {
    service = salons.services.find(
      (item: any) => item.slug === serviceSlug
    ) || null;
  }

  // ============================================
  // 5. EXTRACT SERVICE REVIEWS
  // ============================================
  if (service?.reviews) {
    serviceReviews = service.reviews;
  }

  // ============================================
  // 6. CALCULATE RATINGS
  // ============================================
  const averageRating = getAverageRating(serviceReviews);
  const reviewCount = getReviewCount(serviceReviews);

  // ============================================
  // 7. BREADCRUMBS
  // ============================================
  const breadcrumbs: any = {
    Salon_slug: salons?.name || "SalonName",
    Service_slug: service?.name || "ServiceName",
  };

  return (
    <>

        <Breadcrumbs breadcrumbs={breadcrumbs} />

          {/* {JSON.stringify(service,null,2)} */}

      {/* Section Calendar */}

      <section className="py-2">
     <ServiceHeader service={service} averageRating={averageRating} />
        {salons && (<div className="">
          {salons?.id && salons?.services?.[0]?.id && (
           <>
           <CalendarContant
              salons={salons}
              salon_id={salons.id}
              service={service}
            />
              {serviceReviews && (
      <div className="container">
              <Reviews 
                serviceReviews={serviceReviews}
                salonId={salons?.id}
              />
              </div>
          )}
          </>
          )}
        
        </div>)}

    
      </section>

    </>

  );
}
