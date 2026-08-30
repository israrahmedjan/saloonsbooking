import { supabase } from "./supabaseClient";

type PageSeo = {
  id: number;
  seo_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
};

type PageWithSeo = {
  id: number;
  title?: string | null;
  name?: string | null;
  page_seo: PageSeo | null;
};
//get service metadata for specific service
export async function getServiceMetadata(slug: string, serviceSlug: string) {
    const { data: service, error } = await supabase
    .from("services")
    .select(`
      id,
      name,
      page_seo!service_id (
        *
      )
    `)
    .eq("slug", serviceSlug)
    .eq("saloon_id", 1)
    .single();

  if (error || !service) {
    return {
      title: "Salon Booking",
      description: "Book your salon appointment online.",
      keywords: [],
    };
  }

  // Tell TypeScript that page_seo is a single object
  const page = service as unknown as PageWithSeo;

  const { page_seo } = page;
 

  return {
    title: page_seo?.seo_title ?? "Salon Booking System",
    description:
      page_seo?.meta_description ??
      "Book your salon appointment online.",
    keywords: page_seo?.keywords ?? [],
  };

}

// Get page metadata for a specific page based on the slug and serviceSlug



export async function getPageMetadata(
  slug: string,
  serviceSlug: string
) {
  const { data: service, error } = await supabase
    .from("pages")
    .select(`
      id,
      title,
      page_seo!page_id (
        *
      )
    `)
    .eq("slug", slug)
    .eq("salon_id", 1)
    .single();

  if (error || !service) {
    return {
      title: "Salon Booking",
      description: "Book your salon appointment online.",
      keywords: [],
    };
  }

  // Tell TypeScript that page_seo is a single object
  const page = service as unknown as PageWithSeo;

  const { page_seo } = page;

  return {
    title: page_seo?.seo_title ?? "Salon Booking System",
    description:
      page_seo?.meta_description ??
      "Book your salon appointment online.",
    keywords: page_seo?.keywords ?? [],
  };
}

