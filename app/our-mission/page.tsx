import type { Metadata } from "next";

import Breadcrumbs from "@/app/components/general/breadcrumbs";
import { getPageMetadata } from "@/app/lib/meta";
import { getPageWithSections } from "../lib/dbOperations";
import PageSections from "../components/pageSections/about-us/PageSections";
import Image from "next/image";


type Props = {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  // const { slug, serviceSlug } = await params;

  return getPageMetadata("about-us", "about-us");
}

export default async function Page() {
  // const { slug } = await params;

  const breadcrumbs = {
    Salon_slug: "Services",
    Service_slug: "Our Services",
  };

  const { title, page_sections } = await getPageWithSections(
    "our-mission",
    "our-mission"
  );

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}

      <section className="py-12 mt-16">
        <div className="container">
          {/* <h1 className="text-3xl font-bold mb-8 text-left">
            {title}
          </h1> */}

     {page_sections && page_sections.length > 0 && (
     <PageSections sections={page_sections ?? []} />
     )}
          
        </div>
      </section>
    </>
  );
}