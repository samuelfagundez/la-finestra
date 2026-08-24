import { content, whatsappLink } from "../content";
import { assetUrl } from "../lib/asset";

const RESERVE_MESSAGE =
  "¡Hola! Vengo de la página web de La Finestra y me gustaría hacer una reserva.";
const CONTACT_MESSAGE =
  "¡Hola! Vengo de la página web de La Finestra y tengo una consulta.";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[var(--color-brand-dark)] text-white">
      <img
        src={content.gallery[0] ? assetUrl(content.gallery[0].src) : undefined}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        fetchPriority="high"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-display text-4xl font-bold sm:text-6xl">
          {content.name}
        </h1>
        <p className="mt-4 text-lg text-white/90 sm:text-xl">
          {content.tagline}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappLink(RESERVE_MESSAGE)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Reservar mesa
          </a>
          <a
            href={whatsappLink(CONTACT_MESSAGE)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary border-white bg-white text-[var(--color-brand-dark)] hover:bg-white/90 hover:text-[var(--color-brand-dark)]"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
