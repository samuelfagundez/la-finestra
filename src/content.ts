// ---------------------------------------------------------------------------
// Contenido único del restaurante. Editar SOLO este archivo para actualizar
// nombre, dirección, horario, fotos, redes, etc. Todo el sitio lee de aquí.
// ---------------------------------------------------------------------------

export interface DayHours {
  day: string;
  hours: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export const content = {
  name: "La Finestra",
  shortName: "La Finestra",
  tagline: "Pizzería con mucho ambiente en el Eixample de Valencia",
  description:
    "La Finestra es una pizzería sencilla y animada en el Eixample de Valencia, con gran variedad de pizzas para compartir, cerveza y vino. El local es pequeño y suele llenarse, así que es habitual compartir mesa con otros comensales — ven con ganas de socializar y acompaña las porciones con una jarra de tinto de verano bien fría.",
  metaDescription:
    "La Finestra: pizzería en el Eixample de Valencia con gran variedad de pizzas, cerveza y vino en un ambiente animado. Consulta horario, ubicación y reserva tu mesa.",
  priceRange: "1 € - 10 €",
  priceRangeDisplay: "1 € – 10 € por persona aprox.",
  cuisine: "Pizzería",

  rating: {
    value: 4.6,
    count: 4699,
    countDisplay: "4.699",
  },

  highlights: [
    "Acompaña las porciones con una jarra de tinto de verano bien fría.",
    "Ambiente animado — es posible que tengas que compartir mesa con otros comensales.",
    "Local accesible en silla de ruedas.",
  ],

  address: {
    streetAddress: "Carrer dels Vivons, 16",
    addressLocality: "València",
    addressRegion: "Comunitat Valenciana",
    postalCode: "46006",
    addressCountry: "ES",
    full: "Carrer dels Vivons, 16, L'Eixample, 46006 València",
  },

  // Sin coordenadas verificadas: el mapa usa la dirección en texto (Google
  // la geolocaliza al vuelo), así que no hace falta lat/lng aquí.
  geo: null as { latitude: number; longitude: number } | null,

  phone: "+56 9 4259 9048",
  phoneDisplay: "+56 9 4259 9048",
  // Solo dígitos, con código de país, sin "+" — formato que exige wa.me.
  whatsappNumber: "56942599048",
  // Correo de contacto público mostrado en el sitio (temporal).
  email: "samuelfagundez97@gmail.com",

  // URL final del sitio (se ajusta al conectar dominio propio)
  siteUrl: "https://samuelfagundez.github.io/la-finestra/",

  social: {
    instagram: "https://www.instagram.com/la_finestra_ristorante",
    // Pendiente: el listado de Google Maps solo mostraba "facebook.com"
    // (URL truncada) — agregar el enlace exacto de la página de Facebook.
    facebook: "",
    tiktok: "",
    whatsapp:
      "https://wa.me/56942599048?text=" +
      encodeURIComponent("¡Hola! Vengo de la página web de La Finestra."),
  },

  hours: [
    { day: "Lunes", hours: "5:00 pm – 11:30 pm" },
    { day: "Martes", hours: "5:00 pm – 11:30 pm" },
    { day: "Miércoles", hours: "5:00 pm – 11:30 pm" },
    { day: "Jueves", hours: "11:30 am – 11:30 pm" },
    { day: "Viernes", hours: "11:30 am – 11:30 pm" },
    { day: "Sábado", hours: "11:30 am – 11:30 pm" },
    { day: "Domingo", hours: "11:30 am – 11:30 pm" },
  ] as DayHours[],

  // openingHoursSpecification en formato schema.org (día abreviado ISO)
  openingHoursSchema: [
    { days: ["Monday", "Tuesday", "Wednesday"], opens: "17:00", closes: "23:30" },
    {
      days: ["Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:30",
      closes: "23:30",
    },
  ],

  gallery: [
    {
      src: "/gallery/la-finestra-pizzas.jpg",
      alt: "Selección de pizzas artesanales de La Finestra sobre tabla de madera",
    },
    {
      src: "/gallery/la-finestra-burrata.jpg",
      alt: "Pizzeta de burrata fresca con rúcula y tomate de La Finestra",
    },
    {
      src: "/gallery/la-finestra-tabla.jpg",
      alt: "Tabla de mini pizzas variadas de La Finestra con cerveza",
    },
    {
      src: "/gallery/la-finestra-fachada.jpg",
      alt: "Fachada y terraza exterior de La Finestra en el Eixample de Valencia",
    },
  ] as Photo[],

  // Embed de Google Maps sin API key, geolocalizando por dirección de texto.
  mapEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "La Finestra, Carrer dels Vivons, 16, 46006 València",
    ) +
    "&hl=es&z=16&output=embed",
  mapLinkUrl: "https://maps.app.goo.gl/2f988ZfjDrcB8UUd7",
};

/** Link de WhatsApp click-to-chat con mensaje predefinido. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_CONTACT_MESSAGE =
  "¡Hola! Vengo de la página web de La Finestra y tengo una consulta.";
export const WHATSAPP_RESERVE_MESSAGE =
  "¡Hola! Vengo de la página web de La Finestra y me gustaría hacer una reserva.";

// Link externo del sistema de reservas (se abre en pestaña nueva). Mientras
// no se defina, "Reservar mesa" cae de vuelta a WhatsApp automáticamente.
export const reservationLink = "";

/** Href del botón "Contáctanos": siempre WhatsApp. */
export function contactHref(): string {
  return whatsappLink(WHATSAPP_CONTACT_MESSAGE);
}

/** Href del botón "Reservar mesa": link externo si ya está definido, si no WhatsApp. */
export function reservationHref(): string {
  return reservationLink || whatsappLink(WHATSAPP_RESERVE_MESSAGE);
}

// El envío de los formularios (contacto/reservas) va vía un Worker de
// Cloudflare + Brevo — ver cloudflare-worker/worker.js y src/hooks/useContactApi.ts.
// La URL del Worker se inyecta en build desde el Secret VITE_FORMS_ENDPOINT.
