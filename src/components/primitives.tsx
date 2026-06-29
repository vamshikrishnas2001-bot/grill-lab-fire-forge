import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-mono", className)}>{children}</p>;
}

export function HeatMeter({ level, label = "Heat" }: { level: number; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="label-mono">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame
            key={i}
            className={cn(
              "h-3.5 w-3.5 transition",
              i < level ? "text-ember fill-ember" : "text-white/15"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function SmokeMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="label-mono">Smoke</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "block w-3 h-3.5 rounded-sm",
              i < level ? "bg-copper" : "bg-white/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}

interface CTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ember" | "ghost";
}
export function CTAButton({ variant = "ember", className, children, ...rest }: CTAProps) {
  return (
    <button
      {...rest}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300",
        variant === "ember"
          ? "bg-ember text-white hover:scale-[1.02] hover:ember-glow"
          : "border border-copper text-copper hover:bg-copper hover:text-black",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FireParticles({ count = 30 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 6;
        const dur = 4 + Math.random() * 5;
        const size = 2 + Math.random() * 4;
        const hue = Math.random() > 0.5 ? "var(--ember)" : "var(--gold)";
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              backgroundColor: hue,
              filter: "blur(0.5px)",
              boxShadow: `0 0 ${size * 3}px ${hue}`,
              animation: `ember-rise ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
