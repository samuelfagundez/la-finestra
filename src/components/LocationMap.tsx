import { content } from "../content";

export default function LocationMap() {
  return (
    <section id="ubicacion" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="section-title text-center">Ubicación</h2>
        <p className="mt-2 text-center text-[var(--color-ink)]/70">
          {content.address.full}
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-black/10">
          <iframe
            title={`Mapa de ubicación de ${content.name}`}
            src={content.mapEmbedSrc}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href={content.mapLinkUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            Ver en Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
