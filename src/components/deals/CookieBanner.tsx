"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "khamseen-deals-cookie-consent";

type Consent = "accepted" | "refused";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Bandeau cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 p-4 backdrop-blur-md md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Nous utilisons des cookies essentiels au fonctionnement du site et,
          uniquement avec votre accord, des cookies de mesure d&apos;audience.
          Consultez la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-foreground underline underline-offset-2"
          >
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose("refused")}
            className="rounded border border-border px-3 py-2 font-mono text-[11px] tracking-wide text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded border border-accent/30 bg-accent/5 px-3 py-2 font-mono text-[11px] tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
