import type { Metadata } from "next";
import Link from "next/link";
import { DealsFooter } from "@/components/deals/DealsFooter";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { legalEntity } from "@/data/legal";

export const metadata: Metadata = {
  title: "Mentions légales — Khamseen",
  description:
    "Mentions légales de Khamseen Technologies (SASU) : SIREN, siège, directeur de publication et hébergeur.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <DealsHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          Légal
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">
          Mentions légales
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Éditeur</h2>
            <p>
              {legalEntity.raisonSociale}, {legalEntity.forme} au capital de{" "}
              {legalEntity.capital}.
            </p>
            <p>SIREN : {legalEntity.siren}</p>
            <p>SIRET : {legalEntity.siret}</p>
            <p>{legalEntity.rcs}</p>
            <p>TVA intracommunautaire : {legalEntity.tva}</p>
            <p>Siège social : {legalEntity.siege}</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Directeur de la publication
            </h2>
            <p>{legalEntity.directeurPublication}</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Contact</h2>
            <p>
              <a
                href={`mailto:${legalEntity.contactEmail}`}
                className="text-foreground underline underline-offset-2"
              >
                {legalEntity.contactEmail}
              </a>
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Hébergeur</h2>
            <p>{legalEntity.hebergeur.nom}</p>
            <p>{legalEntity.hebergeur.adresse}</p>
            <p>
              <a
                href={legalEntity.hebergeur.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2"
              >
                {legalEntity.hebergeur.site}
              </a>
            </p>
          </section>
          <p>
            <Link href="/deals" className="text-foreground underline underline-offset-2">
              Retour à Khamseen Deals
            </Link>
          </p>
        </div>
      </main>
      <DealsFooter />
    </>
  );
}
