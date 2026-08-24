import { content } from "../content";

export default function About() {
  return (
    <section
      id="sobre-nosotros"
      className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6"
    >
      <h2 className="section-title">Sobre nosotros</h2>

      {content.rating && (
        <p className="mt-3 text-sm font-medium text-[var(--color-gold)]">
          ★ {content.rating.value.toFixed(1)} · {content.rating.countDisplay}{" "}
          opiniones en Google
        </p>
      )}

      <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink)]/80">
        {content.description}
      </p>

      {content.highlights.length > 0 && (
        <ul className="mt-8 grid gap-3 text-left sm:grid-cols-1">
          {content.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 rounded-md bg-white px-4 py-3 text-sm text-[var(--color-ink)]/80 shadow-sm"
            >
              <span aria-hidden="true" className="text-[var(--color-brand)]">
                ✓
              </span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
