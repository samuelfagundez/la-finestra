import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { RELOAD_ONCE_KEY } from "./components/RouteErrorBoundary";

export default function App() {
  // Si llegamos hasta aquí es que la ruta cargó bien — limpiamos el flag
  // de RouteErrorBoundary para que un futuro incidente distinto también
  // pueda auto-recuperarse (no solo una vez por sesión de navegador).
  useEffect(() => {
    sessionStorage.removeItem(RELOAD_ONCE_KEY);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
