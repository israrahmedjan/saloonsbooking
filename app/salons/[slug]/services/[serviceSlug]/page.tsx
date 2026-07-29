import CalendarContant from "@/app/components/booking/calendar";
import Breadcrumbs from "@/app/components/general/breadcrumbs";
import { supabase } from "@/app/lib/supabaseClient";
import { Salon } from "@/app/lib/types";
import React from "react";
import { Calendar } from "lucide-react";


type Props = {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug, serviceSlug } = await params;

  // let service_id = 0;
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
          duration,
          max_slots
        )
      `)
      .eq("slug", slug)
      .single();
    if (error) {
      console.log(error.message);
      return;
    }
    salons = data;

    if (salons) {
      // Run any additional logic or operations with the retrieved salon data here       
    }

  } catch (error: unknown) {
    console.log(
      "Supabase Error:",
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  }

  const service = salons?.services?.find(
    (item) => item.slug === serviceSlug
  );

  if (!service) {
    return;
  }

  const service_id = service.id;

    const breadcrumbs = {

    Salon_slug: salons?.name || "SalonName",
    Service_slug: service?.name || "ServiceName",

  }


  return (
    <>

        <Breadcrumbs breadcrumbs={breadcrumbs} />

          {/* {JSON.stringify(service,null,2)} */}

      {/* Section Calendar */}

      <section className="py-2">
        <div className="container py-3 mb-6 mt-10  flex justify-between ">
         <h4 className="flex items-center gap-2">
  <Calendar className="h-8 w-8 text-secondary" />
  {salons?.name} - ({service?.name}) - (<span className="text-secondary">  ${service?.price}</span>)
</h4>

          {/* <h4>{salons?.name} - ({service?.name})</h4> */}
        </div>
        {salons && (<div className="">
          {salons?.id && salons?.services?.[0]?.id && (
            <CalendarContant
              salons={salons}
              salon_id={salons.id}
              service={service}
            />
          )}
        </div>)}
      </section>

    </>

  );
}
