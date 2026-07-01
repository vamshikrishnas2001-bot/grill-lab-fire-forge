import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/primitives";
import { cn } from "@/lib/utils";
import bbq from "@/assets/signature-bbq.jpg";
import shawarma from "@/assets/signature-shawarma.jpg";
import platter from "@/assets/signature-platter.jpg";
import truck from "@/assets/truck-hero.jpg";
import founder from "@/assets/founder.jpg";
import charcoal from "@/assets/charcoal.jpg";
import marinade from "@/assets/marinade.jpg";
import kebab from "@/assets/menu-kebab.jpg";
import wings from "@/assets/menu-wings.jpg";
import fries from "@/assets/menu-fries.jpg";
import hummus from "@/assets/menu-hummus.jpg";
import drink from "@/assets/menu-drink.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: "Gallery — The Grill Lab" }, { name: "description", content: "Food. Truck. Events. Behind the fire." }],
  }),
  component: Gallery,
});

type Cat = "all" | "food" | "truck" | "events" | "bts";
const PHOTOS: { src: string; cat: Exclude<Cat, "all">; caption: string }[] = [
  { src: bbq, cat: "food", caption: "Inferno Half Chicken on the grates" },
  { src: shawarma, cat: "food", caption: "Saj-wrapped, garlic-sauced" },
  { src: platter, cat: "food", caption: "Pitmaster Platter, fresh off the grill" },
  { src: truck, cat: "truck", caption: "Truck in the lab" },
  { src: founder, cat: "bts", caption: "Karthik, working the fire" },
  { src: charcoal, cat: "bts", caption: "1,200 degrees" },
  { src: marinade, cat: "bts", caption: "House marinade, in progress" },
  { src: kebab, cat: "food", caption: "Tikka skewers, kissed by flame" },
  { src: wings, cat: "food", caption: "Hellfire wings — sign the waiver" },
  { src: fries, cat: "food", caption: "Burnt garlic fries" },
  { src: hummus, cat: "food", caption: "Smoked hummus bowl" },
  { src: drink, cat: "food", caption: "Smoked old fashioned" },
];

const TABS: { id: Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "truck", label: "Truck" },
  { id: "events", label: "Events" },
  { id: "bts", label: "Behind the Scenes" },
];

function Gallery() {
  const [tab, setTab] = useState<Cat>("all");
  const [open, setOpen] = useState<number | null>(null);
  const photos = tab === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === tab);

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-grill text-center">
        <SectionLabel>Gallery</SectionLabel>
        <h1 className="display-xl mt-3 forged">The Fire, Framed.</h1>
      </div>

      <div className="container-grill mt-8 md:mt-12 flex flex-wrap justify-center gap-1 md:gap-2 border-y border-white/5 py-4">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("relative px-5 py-2 text-xs tracking-[0.25em] uppercase transition",
              tab === t.id ? "text-warm" : "text-warm/50 hover:text-warm")}>
            {t.label}
            {tab === t.id && <motion.span layoutId="gal-underline" className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-copper" />}
          </button>
        ))}
      </div>

      <div className="container-grill mt-10 columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance]">
        {photos.map((p, i) => (
          <Reveal key={p.src + i} delay={(i % 6) * 0.04}>
            <button onClick={() => setOpen(i)} className="group block w-full mb-3 relative overflow-hidden bg-bg2">
              <img src={p.src} alt={p.caption} loading="lazy"
                className="w-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/20 transition" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p className="label-mono">{p.cat}</p>
                <p className="text-warm text-sm mt-1">{p.caption}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="container-grill mt-20 text-center bg-bg2 py-16 border border-copper/20">
        <Instagram className="h-8 w-8 text-copper mx-auto" />
        <h2 className="display-lg mt-4 text-warm">@thegrilllab</h2>
        <p className="mt-3 text-warm/60">Follow the fire on Instagram.</p>
      </div>

      <Lightbox open={open !== null} photos={photos} index={open ?? 0} onClose={() => setOpen(null)} onNav={(d: number) => setOpen((i) => i === null ? 0 : (i + d + photos.length) % photos.length)} />
    </div>
  );
}

function Lightbox({ open, photos, index, onClose, onNav }: any) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 md:p-6">
          <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-warm/80 hover:text-warm p-2"><X className="h-6 w-6 md:h-7 md:w-7" /></button>
          <button onClick={() => onNav(-1)} className="absolute bottom-4 left-4 md:bottom-auto md:left-12 md:top-1/2 md:-translate-y-1/2 text-warm/60 hover:text-copper p-2"><ChevronLeft className="h-8 w-8 md:h-10 md:w-10" /></button>
          <button onClick={() => onNav(1)} className="absolute bottom-4 right-4 md:bottom-auto md:right-12 md:top-1/2 md:-translate-y-1/2 text-warm/60 hover:text-copper p-2"><ChevronRight className="h-8 w-8 md:h-10 md:w-10" /></button>
          <motion.figure key={index} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="max-w-5xl max-h-[75vh] md:max-h-[85vh]">
            <img src={photos[index].src} alt={photos[index].caption} className="max-w-full max-h-[65vh] md:max-h-[80vh] object-contain" />
            <figcaption className="mt-3 text-center label-mono px-4">{photos[index].caption}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
