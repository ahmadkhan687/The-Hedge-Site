import DomainThreatSection from "@/components/domains/DomainThreatSection";
import DomainsClosingSection from "@/components/domains/DomainsClosingSection";
import DomainsEditorialBreak from "@/components/domains/DomainsEditorialBreak";
import DomainsHeroSection from "@/components/domains/DomainsHeroSection";
import DomainsMethodSection from "@/components/domains/DomainsMethodSection";
import DomainsPrecisionCallout from "@/components/domains/DomainsPrecisionCallout";
import DomainsScaleSection from "@/components/domains/DomainsScaleSection";

const threatOneFields = [
  { label: "Theatre", value: "West Africa, partner states" },
  { label: "Media", value: "Synthetic video and cloned voice, 4 languages" },
  {
    label: "Hand",
    value: "A foreign influence apparatus, traced to [REDACTED]",
  },
  { label: "Intent", value: "Collapse the result, trigger unrest" },
  { label: "Caught", value: "2h 50m after upload, before prime time" },
  {
    label: "Done",
    value: "Principal briefed; verified address pushed; vote held",
  },
  { label: "Sources", value: "2 confirmed" },
];

const threatTwoFields = [
  {
    label: "Architecture",
    value: "4,200 personas, 38 co-opted voices, 11 front outlets",
  },
  { label: "Hand", value: "One foreign service, a single funding chain" },
  { label: "Genuine", value: "7% of the volume was real" },
  { label: "Built to", value: "Force a resignation before a deal" },
  { label: "Named", value: "Full attribution handed to the state" },
  { label: "Sources", value: "2 confirmed" },
];

const threatThreeFields = [
  {
    label: "Funnel",
    value: "Grievance forum to closed group to facilitator to camp",
  },
  { label: "Scale", value: "214 on the road - REDACTED at the final stage" },
  { label: "One subject", value: "Stage 5, travel booked, flagged 9 days out" },
  {
    label: "Facilitation",
    value: "Cross-border money and movement chain mapped",
  },
  { label: "Step in", value: "At the facilitator, before the crossing" },
  { label: "Sources", value: "2 confirmed" },
];

export default function DomainsPageSection() {
  return (
    <>
      <DomainsHeroSection />

      <DomainThreatSection
        eyebrow="Varro field"
        title="Synthetic Narrative Warfare"
        columns={[
          {
            label: "What it is",
            text: "A lie built to move a nation. Synthetic media, made by machine, fired by a foreign hand.",
          },
          {
            label: "What Varro does",
            text: "Proves the media false. Traces it to its source. Puts the truth out before the lie sets.",
          },
          {
            label: "On the page",
            text: "True or false. Who built it. Where it came from. What to say back, and when.",
          },
        ]}
        imageSrc="/images/domains/threat-01.png"
        imageAlt="Synthetic narrative warfare intelligence diagram"
        imageHeight="h-[400px] sm:h-[600px] lg:h-[888px]"
        imageClassName="object-contain object-bottom"
        quote="A lie answered in four hours has not yet become the truth."
        caseLabel="Case · Field"
        verdict="Verdict · Fabricated · State level"
        caseHeading="A deepfaked address by a head of state conceding a rigged vote, seeded 36 hours before polls."
        caseFields={threatOneFields}
      />

      <DomainsEditorialBreak />

      <DomainThreatSection
        eyebrow="Varro hand"
        title="Coordinated Networks"
        columns={[
          {
            label: "What it is",
            text: "A nation that appears to be speaking and is not. One foreign hand wearing the face of a crowd.",
          },
          {
            label: "What Varro does",
            text: "Maps the whole architecture. Finds the hand and the money. Tells real anger from the manufactured kind.",
          },
          {
            label: "On the page",
            text: "Who is real. Who is paid. Who runs it. What the crowd was built to force.",
          },
        ]}
        imageSrc="/images/domains/threat-02.jpg"
        imageAlt="Satellite dish array in mountainous terrain"
        imageHeight="h-[300px] sm:h-[450px] lg:h-[574px]"
        imageClassName="object-cover object-top"
        quote="We never call a network coordinated on volume alone."
        caseLabel="Case · Hand"
        verdict="Verdict · Coordinated · Foreign run"
        caseHeading="A popular uprising against a sitting government, manufactured across three continents."
        caseFields={threatTwoFields}
      />

      <DomainsPrecisionCallout />

      <DomainThreatSection
        eyebrow="Varro path"
        title="Engineered Radicalisation"
        columns={[
          {
            label: "What it is",
            text: "The road from grievance to violence walked in the open run as a cross-border operation.",
          },
          {
            label: "What Varro does",
            text: "Traces the road. Maps the facilitators. Flags the person at the final stage while there is still time.",
          },
          {
            label: "On the page",
            text: "Who is on the road. Who is closest to the act. Where the facilitation chain breaks.",
          },
        ]}
        imageSrc="/images/domains/editorial-strip.jpg"
        imageAlt="Monitoring station collage with news and social interfaces"
        imageHeight="h-[280px] sm:h-[350px] lg:h-[400px]"
        imageClassName="object-cover object-center"
        quote="We flag the person, never the belief."
        caseLabel="Case · Path"
        verdict="Verdict · Active pipeline · Cross-border"
        caseHeading="A banned group moving recruits from grievance to a training camp, stage by stage."
        caseFields={threatThreeFields}
        bordered={false}
      />

      <DomainsScaleSection />
      <DomainsMethodSection />
      <DomainsClosingSection />
    </>
  );
}
