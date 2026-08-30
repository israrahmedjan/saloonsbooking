
import Breadcrumbs from "@/app/components/general/breadcrumbs";


// type Props = {
//   params: Promise<{
//     slug: string;
  
//   }>;
// };



import type { Metadata } from "next";
import { getPageMetadata } from "@/app/lib/meta";
// TYPES
// ============================================
type Props = {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const metadata = await getPageMetadata(slug, serviceSlug);
  return metadata;
  
}
export default async function Page({ params }: Props) {
    const { slug } = await params;
  const breadcrumbs = {

    Salon_slug: slug || "Services",
    Service_slug: "Our Services",

  }


  return (
    <>

      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {/* {JSON.stringify(service,null,2)} */}

      {/* Section Calendar */}
<section className="py-12">
  <div className="container text-center">
    <h2 className="text-3xl font-bold mb-4">Our Current Page - {slug}</h2>

    <div className="max-w-2xl mx-auto rounded-xl border bg-muted/30 p-8">
      <h3 className="text-2xl font-semibold mb-3">
        🚧 Coming Soon
      </h3>

      <p className="text-muted-foreground">
        We're working hard to bring you an amazing selection of professional
        salon services. This section will be available soon. Thank you for your
        patience—we can't wait to serve you!
      </p>
    </div>
  </div>
</section>

    </>

  );
}
