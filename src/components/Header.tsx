import { useState } from "react";
import { content } from "../content";

const NAV = [
  { href: "#sobre-nosotros", label: "Nosotros" },
  { href: "#galeria", label: "Galería" },
  { href: "#horario", label: "Horario" },
  { href: "#reservas", label: "Reservas" },
  { href: "#contacto", label: "Contacto" },
  { href: "#ubicacion", label: "Ubicación" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[var(--color-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#"
          className="font-display text-xl font-bold text-[var(--color-brand-dark)]"
        >
          {content.name}
        </a>

        <nav className="hidden gap-8 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-ink)] transition hover:text-[var(--color-brand)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#reservas" className="btn-primary hidden md:inline-flex">
          Reservar mesa
        </a>

        <button
          type="button"
          className="inline-flex items-center rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-black/5 px-4 pb-4 md:hidden"
          aria-label="Principal móvil"
        >
          <ul className="flex flex-col gap-3 pt-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-1 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reservas"
                className="btn-primary mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Reservar mesa
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
