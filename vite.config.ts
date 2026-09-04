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
    // "sync" (el valor por defecto de la librería, sin atributo async en
    // el <script type="module">) es intencional, no un descuido: con
    // "async" el bundle puede ejecutarse antes de que corra el <script>
    // inline que define window.__VITE_REACT_SSG_HASH__ al final del
    // <body> — la carrera resultante deja esa variable en `undefined`,
    // pide "static-loader-data-manifest-undefined.json" (404) y GitHub
    // Pages responde con el index.html de repuesto, que el código intenta
    // parsear como JSON → "Unexpected token '<' ... is not valid JSON".
    script: "sync",
    formatting: "minify",
  },
};
