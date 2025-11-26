import { metadata } from "./metadata";
import { JsonLd } from "@/components/SEO/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export { metadata };

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: siteConfig.url },
          { name: "Contact", url: `${siteConfig.url}/contact` },
        ]}
      />
      {children}
    </>
  );
}
