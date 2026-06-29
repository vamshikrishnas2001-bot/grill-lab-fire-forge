import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Flame } from "lucide-react";
import { CTAButton, Reveal, SectionLabel, FireParticles, HeatMeter } from "@/components/primitives";
import { MENU, TESTIMONIALS } from "@/lib/data";
import truck from "@/assets/truck-hero.jpg";
import charcoal from "@/assets/charcoal.jpg";
import marinade from "@/assets/marinade.jpg";
import bbq from "@/assets/signature-bbq.jpg";
import shawarma from "@/assets/signature-shawarma.jpg";
import platter from "@/assets/signature-platter.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Grill Lab — Burning Charcoal | Premium BBQ Food Truck" },
      { name: "description", content: "Born in fire. Built for the streets. Premium charcoal BBQ chicken & shawarma food truck in Bangalore." },
      { property: "og:title", content: "The Grill Lab — Burning Charcoal" },
      { property: "og:description", content: "Premium charcoal BBQ chicken & shawarma. Crafted, not cooked." },
      { property: "og:image", content: truck },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <FireIntro />
      <TruckReveal />
      <BuiltOnFire />
      <MeetTheFire />
      <SignatureTeaser />
      <CustomerTicker />
      <TrackBookStrip />
    </>
  );
}

function FireIntro() {
  const [hidden, setHidden] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const skipped = typeof window !== "undefined" && localStorage.getItem("gl.skipIntro") === "1";
    if (!skipped) {
      setHidden(false);
      const t = setTimeout(() => setShowLogo(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (remember = false) => {
    if (remember) localStorage.setItem("gl.skipIntro", "1");
    setHidden(true);
    requestAnimationFrame(() => {
      document.getElementById("truck-reveal")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden"
        >
          <FireParticles count={60} />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ember/30 via-ember/5 to-transparent pointer-events-none" />

          <div className="relative text-center px-6">
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="label-mono mb-6">EST. 2021 · BANGALORE</p>
                  <h1 className="display-xl forged">The Grill Lab</h1>
                  <p className="mt-4 font-mono text-xs md:text-sm tracking-[0.5em] text-copper uppercase">
                    Burning Charcoal
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="mt-12 flex flex-col items-center gap-4"
                  >
                    <button
                      onClick={() => dismiss(false)}
                      className="pulse-ember bg-ember text-white px-8 py-4 text-xs font-semibold tracking-[0.3em] uppercase hover:scale-[1.02] transition"
                    >
                      Enter The Grill Lab
                    </button>
                    <button
                      onClick={() => dismiss(true)}
                      className="text-[11px] tracking-widest uppercase text-warm/40 hover:text-warm transition"
                    >
                      Skip intro
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function TruckReveal() {
  return (
    <section id="truck-reveal" className="relative min-h-[100svh] flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${truck})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black to-transparent" />
      </div>

      {/* Smoke */}
      <div className="absolute top-[15%] left-1/2 w-32 h-32 opacity-40 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 bottom-0 block w-24 h-24 rounded-full bg-white/20 blur-2xl"
            style={{ animation: `smoke-rise ${6 + i}s ease-in ${i * 1.5}s infinite` }}
          />
        ))}
      </div>

      <div className="container-grill relative z-10 grid md:grid-cols-2 gap-12 items-center py-24">
        <Reveal>
          <SectionLabel>Chapter 01 · The Truck</SectionLabel>
          <h2 className="display-xl mt-4 text-warm">
            Born in Fire.<br/>
            <span className="text-ember">Built</span> for the Streets.
          </h2>
          <p className="mt-8 text-lg text-warm/70 max-w-md leading-relaxed">
            BBQ Chicken & Shawarma. Crafted, not cooked. Every order forged over white-hot
            charcoal, on a matte-black truck that rolls into your neighborhood after sundown.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/menu"><CTAButton>Explore the menu</CTAButton></Link>
            <Link to="/tracker"><CTAButton variant="ghost">Find the truck</CTAButton></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BuiltOnFire() {
  const panels = [
    {
      img: charcoal,
      label: "01 · The Charcoal",
      title: "1,200°F. Three Woods.",
      body: "Hardwood lumpwood at the base, apple wood for sweetness, mesquite for muscle. Six-hour burn, never below 1,100°F.",
      stats: [["Temp", "1,200°F"], ["Burn", "6 hrs"], ["Woods", "3"]],
    },
    {
      img: marinade,
      label: "02 · The Marinade",
      title: "24 Hours. 11 Spices.",
      body: "Hung yogurt, Kashmiri chili, smoked paprika, garam masala, mustard oil, garlic, ginger, lemon, sumac, cumin, and one we don't talk about.",
      stats: [["Marinade", "24 hrs"], ["Spices", "11"], ["Yogurt", "Hung"]],
    },
    {
      img: platter,
      label: "03 · The Craft",
      title: "No Microwaves. Ever.",
      body: "Every piece fired to order. No warming lamps, no shortcuts. If it takes 22 minutes, it takes 22 minutes. We don't trade time for taste.",
      stats: [["Cook", "22 min"], ["Method", "Charcoal"], ["Shortcuts", "Zero"]],
    },
  ];

  return (
    <section className="relative py-24 md:py-40">
      <div className="container-grill">
        <Reveal>
          <SectionLabel>Chapter 02 · Built on Fire</SectionLabel>
          <h2 className="display-lg mt-3 text-warm max-w-2xl">
            Three things make a Grill Lab plate.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {panels.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <article className="group relative overflow-hidden bg-bg2 border border-white/5 hover:border-copper/30 transition h-full">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-7">
                  <SectionLabel>{p.label}</SectionLabel>
                  <h3 className="display-md text-warm mt-3">{p.title}</h3>
                  <p className="mt-4 text-warm/65 text-sm leading-relaxed">{p.body}</p>
                  <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-3">
                    {p.stats.map(([k, v]) => (
                      <div key={k}>
                        <p className="font-display text-2xl text-ember">{v}</p>
                        <p className="label-mono mt-1 text-[10px]">{k}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeetTheFire() {
  const values = [
    { word: "BOLD.", line: "Loud flavor. Louder fire." },
    { word: "SMOKY.", line: "Charcoal, never gas." },
    { word: "REAL.", line: "No shortcuts. Ever." },
  ];
  return (
    <section className="relative">
      <div className="grid md:grid-cols-2 min-h-[80vh]">
        <div className="relative">
          <img src={bbq} alt="BBQ chicken on grill" loading="lazy"
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:to-transparent" />
        </div>
        <div className="relative bg-bg2 flex items-center px-8 md:px-16 py-20 md:py-0 border-l border-copper/30">
          <div>
            <SectionLabel>Chapter 03 · The Brand</SectionLabel>
            <h2 className="display-lg mt-4 text-warm">Meet the Fire</h2>
            <div className="mt-10 space-y-8">
              {values.map((v, i) => (
                <Reveal key={v.word} delay={i * 0.15}>
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-4xl md:text-6xl text-ember">{v.word}</span>
                    <span className="text-warm/60 text-sm">{v.line}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Link to="/about" className="mt-12 inline-flex items-center gap-2 text-copper text-sm tracking-widest uppercase group">
              Our Story <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureTeaser() {
  const items = MENU.filter((m) => ["bbq-1", "sh-3", "bbq-3"].includes(m.id));
  const imgs = [bbq, shawarma, platter];
  return (
    <section className="container-grill py-24 md:py-40">
      <Reveal>
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Chapter 04 · Signature Items</SectionLabel>
            <h2 className="display-lg mt-3 text-warm">Forged Favorites.</h2>
          </div>
          <Link to="/menu" className="hidden md:inline-flex items-center gap-2 text-copper text-sm tracking-widest uppercase">
            Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.1}>
            <Link to="/menu" className="group block relative aspect-[3/4] overflow-hidden bg-bg2 border border-white/5 hover:border-copper transition">
              <img src={imgs[i]} alt={item.name} loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[1.2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="display-md text-warm">{item.name}</h3>
                <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-500">
                  <HeatMeter level={item.heatLevel} />
                  <span className="font-display text-2xl text-ember">₹{item.price}</span>
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-copper opacity-0 group-hover:opacity-100 transition delay-100">
                  Explore item <ArrowRight className="h-3 w-3" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CustomerTicker() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative py-24 border-y border-white/5 bg-bg2/40 overflow-hidden">
      <div className="container-grill mb-10">
        <SectionLabel>Chapter 05 · Fire Stories</SectionLabel>
        <h2 className="display-lg mt-3 text-warm">Words from the Lab.</h2>
      </div>
      <div className="overflow-hidden">
        <div className="flex ticker gap-8 w-max">
          {loop.map((t, i) => (
            <div key={i} className="w-[420px] md:w-[560px] shrink-0 px-8 py-7 bg-bg2 border border-white/5">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.flame }).map((_, j) => (
                  <Flame key={j} className="h-4 w-4 text-ember fill-ember" />
                ))}
              </div>
              <p className="font-display text-2xl md:text-3xl text-warm leading-tight">"{t.quote}"</p>
              <p className="mt-5 label-mono">{t.name} · <span className="text-warm/40">{t.handle}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackBookStrip() {
  return (
    <section className="grid md:grid-cols-2">
      <Link to="/tracker" className="group relative p-12 md:p-20 bg-black overflow-hidden border-b md:border-b-0 md:border-r border-copper/30 hover:bg-bg2 transition">
        <div className="absolute top-12 right-12 flex items-center gap-2">
          <span className="block w-2 h-2 rounded-full bg-ember animate-pulse" />
          <span className="label-mono">Open Now</span>
        </div>
        <MapPin className="h-8 w-8 text-copper mb-6" />
        <h3 className="display-lg text-warm">Find the Truck Today</h3>
        <p className="mt-3 text-warm/60 max-w-md">Live location, hours, crowd level. Track the fire.</p>
        <p className="mt-8 inline-flex items-center gap-2 text-copper text-sm tracking-widest uppercase">
          Open tracker <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </p>
      </Link>

      <Link to="/catering" className="group relative p-12 md:p-20 bg-bg2 overflow-hidden hover:bg-black transition">
        <Calendar className="h-8 w-8 text-copper mb-6" />
        <h3 className="display-lg text-warm">Book for Your Event</h3>
        <p className="mt-3 text-warm/60 max-w-md">From 50 to 1,000+. We bring the truck. We bring the fire.</p>
        <p className="mt-8 inline-flex items-center gap-2 text-copper text-sm tracking-widest uppercase">
          Catering packages <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </p>
      </Link>
    </section>
  );
}
