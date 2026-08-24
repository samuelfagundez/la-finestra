import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { emailConfig } from "../content";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Envía un <form> por EmailJS (https://www.emailjs.com), sin backend propio.
 * Todo lo necesario (Service ID, Template ID, Public Key, correo destino)
 * se inyecta en build desde Secrets del repo — ver README.
 */
export function useEmailForm(templateId: string | undefined) {
  const [status, setStatus] = useState<Status>("idle");

  const configured = Boolean(
    emailConfig.serviceId &&
      emailConfig.publicKey &&
      templateId &&
      emailConfig.toEmail,
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!configured) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const params: Record<string, string> = { to_email: emailConfig.toEmail! };
    data.forEach((value, key) => {
      params[key] = String(value);
    });

    setStatus("sending");
    try {
      await emailjs.send(
        emailConfig.serviceId!,
        templateId!,
        params,
        { publicKey: emailConfig.publicKey! },
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return { status, handleSubmit, configured };
}
