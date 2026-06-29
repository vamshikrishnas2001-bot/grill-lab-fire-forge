import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/builder", label: "Builder" },
  { to: "/about", label: "About" },
  { to: "/catering", label: "Catering" },
  { to: "/tracker", label: "Tracker" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="container-grill flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <Flame className="h-5 w-5 text-ember group-hover:rotate-12 transition" />
          <span className="font-display text-lg md:text-xl tracking-widest text-warm">
            THE GRILL <span className="text-copper">LAB</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-[13px] tracking-[0.2em] uppercase text-warm/70 hover:text-warm transition group"
              activeProps={{ className: "text-warm" }}
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-copper transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/loyalty" className="text-[13px] tracking-[0.2em] uppercase text-copper hover:text-ember transition">
            Fire Society
          </Link>
          <Link
            to="/contact"
            className="bg-ember text-white px-5 py-2.5 text-[12px] font-semibold tracking-[0.2em] uppercase hover:opacity-90 transition"
          >
            Contact
          </Link>
        </div>

        <button
          className="lg:hidden text-warm p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <nav className="container-grill flex flex-col py-6 gap-1">
            {[...LINKS, { to: "/gallery", label: "Gallery" }, { to: "/loyalty", label: "Fire Society" }, { to: "/contact", label: "Contact" }].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base tracking-widest uppercase text-warm/80 border-b border-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
