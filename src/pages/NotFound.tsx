import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" />
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-4xl font-bold">404</h1>
        <p className="mt-4 text-[var(--color-ink)]/70">
          La página que buscas no existe.
        </p>
        <a href="/" className="btn-primary mt-6">
          Volver al inicio
        </a>
      </div>
    </>
  );
}
