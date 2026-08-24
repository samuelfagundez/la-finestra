import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Base path: en GitHub Pages de proyecto el sitio vive en /<repo>/.
// Al conectar un dominio propio (CNAME), cambiar VITE_BASE a "/" en el
// workflow de despliegue (.github/workflows/deploy.yml).
const base = process.env.VITE_BASE || "/";

// Nota: no usamos defineConfig() de vite porque su tipo no incluye
// `ssgOptions` (extensión propia de vite-react-ssg); el objeto plano
// es válido para Vite y para el CLI de vite-react-ssg.
export default {
  base,
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    script: "async",
    formatting: "minify",
  },
};
