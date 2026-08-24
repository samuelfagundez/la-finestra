import { Helmet } from "react-helmet-async";
import { content } from "../content";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function Seo({ title, description, path = "" }: SeoProps) {
  const fullTitle = title
    ? `${title} | ${content.name}`
    : `${content.name} | ${content.tagline}`;
  const desc = description || content.metaDescription;
  const url = content.siteUrl.replace(/\/$/, "") + path;
  const image = content.siteUrl.replace(/\/$/, "") + content.gallery[0]?.src;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: content.name,
    description: content.description,
    image: content.gallery.map(
      (p) => content.siteUrl.replace(/\/$/, "") + p.src,
    ),
    "@id": content.siteUrl,
    url: content.siteUrl,
    priceRange: content.priceRange,
    servesCuisine: content.cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.address.streetAddress,
      addressLocality: content.address.addressLocality,
      addressRegion: content.address.addressRegion,
      postalCode: content.address.postalCode,
      addressCountry: content.address.addressCountry,
    },
    openingHoursSpecification: content.openingHoursSchema.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    sameAs: Object.values(content.social).filter(Boolean),
    hasMap: content.mapLinkUrl,
    acceptsReservations: "True",
  };

  if (content.phone) jsonLd.telephone = content.phone;
  if (content.email) jsonLd.email = content.email;
  if (content.geo) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: content.geo.latitude,
      longitude: content.geo.longitude,
    };
  }
  if (content.rating) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: content.rating.value,
      reviewCount: content.rating.count,
    };
  }

  return (
    <Helmet>
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="restaurant.restaurant" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={content.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
