
import { Helmet } from 'react-helmet-async';
import { getSiteUrl } from '../../utils/seoUtils';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: Record<string, any> | Record<string, any>[];
  themeColor?: string;
}

export default function SEOHead({
  title = 'NDA & CDS Previous Year Papers | DefencePrep',
  description = 'Attempt real NDA and CDS previous year papers in timed exam conditions. Analyse your mistakes, track performance, and improve with every test.',
  canonicalPath,
  noindex = false,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  themeColor = '#0a0e1a'
}: SEOHeadProps) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl;
  
  const finalTitle = title;
  const finalDescription = description;
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalOgImage = ogImage || `${siteUrl}/default-og.jpg`; // default social image
  
  const finalTwitterTitle = twitterTitle || finalOgTitle;
  const finalTwitterDescription = twitterDescription || finalOgDescription;
  const finalTwitterImage = twitterImage || finalOgImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Canonical URL */}
      {canonicalPath && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Theme Color */}
      {themeColor && <meta name="theme-color" content={themeColor} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="DefencePrep" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
