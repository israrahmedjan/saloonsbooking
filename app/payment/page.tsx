
import Breadcrumbs from "@/app/components/general/breadcrumbs";
import { supabase } from "@/app/lib/supabaseClient";
import Payment from "../components/booking/payment";


type Props = {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
};
export default async function Page({ params }: Props) {
    const { slug, serviceSlug } = await params;
  const breadcrumbs = {

    Salon_slug: slug || "Form",
    Service_slug: serviceSlug || "Check Out",

  }


  return (
    <>

      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {/* {JSON.stringify(service,null,2)} */}

      {/* Section Calendar */}

      <section className="py-2 ">
        <div className="container py-3 mb-6 mt-10 ">
          <h4 className="flex items-start gap-2">

            Check Out
          </h4>
          <Payment />
        </div>
      </section>

    </>

  );
}
