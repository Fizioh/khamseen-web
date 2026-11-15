import type { Metadata } from "next";
import { AffiliationNotice } from "@/components/deals/AffiliationNotice";
import { CookieBanner } from "@/components/deals/CookieBanner";
import { DealsCatalog } from "@/components/deals/DealsCatalog";
import { DealsFooter } from "@/components/deals/DealsFooter";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { DealsHero } from "@/components/deals/DealsHero";
import { SelectionMethod } from "@/components/deals/SelectionMethod";
import { getDeals } from "@/lib/deals/getDeals";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Khamseen Deals — Promos high-tech, maison et jeux en France",
  description:
    "Les meilleures promotions high-tech, maison et jeux en France. Prix vérifiés chaque jour, sélection courte et liens affiliés sans surcoût.",
  alternates: {
    canonical: "/deals",
  },
  openGraph: {
    title: "Khamseen Deals — Promos high-tech, maison et jeux",
    description:
      "Sélection quotidienne de bons plans en France. Prix vérifiés, remises claires, enseignes connues.",
    type: "website",
    locale: "fr_FR",
    url: "/deals",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sourceCopy = {
  dealabs:
    "Flux live Dealabs (nouveautés + tendance), filtré high-tech / maison / jeux — rafraîchi toutes les 30 min.",
  json: "Flux JSON personnalisé (DEALS_FEED_URL) — rafraîchi toutes les 15 min.",
  seed: "Catalogue de secours local — le flux live est temporairement indisponible.",
} as const;

export default async function DealsPage() {
  const { deals, source } = await getDeals();

  return (
    <>
      <DealsHeader />
      <main id="main-content">
        <DealsHero />
        <DealsCatalog deals={deals} sourceLabel={sourceCopy[source]} />
        <SelectionMethod />
        <AffiliationNotice />
      </main>
      <DealsFooter />
      <CookieBanner />
    </>
  );
}
