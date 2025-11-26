import { metadata } from "./metadata";
import { JsonLd } from "@/components/SEO/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export { metadata };

export default function JoinLayout({
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
          { name: "Join Us", url: `${siteConfig.url}/join` },
        ]}
      />
      {children}
    </>
  );
}
