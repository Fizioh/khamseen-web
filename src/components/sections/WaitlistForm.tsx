"use client";

import { useState } from "react";
import { CtaButton } from "@/components/design-system/CtaButton";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong");
        return;
      }
      setStatus("success");
      setMessage("Check your inbox — confirmation sent from waitlist@khamseen.tech");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error");
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-8 max-w-md space-y-4">
      <label className="block text-left font-mono text-[10px] tracking-widest text-muted uppercase">
        Work email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          placeholder="you@company.com"
          className="mt-2 w-full rounded border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted/60 focus:border-accent/50 focus:outline-none disabled:opacity-50"
        />
      </label>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="inline-flex items-center rounded border border-accent/30 bg-accent/5 px-5 py-2.5 font-mono text-sm tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "SENDING…" : "JOIN WAITLIST"}
        </button>
        <CtaButton href="#demo" variant="secondary">
          VIEW LIVE TRACE
        </CtaButton>
      </div>
      {message && (
        <p
          className={`text-center text-xs ${status === "success" ? "text-signal-ok" : "text-signal-danger"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
