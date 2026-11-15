import type { Metadata } from "next";
import Link from "next/link";
import { DealsFooter } from "@/components/deals/DealsFooter";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { legalEntity } from "@/data/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Khamseen",
  description:
    "Politique de confidentialité et gestion des cookies pour khamseen.tech et Khamseen Deals.",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <DealsHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          Légal
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">
          Politique de confidentialité
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Responsable du traitement
            </h2>
            <p>
              {legalEntity.raisonSociale} ({legalEntity.forme}),{" "}
              {legalEntity.siege}. Contact :{" "}
              <a
                href={`mailto:${legalEntity.contactEmail}`}
                className="text-foreground underline underline-offset-2"
              >
                {legalEntity.contactEmail}
              </a>
              .
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Données collectées
            </h2>
            <p>
              Nous collectons uniquement les données nécessaires au
              fonctionnement du site (journaux techniques de l&apos;hébergeur) et,
              si vous acceptez les cookies d&apos;audience, des statistiques
              agrégées de fréquentation. Les formulaires éventuels (contact,
              waitlist) traitent l&apos;adresse e-mail fournie volontairement.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Cookies</h2>
            <p>
              Un bandeau vous permet d&apos;accepter ou de refuser les cookies
              non essentiels. Votre choix est stocké localement dans votre
              navigateur. Vous pouvez modifier ce choix en effaçant les données
              du site dans les paramètres du navigateur.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Liens affiliés
            </h2>
            <p>
              Certains liens vers des enseignes sont affiliés. Leur suivi peut
              impliquer des cookies déposés par le partenaire lorsque vous
              cliquez sur « Voir l&apos;offre ». Cela n&apos;augmente pas le
              prix payé.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Vos droits</h2>
            <p>
              Conformément au RGPD, vous pouvez demander l&apos;accès, la
              rectification ou l&apos;effacement de vos données, ainsi que la
              limitation du traitement, en écrivant à{" "}
              <a
                href={`mailto:${legalEntity.contactEmail}`}
                className="text-foreground underline underline-offset-2"
              >
                {legalEntity.contactEmail}
              </a>
              . Vous pouvez également saisir la CNIL.
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
