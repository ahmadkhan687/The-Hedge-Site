import RequestAccessAudienceSection from "@/components/request-access/RequestAccessAudienceSection";
import RequestAccessFormSection from "@/components/request-access/RequestAccessFormSection";
import RequestAccessHeroSection from "@/components/request-access/RequestAccessHeroSection";

export default function RequestAccessSection() {
  return (
    <>
      <RequestAccessHeroSection />
      <RequestAccessFormSection />
      <RequestAccessAudienceSection />
    </>
  );
}
