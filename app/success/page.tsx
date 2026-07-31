
import Breadcrumbs from "@/app/components/general/breadcrumbs";
import Success from "../components/booking/Success";
import SuccessPage from "../components/booking/Success";


type Props = {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
};
export default async function Page({ params }: Props) {
    const { slug, serviceSlug } = await params;
  const breadcrumbs = {

    Salon_slug: slug || "Thank You",
    Service_slug: serviceSlug || "Transaction Successfully Completed",

  }


  return (
    <>

      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {/* {JSON.stringify(service,null,2)} */}

      {/* Section Calendar */}

      <section className="py-2 ">
        <div className="container py-3 mb-6 mt-10 ">
        
          <SuccessPage />
        </div>
      </section>

    </>

  );
}
