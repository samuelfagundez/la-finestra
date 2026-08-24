# Sitio del restaurante

Landing page (SPA) en React 19 + Vite, pre-renderizada a HTML estático
(`vite-react-ssg`) para SEO real, con carrusel de fotos, formulario de
contacto y formulario de reservas. Desplegado automáticamente a GitHub
Pages vía GitHub Actions.

## Stack

- **React 19 + TypeScript + Vite 8**
- **vite-react-ssg** — pre-renderiza el HTML en build time (el contenido es
  visible para Google sin ejecutar JS) y luego hidrata como SPA normal.
- **Tailwind CSS 4**
- **react-helmet-async** — título, meta tags, Open Graph, JSON-LD
  (`schema.org/Restaurant`) por página.
- **embla-carousel-react** — carrusel de la galería.
- **Formspree** — envío de los formularios sin backend propio (plan
  gratuito: 50 envíos/mes, API REST, sin tarjeta).

## Editar contenido

Todo el contenido (nombre, dirección, teléfono, horario, redes, fotos,
coordenadas del mapa) vive en **`src/content.ts`**. Es el único archivo que
hace falta tocar para actualizar datos del restaurante.

Las fotos de la galería van en `public/gallery/`; hoy hay 4 SVG de
placeholder — reemplázalas por fotos reales (`.jpg`/`.webp`) y actualiza las
rutas en `content.ts`.

## Desarrollo local

```bash
npm install
npm run dev       # servidor local
npm run build     # build de producción (SSG) en dist/
npm run preview   # sirve dist/ localmente
```

## Formularios de contacto y reservas

Usan [Formspree](https://formspree.io) — no requiere backend ni exponer
claves privadas: el "form ID" de Formspree está diseñado para ir en el
frontend (Formspree filtra spam y limita por dominio en su servidor, no por
mantener el ID en secreto). Aun así, para no hardcodearlo en el código, se
inyecta en build desde **Secrets del repositorio**:

1. Crea una cuenta gratuita en https://formspree.io
2. Crea dos formularios: uno para "Contacto" y otro para "Reservas"
   (cada uno te da un ID tipo `xandkzzz`).
3. En GitHub: **Settings → Secrets and variables → Actions → New repository
   secret** y agrega:
   - `VITE_FORMSPREE_CONTACT_ID`
   - `VITE_FORMSPREE_RESERVATION_ID`
4. Vuelve a correr el workflow (push a `main` o "Re-run" en Actions).

Mientras no estén configurados, el sitio funciona igual pero los
formularios muestran un aviso de "no conectado" en vez de fallar.

## Publicar en GitHub Pages (una sola vez)

1. **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
2. Listo — cada push a `main` construye y publica el sitio automáticamente
   (workflow en `.github/workflows/deploy.yml`).

## Dominio propio (más adelante)

1. En el proveedor del dominio, crea un registro `CNAME` (subdominio) o
   registros `A`/`ALIAS` (dominio raíz) apuntando a
   `<usuario>.github.io` (ver [docs de GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
2. En **Settings → Pages → Custom domain**, escribe el dominio. GitHub crea
   el archivo `CNAME` en la raíz del repo automáticamente.
3. En `.github/workflows/deploy.yml`, cambia `VITE_BASE` a `/` (ya que el
   sitio pasa a vivir en la raíz del dominio, no en `/repo-name/`).
4. Actualiza `siteUrl` en `src/content.ts` y las URLs en
   `public/robots.txt` / `public/sitemap.xml` al nuevo dominio.

## SEO

- HTML pre-renderizado (no depende de JS para ser indexado).
- Meta tags únicos + Open Graph + Twitter Card por página.
- JSON-LD `schema.org/Restaurant` con dirección, horario, geo y teléfono.
- `robots.txt` y `sitemap.xml` en `public/`.
- Semántica: un solo `<h1>`, `<nav>` etiquetada, `alt` en imágenes,
  `loading="lazy"` en la galería, skip-link de accesibilidad.

Tras publicar, da de alta la URL en
[Google Search Console](https://search.google.com/search-console) y envía
el sitemap para acelerar la indexación (gratis).
