import { getSiteUrl } from './seoUtils';

export const generateOrganizationSchema = () => {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DefencePrep",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.svg`,
    "description": "Practice platform for NDA and CDS previous year papers."
  };
};

export const generateWebSiteSchema = () => {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DefencePrep",
    "url": siteUrl,
  };
};

export const generateBreadcrumbSchema = (breadcrumbs: { name: string, item?: string }[]) => {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      ...(breadcrumb.item && { "item": `${siteUrl}${breadcrumb.item}` })
    }))
  };
};

export const generateWebPageSchema = (title: string, description: string, urlPath: string) => {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}${urlPath}`
  };
};
