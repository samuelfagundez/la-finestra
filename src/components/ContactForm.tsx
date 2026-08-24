import { content, emailConfig } from "../content";
import { useEmailForm } from "../hooks/useEmailForm";

export default function ContactForm() {
  const { status, handleSubmit, configured } = useEmailForm(
    emailConfig.contactTemplateId,
  );

  return (
    <section id="contacto" className="py-20">
      <div className="mx-auto grid max-w-4xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="section-title">Contáctanos</h2>
          <p className="mt-4 text-[var(--color-ink)]/70">
            ¿Tienes una pregunta, comentario o quieres hacer un evento
            privado? Escríbenos.
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div>
              <dt className="font-medium">Dirección</dt>
              <dd className="text-[var(--color-ink)]/70">
                {content.address.full}
              </dd>
            </div>
            {content.phone && (
              <div>
                <dt className="font-medium">Teléfono</dt>
                <dd className="text-[var(--color-ink)]/70">
                  <a href={`tel:${content.phone.replace(/\s/g, "")}`}>
                    {content.phoneDisplay}
                  </a>
                </dd>
              </div>
            )}
            {content.email && (
              <div>
                <dt className="font-medium">Correo</dt>
                <dd className="text-[var(--color-ink)]/70">
                  <a href={`mailto:${content.email}`}>{content.email}</a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          {!configured && (
            <p className="mb-4 rounded-md bg-amber-100 px-4 py-3 text-sm text-amber-900">
              El formulario de contacto aún no está conectado. Ver README
              para configurar los Secrets de EmailJS.
            </p>
          )}

          {status === "success" ? (
            <p className="rounded-md bg-green-100 px-4 py-4 text-center text-green-900">
              ¡Gracias por tu mensaje! Te responderemos pronto.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
              <div>
                <label htmlFor="c-name" className="text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-medium">
                  Correo
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="c-message" className="text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary disabled:opacity-60"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-700">
                  No se pudo enviar el mensaje. Intenta de nuevo o
                  escríbenos por correo directamente.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
