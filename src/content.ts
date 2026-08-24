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
  priceRange: "€",
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
  // Correo de contacto público mostrado en el sitio (temporal).
  email: "samuelfagundez97@gmail.com",

  // URL final del sitio (se ajusta al conectar dominio propio)
  siteUrl: "https://samuelfagundez.github.io/la-finestra/",

  social: {
    // Pendiente: el listado de Google Maps solo mostraba "facebook.com"
    // (URL truncada) — agregar el enlace exacto de la página de Facebook.
    instagram: "",
    facebook: "",
    tiktok: "",
    whatsapp: "",
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

// Configuración de EmailJS (envío de los formularios), inyectada en build
// desde Secrets del repo. Nada de esto se hardcodea en el código fuente.
// Ver README para instrucciones de configuración.
export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as
    | string
    | undefined,
  reservationTemplateId: import.meta.env
    .VITE_EMAILJS_RESERVATION_TEMPLATE_ID as string | undefined,
  // Correo que recibe las notificaciones de los formularios (secreto:
  // no se hardcodea aunque hoy coincida con content.email).
  toEmail: import.meta.env.VITE_CONTACT_EMAIL as string | undefined,
};
