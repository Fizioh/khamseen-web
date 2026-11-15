import Link from "next/link";
import { legalEntity } from "@/data/legal";

export function DealsFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-wide text-foreground">
              Khamseen Deals
            </p>
            <p className="max-w-md text-xs leading-relaxed text-muted">
              Sélection de promotions high-tech, maison et jeux en France.
              Édité par {legalEntity.raisonSociale} ({legalEntity.forme}).
            </p>
            <dl className="space-y-1 text-xs leading-relaxed text-muted">
              <div>
                <dt className="inline text-muted/80">Raison sociale : </dt>
                <dd className="inline">
                  {legalEntity.raisonSociale} — {legalEntity.forme}
                </dd>
              </div>
              <div>
                <dt className="inline text-muted/80">SIREN : </dt>
                <dd className="inline">{legalEntity.siren}</dd>
              </div>
              <div>
                <dt className="inline text-muted/80">Siège : </dt>
                <dd className="inline">{legalEntity.siege}</dd>
              </div>
              <div>
                <dt className="inline text-muted/80">Directeur de publication : </dt>
                <dd className="inline">{legalEntity.directeurPublication}</dd>
              </div>
              <div>
                <dt className="inline text-muted/80">Hébergeur : </dt>
                <dd className="inline">
                  {legalEntity.hebergeur.nom} — {legalEntity.hebergeur.adresse}
                </dd>
              </div>
            </dl>
          </div>

          <nav
            className="flex flex-col gap-2 font-mono text-[11px] tracking-wide text-muted"
            aria-label="Liens légaux"
          >
            <Link href="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-foreground"
            >
              Politique de confidentialité
            </Link>
            <a
              href={`mailto:${legalEntity.contactEmail}`}
              className="hover:text-foreground"
            >
              Contact — {legalEntity.contactEmail}
            </a>
            <Link href="/" className="hover:text-foreground">
              Khamseen — site principal
            </Link>
          </nav>
        </div>
        <p className="mt-10 font-mono text-[10px] text-muted/80">
          © {new Date().getFullYear()} {legalEntity.raisonSociale}. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
}
