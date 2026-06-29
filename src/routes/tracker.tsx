import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, Users, Bell, X } from "lucide-react";
import { CTAButton, Reveal, SectionLabel } from "@/components/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tracker")({
  head: () => ({
    meta: [
      { title: "Live Truck Tracker — The Grill Lab" },
      { name: "description", content: "Where the truck is right now. Koramangala, Bangalore. 6PM–11PM tonight." },
    ],
  }),
  component: Tracker,
});

const UPCOMING = [
  { day: "Tomorrow", area: "Indiranagar — 100 Ft Road", hours: "6PM – 11PM" },
  { day: "Wed", area: "HSR Layout — Sector 1", hours: "6PM – 11PM" },
  { day: "Thu", area: "Whitefield — Phoenix", hours: "7PM – 12AM" },
  { day: "Fri", area: "Koramangala — 5th Block", hours: "6PM – 1AM" },
];

function Tracker() {
  const [notify, setNotify] = useState(false);

  return (
    <div className="pt-28">
      <div className="relative h-[68vh] md:h-[75vh] bg-bg2 overflow-hidden">
        <iframe
          title="Truck location"
          src="https://www.google.com/maps?q=Koramangala+5th+Block+Bangalore&output=embed"
          className="absolute inset-0 w-full h-full grayscale-[40%] contrast-110 brightness-[0.55] saturate-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40 pointer-events-none" />

        {/* Status card overlay */}
        <div className="absolute left-4 right-4 md:left-12 md:right-auto top-6 md:top-12 max-w-md bg-black/85 backdrop-blur-xl border border-copper/30 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-ember" />
            </span>
            <p className="label-mono text-ember">Open Now</p>
          </div>
          <h2 className="display-lg mt-3 text-warm">Koramangala</h2>
          <p className="text-warm/70 text-sm mt-1">80 Feet Road, 5th Block · Near Sony World</p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center border-t border-white/10 pt-5">
            <div>
              <Clock className="h-4 w-4 text-copper mx-auto" />
              <p className="font-display text-lg text-warm mt-2">6–11 PM</p>
              <p className="label-mono text-[10px]">Hours</p>
            </div>
            <div>
              <Users className="h-4 w-4 text-copper mx-auto" />
              <p className="font-display text-lg text-warm mt-2">Packed</p>
              <p className="label-mono text-[10px]">Crowd</p>
            </div>
            <div>
              <MapPin className="h-4 w-4 text-copper mx-auto" />
              <p className="font-display text-lg text-warm mt-2">~22 min</p>
              <p className="label-mono text-[10px]">Wait</p>
            </div>
          </div>

          <button onClick={() => setNotify(true)} className="mt-6 w-full inline-flex items-center justify-center gap-2 border border-copper text-copper hover:bg-copper hover:text-black py-3 text-xs tracking-[0.25em] uppercase transition">
            <Bell className="h-4 w-4" /> Get Notified
          </button>
        </div>

        {/* Truck pin animation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <span className="absolute -inset-6 rounded-full bg-ember/30 animate-ping" />
            <div className="relative bg-ember p-3 rounded-full ember-glow">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-12">
              <span className="block absolute inset-x-0 bottom-0 h-6 w-6 rounded-full bg-white/30 blur-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <section className="container-grill py-20">
        <Reveal>
          <SectionLabel>Upcoming Locations</SectionLabel>
          <h2 className="display-lg mt-3 text-warm">This Week's Routes</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
          {UPCOMING.map((u) => (
            <div key={u.day} className="grid md:grid-cols-3 gap-3 py-6 items-center">
              <p className="font-display text-2xl text-copper">{u.day}</p>
              <p className="text-warm">{u.area}</p>
              <p className="label-mono md:text-right">{u.hours}</p>
            </div>
          ))}
        </div>
      </section>

      {notify && (
        <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4" onClick={() => setNotify(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-bg2 border border-copper/30 p-8 max-w-md w-full relative">
            <button onClick={() => setNotify(false)} className="absolute top-4 right-4 text-warm/60"><X className="h-5 w-5" /></button>
            <SectionLabel>Notify Me</SectionLabel>
            <h3 className="display-md mt-3 text-warm">Get truck alerts</h3>
            <p className="mt-3 text-warm/60 text-sm">We'll ping you when the truck rolls into your neighborhood.</p>
            <form onSubmit={(e) => { e.preventDefault(); setNotify(false); }} className="mt-6 space-y-3">
              <input required type="email" placeholder="you@email.com" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
              <CTAButton type="submit" className="w-full">Notify Me</CTAButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
