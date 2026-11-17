
"use client";

import { useState } from "react";

import PortfolioHero from "@/components/website/portfolio/PortfolioHero";
import PortfolioFilter from "@/components/website/portfolio/PortfolioFilter";
import PortfolioGrid from "@/components/website/portfolio/PortfolioGrid";
import PortfolioCTA from "@/components/website/portfolio/PortfolioCTA";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="overflow-hidden bg-[#FCFAFF] text-[#171321]">

      {/* PORTFOLIO HERO */}
      <PortfolioHero />

      {/* PROJECT FILTER AND GRID */}
      <section className="pt-12 sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-8 text-center">
            <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
              My Work
            </span>

            <h2 className="mt-3 text-[clamp(30px,3.5vw,44px)] font-bold">
              Explore My <span className="text-[#7900D8]">Projects.</span>
            </h2>

            <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg">
              A collection of creative designs and digital experiences.
            </p>
          </div>

          <PortfolioFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

        </div>
      </section>

      <PortfolioGrid activeFilter={activeFilter} />

      {/* CONTACT CTA */}
      <PortfolioCTA />

    </main>
  );
}
