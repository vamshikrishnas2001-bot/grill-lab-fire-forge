import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Cake, Heart, PartyPopper, Music, Check, Flame } from "lucide-react";
import { CATERING } from "@/lib/data";
import { CTAButton, Reveal, SectionLabel, FireParticles } from "@/components/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Catering — The Grill Lab" },
      { name: "description", content: "Premium charcoal BBQ catering for weddings, corporate, festivals, and private events in Bangalore." },
    ],
  }),
  component: Catering,
});

const EVENT_TYPES = [
  { id: "corporate", icon: Briefcase, label: "Corporate" },
  { id: "birthday", icon: Cake, label: "Birthday" },
  { id: "wedding", icon: Heart, label: "Wedding" },
  { id: "private", icon: PartyPopper, label: "Private" },
  { id: "festival", icon: Music, label: "Festival" },
];

function Catering() {
  const [sent, setSent] = useState(false);
  const [eventType, setEventType] = useState("wedding");

  return (
    <div className="pt-32 pb-24">
      <div className="container-grill text-center">
        <SectionLabel>Catering & Events</SectionLabel>
        <h1 className="display-xl mt-3 forged">Bring the Fire.</h1>
        <p className="mt-5 text-warm/60 max-w-xl mx-auto">
          We roll the truck up. We light the charcoal. Your guests don't shut up about it for weeks.
        </p>
      </div>

      <section className="container-grill mt-20 grid md:grid-cols-3 gap-5">
        {CATERING.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 0.1}>
            <div className={cn(
              "relative h-full bg-bg2 border p-8 flex flex-col",
              pkg.highlight ? "border-copper ember-glow" : "border-white/10"
            )}>
              <div className="h-1 -mx-8 -mt-8 mb-7 bg-gradient-to-r from-transparent via-copper to-transparent" />
              {pkg.highlight && <span className="absolute top-4 right-4 label-mono text-ember">Most Popular</span>}
              <SectionLabel>{pkg.tagline}</SectionLabel>
              <h3 className="display-lg mt-2 text-warm">{pkg.name}</h3>
              <p className="mt-3 text-warm/60 text-sm">{pkg.guests} · {pkg.duration}</p>
              <p className="mt-6 font-display text-3xl text-ember">{pkg.price}</p>
              <ul className="mt-7 space-y-3 text-sm text-warm/75 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-copper shrink-0 mt-0.5" /> {f}</li>
                ))}
              </ul>
              <button className="mt-8 w-full border border-copper text-copper hover:bg-copper hover:text-black py-3 text-xs tracking-[0.25em] uppercase transition">
                Request this package
              </button>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-grill mt-24">
        <SectionLabel>Event Type</SectionLabel>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {EVENT_TYPES.map((et) => (
            <button key={et.id} onClick={() => setEventType(et.id)}
              className={cn(
                "flex flex-col items-center gap-3 py-7 border transition",
                eventType === et.id ? "border-copper bg-copper/10" : "border-white/10 hover:border-white/30"
              )}>
              <et.icon className="h-6 w-6 text-copper" />
              <span className="text-xs tracking-widest uppercase text-warm/80">{et.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container-grill mt-12">
        <div className="bg-bg2 border border-white/10 p-8 md:p-12 relative overflow-hidden">
          {sent ? (
            <SuccessState onReset={() => setSent(false)} />
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid md:grid-cols-2 gap-5">
              <Field label="Your Name"><input required className="input" placeholder="Karthik R." /></Field>
              <Field label="Event Type">
                <select className="input" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                  {EVENT_TYPES.map((et) => <option key={et.id} value={et.id}>{et.label}</option>)}
                </select>
              </Field>
              <Field label="Event Date"><input required type="date" className="input" /></Field>
              <Field label="Guest Count"><input required type="number" min={20} className="input" placeholder="120" /></Field>
              <Field label="Location" className="md:col-span-2"><input required className="input" placeholder="Indiranagar, Bangalore" /></Field>
              <Field label="Message" className="md:col-span-2"><textarea rows={4} className="input" placeholder="Tell us about your event..." /></Field>
              <div className="md:col-span-2">
                <CTAButton type="submit">Request a Quote</CTAButton>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="label-mono">{label}</span>
      <div className="mt-2">{children}</div>
      <style>{`.input { width: 100%; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 0.85rem 1rem; color: var(--warm); font-size: 0.9rem; }
      .input:focus { outline: none; border-color: var(--copper); }`}</style>
    </label>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative text-center py-12 overflow-hidden">
      <FireParticles count={20} />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        <Flame className="h-16 w-16 text-ember mx-auto" />
      </motion.div>
      <h3 className="display-lg mt-6 text-warm">Request Received.</h3>
      <p className="mt-3 text-warm/60">Our events team will reach out within 24 hours.</p>
      <button onClick={onReset} className="mt-8 text-xs tracking-widest uppercase text-copper hover:text-ember">Submit another</button>
    </div>
  );
}
