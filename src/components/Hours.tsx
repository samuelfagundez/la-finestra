import { content } from "../content";

export default function Hours() {
  return (
    <section id="horario" className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h2 className="section-title text-center">Horario</h2>
      <dl className="mt-8 divide-y divide-black/10 rounded-lg border border-black/10 bg-white">
        {content.hours.map((h) => (
          <div
            key={h.day}
            className="flex items-center justify-between px-6 py-3"
          >
            <dt className="font-medium">{h.day}</dt>
            <dd
              className={
                h.hours === "Cerrado"
                  ? "text-black/40"
                  : "text-[var(--color-ink)]/80"
              }
            >
              {h.hours}
            </dd>
          </div>
        ))}
      </dl>
      {content.priceRangeDisplay && (
        <p className="mt-4 text-center text-sm text-[var(--color-ink)]/60">
          Precio medio: {content.priceRangeDisplay}
        </p>
      )}
    </section>
  );
}
