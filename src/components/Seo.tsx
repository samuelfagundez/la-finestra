import { Helmet } from "react-helmet-async";
import { content, whatsappLink } from "../content";

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

  const base = content.siteUrl.replace(/\/$/, "");

  // Entidad WebSite explícita: le da a Google una señal directa e
  // inequívoca del nombre real del sitio para el "breadcrumb" de resultados
  // (evita que muestre un nombre genérico mientras el sitio es nuevo).
  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: content.siteUrl,
    name: content.name,
    inLanguage: "es",
  };

  const restaurantEntity: Record<string, unknown> = {
    "@type": "Restaurant",
    "@id": `${base}/#restaurant`,
    isPartOf: { "@id": `${base}/#website` },
    name: content.name,
    description: content.description,
    image: content.gallery.map(
      (p) => content.siteUrl.replace(/\/$/, "") + p.src,
    ),
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
    // WhatsApp es un canal de chat, no una página de perfil — se excluye
    // de sameAs (que es para identidades) y en cambio se usa como acción
    // de reserva en acceptsReservations.
    sameAs: Object.entries(content.social)
      .filter(([key, value]) => key !== "whatsapp" && value)
      .map(([, value]) => value),
    hasMap: content.mapLinkUrl,
    acceptsReservations: whatsappLink(
      "¡Hola! Vengo de la página web de La Finestra y me gustaría hacer una reserva.",
    ),
  };

  if (content.phone) restaurantEntity.telephone = content.phone;
  if (content.email) restaurantEntity.email = content.email;
  if (content.geo) {
    restaurantEntity.geo = {
      "@type": "GeoCoordinates",
      latitude: content.geo.latitude,
      longitude: content.geo.longitude,
    };
  }
  if (content.rating) {
    restaurantEntity.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: content.rating.value,
      reviewCount: content.rating.count,
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [websiteEntity, restaurantEntity],
  };

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
