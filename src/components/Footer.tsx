import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone, Mail, Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg2 border-t border-white/5 mt-32">
      <div className="container-grill py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-ember" />
            <span className="font-display text-xl tracking-widest text-warm">
              THE GRILL <span className="text-copper">LAB</span>
            </span>
          </div>
          <p className="text-warm/60 max-w-sm text-sm leading-relaxed">
            Born in fire. Built for the streets. Premium charcoal BBQ chicken & shawarma. Crafted, not cooked.
          </p>
          <form className="mt-6 flex max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm placeholder:text-warm/30 focus:outline-none focus:border-copper"
            />
            <button className="bg-ember text-white px-5 text-xs font-semibold tracking-widest uppercase hover:opacity-90">
              Ignite
            </button>
          </form>
        </div>

        <div>
          <p className="label-mono mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-warm/70">
            <li><Link to="/menu" className="hover:text-copper">Menu</Link></li>
            <li><Link to="/gallery" className="hover:text-copper">Gallery</Link></li>
            <li><Link to="/catering" className="hover:text-copper">Catering</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-mono mb-4">Connect</p>
          <ul className="space-y-3 text-sm text-warm/70">
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-copper" /> @thegrilllab</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-copper" /> +91 98000 00000</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-copper" /> +91 98000 00000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-copper" /> hello@grilllab.in</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-grill py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-warm/40">
          <p>© {new Date().getFullYear()} The Grill Lab. All flames reserved.</p>
          <p className="font-mono uppercase tracking-widest">Burning Charcoal · Koramangala, Bangalore</p>
        </div>
      </div>
    </footer>
  );
}
