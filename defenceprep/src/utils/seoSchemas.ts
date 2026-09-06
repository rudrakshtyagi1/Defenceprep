export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DefencePrep",
    "url": "https://defenceprep.in",
    "logo": "https://defenceprep.in/favicon.svg",
    "description": "Practice platform for NDA and CDS previous year papers."
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DefencePrep",
    "url": "https://defenceprep.in"
  };
};

export const generateBreadcrumbSchema = (items: { name: string, item?: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      ...(breadcrumb.item && { "item": `https://defenceprep.in${breadcrumb.item}` })
    }))
  };
};

export const generateWebPageSchema = (title: string, description: string, urlPath: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `https://defenceprep.in${urlPath}`
  };
};
