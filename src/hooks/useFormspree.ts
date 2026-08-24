import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Envía un <form> a Formspree (https://formspree.io) vía fetch, sin backend
 * propio. El ID de formulario se inyecta en build desde un Secret del repo
 * (VITE_FORMSPREE_CONTACT_ID / VITE_FORMSPREE_RESERVATION_ID) — ver README.
 */
export function useFormspree(formId: string | undefined) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formId) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return { status, handleSubmit, configured: Boolean(formId) };
}
