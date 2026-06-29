import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Users, Sparkles, CalendarDays, PackageCheck, Flame } from "lucide-react";
import { TIERS } from "@/lib/data";
import { CTAButton, Reveal, SectionLabel, FireParticles } from "@/components/primitives";

export const Route = createFileRoute("/loyalty")({
  head: () => ({
    meta: [
      { title: "Fire Society — The Grill Lab Loyalty" },
      { name: "description", content: "Five tiers. Earn fire. Unlock perks. Welcome to the Fire Society." },
    ],
  }),
  component: Loyalty,
});

const PERKS = [
  { icon: Gift, label: "Birthday Reward" },
  { icon: Users, label: "Referral Points" },
  { icon: Sparkles, label: "Early Access" },
  { icon: CalendarDays, label: "Exclusive Events" },
  { icon: PackageCheck, label: "Monthly Surprise" },
];

function Loyalty() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="pt-32 pb-24">
      <div className="container-grill text-center">
        <SectionLabel>The Fire Society</SectionLabel>
        <h1 className="display-xl mt-3 forged">Earn the Flame.</h1>
        <p className="mt-5 text-warm/60 max-w-xl mx-auto">
          Every order lights a spark. Stack enough sparks and the perks get serious.
        </p>
      </div>

      <section className="container-grill mt-20 space-y-5">
        {TIERS.map((tier, i) => {
          const pct = ((tier.max - tier.min) / 6000) * 100;
          return (
            <Reveal key={tier.id} delay={i * 0.06}>
              <div className="bg-bg2 border border-white/5 p-6 md:p-8 hover:border-copper/30 transition">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-3">
                    <p className="font-display text-5xl text-copper">0{i + 1}</p>
                    <h3 className="display-md text-warm mt-1">{tier.name}</h3>
                    <p className="label-mono mt-1">{tier.range}</p>
                  </div>
                  <div className="md:col-span-5">
                    <div className="h-3 bg-black/60 border border-white/5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, pct + 8)}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-copper via-ember to-gold" />
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <ul className="text-sm text-warm/70 space-y-1.5">
                      {tier.perks.map((p) => <li key={p} className="flex gap-2"><span className="text-ember">·</span>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      <section className="container-grill mt-24">
        <SectionLabel>What you unlock</SectionLabel>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {PERKS.map((p) => (
            <div key={p.label} className="bg-bg2 border border-white/5 p-6 text-center hover:border-copper/30 transition">
              <p.icon className="h-7 w-7 text-copper mx-auto" />
              <p className="mt-4 text-xs tracking-widest uppercase text-warm/80">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-grill mt-24 max-w-xl mx-auto">
        <div className="bg-bg2 border border-copper/30 p-8 md:p-10 relative overflow-hidden">
          {joined ? (
            <div className="text-center py-10 relative">
              <FireParticles count={20} />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <Flame className="h-16 w-16 text-ember mx-auto" />
              </motion.div>
              <h3 className="display-lg mt-6 text-warm">You're in.</h3>
              <p className="mt-3 text-warm/60">Welcome to the Lab.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setJoined(true); }} className="space-y-4">
              <SectionLabel>Join Fire Society</SectionLabel>
              <h2 className="display-md text-warm">Light Your First Spark</h2>
              <input required placeholder="Full Name" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
              <input required type="email" placeholder="Email" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
              <input required type="tel" placeholder="Phone" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
              <CTAButton type="submit" className="w-full">Join the Society</CTAButton>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
