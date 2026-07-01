import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MENU } from "@/lib/data";
import { HeatMeter, SmokeMeter, SectionLabel, Reveal } from "@/components/primitives";
import { inr, cn } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — The Grill Lab" },
      { name: "description", content: "Charcoal BBQ chicken, hand-built shawarma, sides, drinks. Every plate forged over fire." },
      { property: "og:title", content: "The Menu — The Grill Lab" },
    ],
  }),
  component: MenuPage,
});

const CATS = [
  { id: "all", label: "All" },
  { id: "bbq", label: "BBQ Chicken" },
  { id: "shawarma", label: "Shawarma" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
] as const;

function MenuPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]["id"]>("all");
  const items = cat === "all" ? MENU : MENU.filter((m) => m.category === cat);

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-grill text-center">
        <SectionLabel>The Full Menu</SectionLabel>
        <h1 className="display-xl mt-3 forged">Crafted, Not Cooked</h1>
        <p className="mt-5 md:mt-6 text-warm/60 max-w-xl mx-auto">
          Every item below is fired on the truck, to your order. No warming lamps. No microwaves. Just charcoal.
        </p>
      </div>

      <div className="container-grill mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-1 md:gap-2 border-y border-white/5 py-3 md:py-4">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "relative px-3.5 md:px-5 py-2 text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase transition",
              cat === c.id ? "text-warm" : "text-warm/50 hover:text-warm"
            )}
          >
            {c.label}
            {cat === c.id && (
              <motion.span layoutId="cat-underline" className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-copper" />
            )}
          </button>
        ))}
      </div>

      <div className="container-grill mt-12 md:mt-16 space-y-14 md:space-y-24">
        {items.map((item, i) => (
          <MenuRow key={item.id} item={item} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function MenuRow({ item, flip }: { item: MenuItem; flip: boolean }) {
  return (
    <Reveal>
      <article className={cn("grid md:grid-cols-12 gap-8 md:gap-12 items-center group", flip && "md:[&>div:first-child]:order-2")}>
        <div className="md:col-span-7 relative overflow-hidden aspect-[4/3] bg-bg2">
          <img src={item.image} alt={item.name} loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-[1s]" />
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur text-[10px] tracking-widest uppercase text-copper border border-copper/30">
            {item.cookingMethod}
          </div>
        </div>
        <div className="md:col-span-5">
          <SectionLabel>{item.category.toUpperCase()} · {item.cookingTime}</SectionLabel>
          <h2 className="display-lg mt-2 text-warm">{item.name}</h2>
          <p className="mt-4 text-warm/65 leading-relaxed">{item.description}</p>

          <div className="mt-6 flex items-center gap-6">
            <span className="font-display text-4xl text-ember">{inr(item.price)}</span>
            <span className="label-mono">{item.calories} cal</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <HeatMeter level={item.heatLevel} />
            <SmokeMeter level={item.smokeLevel} />
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 grid gap-2 text-sm">
            <p><span className="label-mono mr-2">Pair</span><span className="text-warm/70">{item.pairing}</span></p>
            <p><span className="label-mono mr-2">Combo</span><span className="text-warm/70">{item.recommendedCombo}</span></p>
          </div>

          <button className="mt-8 inline-flex items-center gap-2 bg-ember text-white px-6 py-3 text-xs font-semibold tracking-[0.25em] uppercase hover:scale-[1.02] hover:ember-glow transition">
            <Plus className="h-4 w-4" /> Add to Order
          </button>
        </div>
      </article>
    </Reveal>
  );
}
