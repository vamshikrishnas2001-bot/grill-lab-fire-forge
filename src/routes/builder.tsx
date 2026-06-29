import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CTAButton, SectionLabel } from "@/components/primitives";
import { cn, inr } from "@/lib/utils";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Build Your Shawarma — The Grill Lab" },
      { name: "description", content: "Build your own charcoal-grilled shawarma. Bread, protein, sauces, fire level. Your fire, your way." },
    ],
  }),
  component: Builder,
});

type Single<T extends string> = T;
type Multi<T extends string> = T[];

const BREADS = ["Pita", "Saj", "Wrap"] as const;
const PROTEINS = [
  { id: "classic", name: "Classic Chicken", price: 0 },
  { id: "spicy", name: "Spicy BBQ", price: 30 },
  { id: "smoked", name: "Smoked Mix", price: 50 },
] as const;
const VEGGIES = ["Lettuce", "Tomato", "Pickles", "Onions", "Jalapeños"] as const;
const SAUCES = ["Garlic", "Tahini", "Harissa", "Chili Oil", "House Mix"] as const;
const CHEESE = [
  { id: "none", name: "None", price: 0 },
  { id: "halloumi", name: "Halloumi", price: 60 },
  { id: "mozzarella", name: "Mozzarella", price: 40 },
] as const;
const SPICE_LABELS = ["Mild", "Medium", "Hot", "Volcanic", "Hellfire"];
const EXTRAS = [
  { id: "fries", name: "Fries Inside", price: 40 },
  { id: "double", name: "Double Sauce", price: 20 },
  { id: "ex-protein", name: "Extra Protein", price: 80 },
] as const;

function Builder() {
  const [bread, setBread] = useState<(typeof BREADS)[number]>("Saj");
  const [protein, setProtein] = useState<string>("classic");
  const [veggies, setVeggies] = useState<Multi<(typeof VEGGIES)[number]>>(["Lettuce", "Tomato", "Pickles"]);
  const [sauce, setSauce] = useState<(typeof SAUCES)[number]>("Garlic");
  const [cheese, setCheese] = useState<string>("none");
  const [spice, setSpice] = useState(2);
  const [extras, setExtras] = useState<string[]>([]);

  const price = useMemo(() => {
    let p = 229;
    p += PROTEINS.find((x) => x.id === protein)!.price;
    p += CHEESE.find((x) => x.id === cheese)!.price;
    p += extras.reduce((s, id) => s + (EXTRAS.find((e) => e.id === id)?.price ?? 0), 0);
    return p;
  }, [protein, cheese, extras]);

  const toggle = <T extends string>(arr: T[], setArr: (v: T[]) => void, v: T) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const emberOpacity = spice / 5;

  return (
    <div className="pt-28 pb-24">
      <div className="container-grill text-center mb-12">
        <SectionLabel>Build Your Own</SectionLabel>
        <h1 className="display-xl mt-3 forged">Forge a Shawarma</h1>
        <p className="mt-5 text-warm/60 max-w-xl mx-auto">
          Pick your fire. Build it your way. We'll wrap it on the truck.
        </p>
      </div>

      <div className="container-grill grid lg:grid-cols-12 gap-8">
        {/* Steps */}
        <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
          <Step n={1} label="Choose Bread">
            <Choices options={BREADS.map((b) => ({ id: b, name: b }))} value={bread} onChange={(v) => setBread(v as any)} />
          </Step>
          <Step n={2} label="Choose Protein">
            <Choices options={PROTEINS.map((p) => ({ id: p.id, name: `${p.name}${p.price ? ` +₹${p.price}` : ""}` }))} value={protein} onChange={setProtein} />
          </Step>
          <Step n={3} label="Add Veggies">
            <div className="flex flex-wrap gap-2">
              {VEGGIES.map((v) => (
                <button key={v} onClick={() => toggle(veggies as any, setVeggies as any, v)}
                  className={cn(
                    "px-4 py-2 border text-xs tracking-widest uppercase transition",
                    veggies.includes(v) ? "border-copper bg-copper/10 text-warm" : "border-white/10 text-warm/60 hover:border-white/30"
                  )}>{v}</button>
              ))}
            </div>
          </Step>
          <Step n={4} label="Choose Sauce">
            <Choices options={SAUCES.map((s) => ({ id: s, name: s }))} value={sauce} onChange={(v) => setSauce(v as any)} />
          </Step>
          <Step n={5} label="Add Cheese">
            <Choices options={CHEESE.map((c) => ({ id: c.id, name: `${c.name}${c.price ? ` +₹${c.price}` : ""}` }))} value={cheese} onChange={setCheese} />
          </Step>
          <Step n={6} label="Spice Level">
            <input type="range" min={1} max={5} value={spice} onChange={(e) => setSpice(+e.target.value)}
              className="w-full accent-ember" />
            <div className="mt-3 flex items-center justify-between">
              <span className="label-mono">{SPICE_LABELS[spice - 1]}</span>
              <span className="font-display text-3xl text-ember">{spice}/5</span>
            </div>
          </Step>
          <Step n={7} label="Extras">
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((e) => (
                <button key={e.id} onClick={() => toggle(extras, setExtras, e.id)}
                  className={cn(
                    "px-4 py-2 border text-xs tracking-widest uppercase transition",
                    extras.includes(e.id) ? "border-ember bg-ember/10 text-warm" : "border-white/10 text-warm/60 hover:border-white/30"
                  )}>{e.name} +₹{e.price}</button>
              ))}
            </div>
          </Step>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-28 self-start">
          <div
            className="relative overflow-hidden bg-bg2 border border-white/10 aspect-[4/5] flex items-center justify-center"
            style={{
              boxShadow: `inset 0 -200px 200px -100px oklch(0.66 0.21 45 / ${emberOpacity * 0.7})`,
              transition: "box-shadow 0.5s",
            }}
          >
            <div className="absolute inset-0 opacity-20 mix-blend-screen"
              style={{ backgroundImage: "radial-gradient(circle at 50% 90%, var(--ember), transparent 60%)" }}/>
            <ShawarmaIllustration bread={bread} cheese={cheese} sauce={sauce} veggies={veggies as any} spice={spice} />
            <div className="absolute top-5 left-5">
              <SectionLabel>Live Preview</SectionLabel>
            </div>
            <div className="absolute top-5 right-5 text-right">
              <p className="label-mono">Total</p>
              <p className="font-display text-4xl text-ember">{inr(price)}</p>
            </div>
            <div className="absolute bottom-5 inset-x-5 bg-black/60 backdrop-blur p-5 border border-white/10">
              <p className="label-mono mb-2">Your Build</p>
              <p className="text-sm text-warm/80 leading-relaxed">
                <strong className="text-warm">{bread}</strong> · {PROTEINS.find(p=>p.id===protein)?.name} ·{" "}
                {veggies.join(", ") || "no veg"} · {sauce} sauce ·{" "}
                {CHEESE.find(c=>c.id===cheese)?.name} cheese · {SPICE_LABELS[spice-1]} heat
                {extras.length ? ` · ${extras.map(id => EXTRAS.find(e=>e.id===id)!.name).join(", ")}` : ""}.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <CTAButton className="flex-1">Complete your order — {inr(price)}</CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: n * 0.04 }}
      className="bg-bg2/70 border border-white/5 p-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-display text-2xl text-copper">0{n}</span>
        <h3 className="text-sm tracking-[0.25em] uppercase text-warm">{label}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function Choices({ options, value, onChange }: { options: { id: string; name: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((o) => (
        <button key={o.id} onClick={() => onChange(o.id)}
          className={cn(
            "px-3 py-3 border text-xs tracking-widest uppercase transition flex items-center justify-center gap-2",
            value === o.id ? "border-copper bg-copper/10 text-warm" : "border-white/10 text-warm/60 hover:border-white/30"
          )}>
          {value === o.id && <Check className="h-3 w-3 text-copper" />}{o.name}
        </button>
      ))}
    </div>
  );
}

function ShawarmaIllustration({ bread, cheese, sauce, veggies, spice }: { bread: string; cheese: string; sauce: string; veggies: string[]; spice: number }) {
  const palette: Record<string, string> = {
    Garlic: "oklch(0.92 0.05 90)",
    Tahini: "oklch(0.78 0.08 80)",
    Harissa: "oklch(0.55 0.18 30)",
    "Chili Oil": "oklch(0.55 0.20 35)",
    "House Mix": "oklch(0.65 0.10 50)",
  };
  return (
    <div className="relative w-56 h-80">
      {/* Bread wrap */}
      <motion.div
        key={bread}
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="absolute inset-0 rounded-[40%] border-4"
        style={{
          background: bread === "Saj" ? "oklch(0.78 0.06 80)" : bread === "Pita" ? "oklch(0.82 0.05 85)" : "oklch(0.7 0.08 70)",
          borderColor: "oklch(0.55 0.08 50)",
        }}
      />
      {/* Protein */}
      <div className="absolute inset-x-6 top-12 bottom-20 rounded-[30%] bg-[oklch(0.45_0.15_45)] opacity-90" />
      {/* Veggies */}
      <div className="absolute inset-x-8 top-16 bottom-24 flex flex-wrap content-start gap-1">
        {veggies.map((v) => (
          <span key={v} className="w-2.5 h-2.5 rounded-full"
            style={{ background: v === "Lettuce" ? "oklch(0.7 0.18 140)" : v === "Tomato" ? "oklch(0.55 0.2 25)" : v === "Onions" ? "oklch(0.85 0.05 0)" : v === "Pickles" ? "oklch(0.75 0.15 120)" : "oklch(0.65 0.2 130)" }}/>
        ))}
      </div>
      {/* Sauce drip */}
      <motion.div
        key={sauce}
        initial={{ height: 0 }} animate={{ height: "60%" }} transition={{ duration: 0.6 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-3 rounded-full opacity-80"
        style={{ background: palette[sauce] }}
      />
      {/* Cheese */}
      {cheese !== "none" && (
        <div className="absolute inset-x-10 top-20 h-8 opacity-80"
          style={{ background: cheese === "halloumi" ? "oklch(0.92 0.05 80)" : "oklch(0.95 0.04 90)" }} />
      )}
      {/* Spice glow */}
      <div className="absolute inset-0 rounded-[40%] pointer-events-none"
        style={{ boxShadow: `0 0 ${spice * 14}px ${spice * 4}px oklch(0.66 0.21 45 / ${spice * 0.12})` }}/>
    </div>
  );
}
