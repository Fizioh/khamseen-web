import Link from "next/link";
import { SystemPanel } from "@/components/design-system/SystemPanel";

const cards = [
  {
    href: "/platform",
    title: "Platform",
    body: "Kernel lifecycle, sub-modules, control room, and full OS narrative.",
  },
  {
    href: "/integrations",
    title: "Integrations",
    body: "Slack, WhatsApp, webhooks, MCP — adapters into the same gates.",
  },
  {
    href: "/demo",
    title: "Live trace",
    body: "Task KHA-142 from delegate to human approval with topology sync.",
  },
];

export function HomeExplore() {
  return (
    <section className="py-16 md:py-20" aria-labelledby="explore-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 id="explore-title" className="text-xl font-medium md:text-2xl">
          Explore the system
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="group block h-full">
              <SystemPanel className="h-full p-5 transition-colors group-hover:border-accent/40">
                <p className="font-mono text-sm text-accent">{c.title} →</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{c.body}</p>
              </SystemPanel>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
