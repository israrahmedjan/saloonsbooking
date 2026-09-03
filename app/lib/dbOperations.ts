
import { supabase } from "./supabaseClient";

// type pages = {
//   id: number;
//   seo_title: string | null;
//   meta_description: string | null;
//   keywords: string[] | null;
// };

// type pagesSections = {
//   id: number;
//   title?: string | null;
//   name?: string | null;
//   page_seo: PageSeo | null;
// };

export async function getPageWithSections(
  slug: string,
  serviceSlug: string
) {
  const { data: pageData, error } = await supabase
    .from("pages")
    .select(`
      *,
      page_sections!page_id (
        *
      )
    `)
    .eq("slug", slug)
    .eq("salon_id", 1)
    .order("sort_order", {
    foreignTable: "page_sections",
    ascending: true,
    })
    .single();

  if (error || !pageData) {
    console.error("Page fetch error:", error);

    return null;
  }

 

  return pageData
 
}