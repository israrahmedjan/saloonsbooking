import Hero from "./components/home/Hero";
import LatestSaloons from "./components/saloons/latestSaloons";
import Services from "./components/home/Services";
import { supabase } from "./lib/supabaseClient";
import { Salon } from "./lib/types";
import Pastwork from "./components/home/Pastwork";
import Testimonials from "./components/home/Testimonials";
import RevealWrapper from "./components/general/RevealWrapper";
import Counter from "./components/general/Counter";

export default async function Home() {
  let salons: Salon[] = [];

  try {

 

  const { data, error } = await supabase
  .from("services")
  .select(`
    *,
    service_categories!inner(id,
      name,
      slug),
    salons!inner(id,
      name,
      slug)
  `)
  .eq("salons.slug", 'royal-beauty-salon')
  .in("service_categories.slug", [
    "hair-services","makeup","nail-services"
  ])
    if (error) {
      console.log(error.message);
      return;
    }
    salons = (data ?? []) as Salon[];

    console.log("Salons Data:", salons);
    // console.log(JSON.stringify(data, null, 2));

  } catch (error: unknown) {
    console.log(
      "Supabase Error:",
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  }


  return (
    <>

      <RevealWrapper>
        <Hero />
      </RevealWrapper>
      {/* <div className="flex justify-center items-center">
        <hr />
        <Counter />
        <hr /></div> */}
      {/* <RevealWrapper className="reveal-up" delay={200}>
        <Services services= {salons} />
      </RevealWrapper> */}
   <Services services= {salons} />
      <RevealWrapper className="reveal-right" delay={300}>
        <Pastwork />
      </RevealWrapper>

      <RevealWrapper className="reveal-left" delay={300}>
        <Testimonials />
      </RevealWrapper>
   
    </>
  );
}