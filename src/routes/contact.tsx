import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MessageCircle, Instagram } from "lucide-react";
import { CTAButton, Reveal, SectionLabel } from "@/components/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Grill Lab" },
      { name: "description", content: "Talk to The Grill Lab. WhatsApp, Instagram, phone, email. Or just show up." },
    ],
  }),
  component: Contact,
});

const CHANNELS = [
  { icon: MessageCircle, label: "WhatsApp", value: "+91 98000 00000", href: "https://wa.me/919800000000" },
  { icon: Instagram, label: "Instagram", value: "@thegrilllab", href: "https://instagram.com" },
  { icon: Phone, label: "Phone", value: "+91 98000 00000", href: "tel:+919800000000" },
  { icon: Mail, label: "Email", value: "hello@grilllab.in", href: "mailto:hello@grilllab.in" },
];

const HOURS = [
  { day: "Monday", h: "6PM – 11PM", open: true },
  { day: "Tuesday", h: "6PM – 11PM", open: true },
  { day: "Wednesday", h: "6PM – 11PM", open: true },
  { day: "Thursday", h: "6PM – 11PM", open: true },
  { day: "Friday", h: "6PM – 1AM", open: true },
  { day: "Saturday", h: "6PM – 1AM", open: true },
  { day: "Sunday", h: "Closed", open: false },
];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32 pb-24">
      <div className="container-grill text-center">
        <SectionLabel>Talk to us</SectionLabel>
        <h1 className="display-xl mt-3 forged">Get in Touch.</h1>
      </div>

      <section className="container-grill mt-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionLabel>Channels</SectionLabel>
          <div className="mt-6 space-y-3">
            {CHANNELS.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-5 bg-bg2 border border-white/5 hover:border-copper p-5 transition group">
                <span className="w-12 h-12 grid place-items-center bg-black/40 border border-white/10 group-hover:border-copper transition">
                  <c.icon className="h-5 w-5 text-copper" />
                </span>
                <div className="flex-1">
                  <p className="label-mono">{c.label}</p>
                  <p className="font-display text-2xl text-warm mt-1">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Send a message</SectionLabel>
          <div className="mt-6 bg-bg2 border border-white/5 p-7">
            {sent ? (
              <div className="text-center py-10">
                <p className="display-md text-warm">Message sent.</p>
                <p className="mt-3 text-warm/60">We'll reply within one fire cycle.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-xs tracking-widest uppercase text-copper">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <input required placeholder="Your Name" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
                <select required className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Catering</option>
                  <option>Partnership</option>
                  <option>Press</option>
                </select>
                <textarea rows={5} required placeholder="Tell us more..." className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
                <CTAButton type="submit" className="w-full">Send Message</CTAButton>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="container-grill mt-20 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <SectionLabel>Find us</SectionLabel>
          <div className="mt-6 aspect-[4/3] border border-white/10 overflow-hidden bg-bg2">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Koramangala+5th+Block+Bangalore&output=embed"
              className="w-full h-full grayscale-[40%] brightness-[0.55] contrast-110"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal>
          <SectionLabel>Business Hours</SectionLabel>
          <div className="mt-6 bg-bg2 border border-white/5 divide-y divide-white/5">
            {HOURS.map((h) => (
              <div key={h.day} className="flex items-center justify-between px-6 py-4">
                <span className="text-warm">{h.day}</span>
                <div className="flex items-center gap-4">
                  <span className="label-mono">{h.h}</span>
                  <span className={cn(
                    "px-2.5 py-1 text-[10px] tracking-widest uppercase",
                    h.open ? "bg-ember/15 text-ember" : "bg-white/5 text-warm/40"
                  )}>{h.open ? "Open" : "Closed"}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
