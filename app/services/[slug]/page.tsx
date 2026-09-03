
import Breadcrumbs from "@/app/components/general/breadcrumbs";


// type Props = {
//   params: Promise<{
//     slug: string;
  
//   }>;
// };



import type { Metadata } from "next";
import { getPageMetadata } from "@/app/lib/meta";
import { getPageWithSections } from "@/app/lib/dbOperations";
import PageSections from "@/app/components/pageSections/about-us/PageSections";
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

  const { title, page_sections } = await getPageWithSections(
    "about-us",
    "our-services"
  );

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}

      <section className="py-12 mt-8">
        {page_sections && page_sections.length > 0 && (
<PageSections sections={page_sections ?? []} />
)}
      
      </section>
    </>
  );
}