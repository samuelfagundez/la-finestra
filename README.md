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
- **EmailJS** — envío de los formularios sin backend propio, con plantilla
  de correo 100% personalizada (ver abajo). Plan gratuito: 200 correos/mes,
  SDK de JS, sin tarjeta.

## Editar contenido

Todo el contenido (nombre, dirección, teléfono, horario, redes, fotos,
coordenadas del mapa) vive en **`src/content.ts`**. Es el único archivo que
hace falta tocar para actualizar datos del restaurante.

Las fotos de la galería van en `public/gallery/` — ya están las fotos reales
del restaurante; para cambiarlas, reemplaza los `.jpg` y actualiza las rutas
en `content.ts`.

## Desarrollo local

```bash
npm install
npm run dev       # servidor local
npm run build     # build de producción (SSG) en dist/
npm run preview   # sirve dist/ localmente
```

## Formularios de contacto y reservas (EmailJS)

Los dos formularios envían el correo directo desde el navegador con
[EmailJS](https://www.emailjs.com) — no hay backend propio ni claves
privadas expuestas: EmailJS está diseñado para que su "Public Key" vaya en
el frontend (igual que el form-ID de otros servicios), y aun así, para no
hardcodear nada en el código fuente, **todo se inyecta en build desde
Secrets del repositorio**, incluido el correo de destino.

Las plantillas de correo (con la marca/colores de La Finestra) ya están
escritas en `email-templates/contacto.html` y `email-templates/reserva.html`
— solo hay que pegarlas en el dashboard de EmailJS.

### Configuración (única vez, ~5 min)

1. Crea una cuenta gratuita en https://www.emailjs.com
2. **Email Services → Add New Service** → conecta el Gmail (u otro correo)
   desde el que quieres que salgan los avisos. Copia el **Service ID**.
3. **Email Templates → Create New Template**, dos veces:
   - **Contacto**: cambia a modo "Code editor" y pega el contenido de
     `email-templates/contacto.html`. En "Settings" del template, pon el
     campo **To Email** como `{{to_email}}` y **Reply To** como
     `{{email}}` (así puedes responder directo al cliente). Copia el
     **Template ID**.
   - **Reserva**: repite con `email-templates/reserva.html` y el mismo
     `{{to_email}}` / `{{email}}` en Settings. Copia su **Template ID**.
4. **Account → General**: copia tu **Public Key**.
5. En GitHub: **Settings → Secrets and variables → Actions → New repository
   secret** y agrega los 5 secrets de la tabla de abajo.
6. Vuelve a correr el workflow (push a `main` o "Re-run" en Actions).

Mientras no estén configurados, el sitio funciona igual pero los
formularios muestran un aviso de "no conectado" en vez de fallar.

### Lista de Secrets del repositorio

| Secret | Qué es | De dónde sale |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | ID del servicio de correo conectado | EmailJS → Email Services |
| `VITE_EMAILJS_PUBLIC_KEY` | Clave pública de la cuenta EmailJS | EmailJS → Account → General |
| `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | ID de la plantilla "Contacto" | EmailJS → Email Templates |
| `VITE_EMAILJS_RESERVATION_TEMPLATE_ID` | ID de la plantilla "Reserva" | EmailJS → Email Templates |
| `VITE_CONTACT_EMAIL` | Correo que recibe los avisos (hoy: `samuelfagundez97@gmail.com`) | Se define aquí, no en el código |

Ninguno de estos valores queda escrito en el código fuente del repo; se
inyectan solo en build (`.github/workflows/deploy.yml` los lee de
`secrets.*`).

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
- JSON-LD `schema.org/Restaurant` con dirección, horario, teléfono y
  valoración (rating) de Google.
- `robots.txt` y `sitemap.xml` en `public/`.
- Semántica: un solo `<h1>`, `<nav>` etiquetada, `alt` en imágenes,
  `loading="lazy"` en la galería, skip-link de accesibilidad.

Tras publicar, da de alta la URL en
[Google Search Console](https://search.google.com/search-console) y envía
el sitemap para acelerar la indexación (gratis).
