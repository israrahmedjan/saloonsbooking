
import RevealWrapper from "../../general/RevealWrapper";
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
              <RevealWrapper key={section.id} delay={100} className="reveal-zoom">
                <HeroSection
                  data={section.content}
                />
              </RevealWrapper>
            );

          case "text":
            return (
              <RevealWrapper key={section.id} delay={100} className="reveal-up">
                <OurStorySection
                  data={section.content}
                />
              </RevealWrapper>
            );


          case "services":
            return (
              <RevealWrapper key={section.id} delay={100} className="reveal-up">
                <ServiceSection
                  key={section.id}
                  data={section.content}
                /></RevealWrapper>
            );

          case "cta":
            return (
              <RevealWrapper key={section.id} delay={100} className="reveal-up">
                <ReadyAppointment
                  key={section.id}
                  data={section.content}
                /></RevealWrapper>
            );


          case "features":
            return (
              <RevealWrapper key={section.id} delay={100} className="reveal-up">
                <FeatureSection
                  key={section.id}
                  data={section.content}
                />
              </RevealWrapper>
            );


          default:
            return null;
        }
      })}
    </>
  );
}