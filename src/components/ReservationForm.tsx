import { formIds } from "../content";
import { useFormspree } from "../hooks/useFormspree";

export default function ReservationForm() {
  const { status, handleSubmit, configured } = useFormspree(
    formIds.reservation,
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservas" className="bg-[var(--color-brand)]/5 py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h2 className="section-title text-center">Reserva tu mesa</h2>
        <p className="mt-2 text-center text-[var(--color-ink)]/70">
          Completa el formulario y confirmaremos tu reserva por teléfono o
          correo.
        </p>

        {!configured && (
          <p className="mt-6 rounded-md bg-amber-100 px-4 py-3 text-sm text-amber-900">
            El formulario de reservas aún no está conectado. Ver README para
            configurar el Secret <code>VITE_FORMSPREE_RESERVATION_ID</code>.
          </p>
        )}

        {status === "success" ? (
          <p className="mt-8 rounded-md bg-green-100 px-4 py-4 text-center text-green-900">
            ¡Gracias! Recibimos tu solicitud de reserva y te confirmaremos
            pronto.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4" noValidate>
            <input type="hidden" name="_subject" value="Nueva reserva" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="r-name" className="text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="r-name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="r-phone" className="text-sm font-medium">
                  Teléfono
                </label>
                <input
                  id="r-phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="r-email" className="text-sm font-medium">
                Correo
              </label>
              <input
                id="r-email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="r-date" className="text-sm font-medium">
                  Fecha
                </label>
                <input
                  id="r-date"
                  name="date"
                  type="date"
                  min={today}
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="r-time" className="text-sm font-medium">
                  Hora
                </label>
                <input
                  id="r-time"
                  name="time"
                  type="time"
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="r-guests" className="text-sm font-medium">
                  Personas
                </label>
                <input
                  id="r-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={30}
                  defaultValue={2}
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="r-notes" className="text-sm font-medium">
                Notas (opcional)
              </label>
              <textarea
                id="r-notes"
                name="notes"
                rows={3}
                className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                placeholder="Alergias, ocasión especial, preferencia de mesa..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary mt-2 disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Solicitar reserva"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-700">
                No se pudo enviar la reserva. Intenta de nuevo o llámanos
                directamente.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
