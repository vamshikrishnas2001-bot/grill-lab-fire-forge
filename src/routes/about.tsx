import { createFileRoute } from "@tanstack/react-router";
import { Flame, Zap, Leaf } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/primitives";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — The Grill Lab" },
      { name: "description", content: "From idea to truck to ten thousand fires. The story behind The Grill Lab." },
      { property: "og:image", content: founder },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: "2021", title: "The Idea", body: "A chef and a welder argue over charcoal in a Bangalore garage." },
  { year: "2022", title: "First Truck", body: "A matte-black Sprinter hits Koramangala. Lines form by week two." },
  { year: "2023", title: "10,000 Customers", body: "Word travels. So does the truck." },
  { year: "2024", title: "Catering Launch", body: "Weddings, festivals, corporate. Fire on demand." },
  { year: "2025", title: "The Grill Lab is Born", body: "A brand, a system, a movement. Same fire. Bigger flame." },
];

const VALUES = [
  { icon: Flame, title: "Fire First", body: "Charcoal or nothing. Gas is a shortcut. We don't take shortcuts." },
  { icon: Zap, title: "Zero Shortcuts", body: "24-hour marinades. 22-minute cooks. No microwaves. No warming lamps." },
  { icon: Leaf, title: "Always Fresh", body: "Sourced daily. Marinated daily. If we don't sell it, we don't serve it tomorrow." },
];

function About() {
  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-grill text-center">
        <SectionLabel>Our Story</SectionLabel>
        <h1 className="display-xl mt-3 forged">Five Years of Fire</h1>
      </div>

      <section className="container-grill mt-14 md:mt-24 max-w-3xl">
        <SectionLabel>Timeline</SectionLabel>
        <div className="relative mt-8 pl-6 md:pl-8 border-l border-copper/30 space-y-10 md:space-y-12">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-[29px] md:-left-[37px] top-2 w-3 h-3 bg-ember rounded-full ember-glow" />
                <p className="font-mono text-xs tracking-widest text-copper">{t.year}</p>
                <h3 className="display-md text-warm mt-2">{t.title}</h3>
                <p className="mt-3 text-warm/65 max-w-md">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-grill mt-20 md:mt-32">
        <SectionLabel>Our Principles</SectionLabel>
        <div className="mt-8 grid md:grid-cols-3 gap-5 md:gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="bg-bg2 border border-white/5 p-6 md:p-8 h-full hover:border-copper/30 transition">
                <v.icon className="h-8 w-8 text-ember mb-6" />
                <h3 className="display-md text-warm">{v.title}</h3>
                <p className="mt-3 text-warm/65 text-sm">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-32 grid md:grid-cols-2 md:min-h-[60vh]">
        <div className="relative h-[45vh] md:h-auto">
          <img src={founder} alt="Founder at the grill" loading="lazy"
            className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="bg-bg2 flex items-center px-6 md:px-16 py-14 md:py-0 border-l border-copper/30">
          <Reveal>
            <SectionLabel>The Founder</SectionLabel>
            <blockquote className="display-lg mt-6 text-warm leading-tight">
              "I didn't want to open a restaurant. I wanted to build an experience."
            </blockquote>
            <p className="mt-6 label-mono">— Karthik Reddy, Founder + Pitmaster</p>
          </Reveal>
        </div>
      </section>

      <section className="container-grill mt-20 md:mt-32">
        <SectionLabel>The Process</SectionLabel>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Source", "Marinate", "Smoke", "Serve"].map((s, i) => (
            <Reveal key={s} delay={i * 0.1}>
              <div className="bg-bg2/60 border border-white/5 p-5 md:p-8">
                <p className="font-display text-4xl md:text-5xl text-copper">0{i + 1}</p>
                <h3 className="display-md mt-4 text-warm">{s}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
