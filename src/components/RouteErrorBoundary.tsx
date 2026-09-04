import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

// Clave de sessionStorage para evitar un bucle infinito de recargas si el
// problema persistiera por otro motivo real (no solo caché desactualizada).
// Exportada para que App.tsx la limpie tras un montaje sin errores.
export const RELOAD_ONCE_KEY = "ssg-error-reload-once";

/**
 * Recuperación automática para un fallo típico de vite-react-ssg: tras un
 * despliegue nuevo, una pestaña con el HTML/JS de un despliegue anterior en
 * caché intenta pedir un archivo (el manifest de datos estáticos) que ya no
 * existe — GitHub Pages devuelve el index.html de repuesto en vez de un 404
 * real, y el intento de leerlo como JSON lanza un error que React Router
 * captura y muestra con su pantalla genérica ("Unexpected Application
 * Error!"). Una recarga completa trae el HTML/JS actuales y lo resuelve.
 */
export default function RouteErrorBoundary() {
  useRouteError();
  const [alreadyRetried] = useState(
    () => sessionStorage.getItem(RELOAD_ONCE_KEY) === "1",
  );

  useEffect(() => {
    if (!alreadyRetried) {
      sessionStorage.setItem(RELOAD_ONCE_KEY, "1");
      window.location.reload();
    }
  }, [alreadyRetried]);

  if (!alreadyRetried) {
    // Recarga en curso: no hace falta mostrar nada, es prácticamente
    // instantáneo. Un fondo neutro evita un parpadeo en blanco feo.
    return <div className="min-h-screen bg-[var(--color-paper)]" />;
  }

  // La recarga no resolvió el problema (motivo distinto, p. ej. sin
  // conexión) — mostramos algo útil en vez de insistir en bucle.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-paper)] px-4 text-center">
      <p className="font-display text-2xl font-bold text-[var(--color-brand-dark)]">
        Vaya, algo no ha cargado bien
      </p>
      <p className="max-w-sm text-[var(--color-ink)]/80">
        Puede que sea un problema pasajero de conexión. Prueba a recargar la
        página.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-primary"
      >
        Recargar página
      </button>
    </div>
  );
}
