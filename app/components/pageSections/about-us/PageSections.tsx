
import FeatureSection from "./FeatureSection";
import HeroSection from "./HeroSection";
import ReadyAppointment from "./ReadyAppointment";
import ServiceSection from "./ServicesSection";
import OurStorySection from "./TextSection";


type Section = {
  id: number;
  section_type: string;
  content: unknown;
};

type Props = {
  sections: Section[];
};

export default function PageSections({ sections }: Props) {
  return (
    <>
    {/* <pre>
    <div>{JSON.stringify(sections, null, 2)}</div></pre> */}
      {sections.map((section) => {
        switch (section.section_type) {
          case "hero":
            return (
              <HeroSection
                key={section.id}
                data={section.content}
              />
            );

           case "text":
            return (
              <OurStorySection
                key={section.id}
                data={section.content}
              />
            );
  

          case "services":
            return (
              <ServiceSection
                key={section.id}
                data={section.content}
              />
            );

          case "cta":
            return (
              <ReadyAppointment
                key={section.id}
                data={section.content}
              />
            );  

       
        case "features":
            return (
              <FeatureSection
                key={section.id}
                data={section.content}
              />
            );


          default:
            return null;
        }
      })}
    </>
  );
}