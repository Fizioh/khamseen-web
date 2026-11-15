import type { Metadata } from "next";
import { AffiliationNotice } from "@/components/deals/AffiliationNotice";
import { CookieBanner } from "@/components/deals/CookieBanner";
import { DealsCatalog } from "@/components/deals/DealsCatalog";
import { DealsFooter } from "@/components/deals/DealsFooter";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { DealsHero } from "@/components/deals/DealsHero";
import { SelectionMethod } from "@/components/deals/SelectionMethod";
import { deals } from "@/data/deals";

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

export default function DealsPage() {
  return (
    <>
      <DealsHeader />
      <main id="main-content">
        <DealsHero />
        <DealsCatalog deals={deals} />
        <SelectionMethod />
        <AffiliationNotice />
      </main>
      <DealsFooter />
      <CookieBanner />
    </>
  );
}
