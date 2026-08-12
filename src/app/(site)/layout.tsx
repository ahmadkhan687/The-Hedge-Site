import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ORGANIZATION_JSON_LD, serializeJsonLd } from "@/lib/json-ld";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({ ...ORGANIZATION_JSON_LD }),
        }}
      />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
