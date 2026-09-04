import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RouteErrorBoundary from "./components/RouteErrorBoundary";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: App,
    entry: "src/App.tsx",
    // Captura errores del loader interno de vite-react-ssg (ver
    // RouteErrorBoundary) — sin esto, un fallo de caché tras un deploy
    // muestra la pantalla genérica de React Router ("Unexpected
    // Application Error!") en vez de recuperarse solo.
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, Component: Home, entry: "src/pages/Home.tsx" },
      { path: "*", Component: NotFound, entry: "src/pages/NotFound.tsx" },
    ],
  },
];

export default routes;
