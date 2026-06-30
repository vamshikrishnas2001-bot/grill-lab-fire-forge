import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, MapPin, Users, BarChart3,
  Tag, Star, Bell, Flame, LogOut, Plus
} from "lucide-react";
import { MENU, ORDERS, CUSTOMERS, CHART_DAILY, TOP_ITEMS } from "@/lib/data";
import { cn, inr } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — The Grill Lab" }, { name: "robots", content: "noindex" }],
  }),
  component: Admin,
});

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "menu", label: "Menu Manager", icon: UtensilsCrossed },
  { id: "location", label: "Truck Location", icon: MapPin },
  { id: "customers", label: "Customers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

function Admin() {
  const [auth, setAuth] = useState(false);
  const [section, setSection] = useState<(typeof NAV)[number]["id"]>("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setAuth(localStorage.getItem("gl.admin") === "1");
  }, []);

  if (!auth) return <Login onAuth={() => { localStorage.setItem("gl.admin", "1"); setAuth(true); }} />;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-bg2 border-r border-white/5 transition-transform",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-white/5 flex items-center gap-2">
          <Flame className="h-5 w-5 text-ember" />
          <span className="font-display tracking-widest text-warm">GRILL LAB / ADMIN</span>
        </div>
        <nav className="p-3 space-y-1">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => { setSection(n.id); setOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition",
                section === n.id ? "bg-copper/15 text-copper border-l-2 border-copper" : "text-warm/60 hover:text-warm hover:bg-white/5"
              )}>
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.removeItem("gl.admin"); setAuth(false); }}
          className="absolute bottom-4 left-3 right-3 flex items-center gap-2 px-3 py-2.5 text-xs text-warm/60 hover:text-warm hover:bg-white/5">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5">
          <button onClick={() => setOpen(!open)} className="text-warm text-sm tracking-widest uppercase">Menu</button>
          <span className="font-display tracking-widest text-copper">Admin</span>
        </header>

        <main className="p-6 md:p-10">
          {section === "overview" && <Overview />}
          {section === "orders" && <Orders />}
          {section === "menu" && <MenuManager />}
          {section === "location" && <Location />}
          {section === "customers" && <Customers />}
          {section === "analytics" && <Analytics />}
          {section === "coupons" && <Coupons />}
          {section === "reviews" && <Reviews />}
          {section === "notifications" && <Notifications />}
        </main>
      </div>
    </div>
  );
}

function Login({ onAuth }: { onAuth: () => void }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={(e) => { e.preventDefault(); if (u === "admin" && p === "grilllab2024") onAuth(); else setErr("Invalid credentials"); }}
        className="w-full max-w-sm bg-bg2 border border-copper/30 p-8">
        <Flame className="h-8 w-8 text-ember mb-4" />
        <h1 className="display-md text-warm">Admin Access</h1>
        <p className="label-mono mt-1">Restricted area</p>
        <div className="mt-6 space-y-3">
          <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
          <input value={p} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-warm focus:border-copper focus:outline-none" />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button className="w-full bg-ember text-white py-3 text-xs tracking-[0.25em] uppercase">Sign In</button>
          <p className="text-[11px] text-warm/40 font-mono text-center">admin / grilllab2024</p>
        </div>
      </form>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-bg2 border border-white/5 p-6">
      <p className="label-mono">{label}</p>
      <p className="font-display text-4xl text-warm mt-2">{value}</p>
      {sub && <p className="text-xs text-ember mt-1">{sub}</p>}
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h1 className="display-lg text-warm">Overview</h1>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Revenue Today" value="₹65,200" sub="+12% vs avg" />
        <Stat label="Orders Today" value="141" sub="+8 in last hour" />
        <Stat label="New Customers" value="23" sub="Today" />
        <Stat label="Active Promotions" value="3" />
      </div>
      <div className="mt-8 grid lg:grid-cols-2 gap-4">
        <div className="bg-bg2 border border-white/5 p-6">
          <p className="label-mono">Live Orders</p>
          <div className="mt-4 space-y-3">
            {ORDERS.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                <div><span className="text-copper font-mono">{o.id}</span> <span className="text-warm/70">{o.customer}</span></div>
                <span className="label-mono">{o.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-bg2 border border-white/5 p-6">
          <p className="label-mono">Top Items This Week</p>
          <div className="mt-4 space-y-3">
            {TOP_ITEMS.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span className="text-warm/80">{t.name}</span>
                <span className="text-ember font-display text-lg">{t.sold}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const [filter, setFilter] = useState<"all" | "preparing" | "ready" | "completed" | "cancelled">("all");
  const rows = filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter);
  return (
    <div>
      <h1 className="display-lg text-warm">Orders</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {["all", "preparing", "ready", "completed", "cancelled"].map((f) => (
          <button key={f} onClick={() => setFilter(f as any)}
            className={cn("px-3 py-1.5 text-[11px] tracking-widest uppercase border",
              filter === f ? "border-copper bg-copper/10 text-warm" : "border-white/10 text-warm/60")}>{f}</button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto bg-bg2 border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-black/40 text-warm/50 label-mono">
            <tr>{["Order", "Customer", "Items", "Status", "Time", "Total"].map((h) => <th key={h} className="text-left p-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((o) => (
              <tr key={o.id}>
                <td className="p-3 font-mono text-copper">{o.id}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3 text-warm/70">{o.items}</td>
                <td className="p-3"><span className={cn("px-2 py-0.5 text-[10px] tracking-widest uppercase",
                  o.status === "completed" ? "bg-ember/15 text-ember" :
                  o.status === "ready" ? "bg-gold/15 text-gold" :
                  o.status === "cancelled" ? "bg-destructive/30 text-warm/60" : "bg-copper/15 text-copper")}>{o.status}</span></td>
                <td className="p-3 label-mono">{o.time}</td>
                <td className="p-3 font-display text-warm">{inr(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MenuManager() {
  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4">
        <h1 className="display-lg text-warm">Menu Manager</h1>
        <button className="bg-ember text-white px-4 py-2 text-xs tracking-widest uppercase inline-flex items-center gap-2"><Plus className="h-3 w-3" /> Add Item</button>
      </div>
      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MENU.map((m) => (
          <div key={m.id} className="bg-bg2 border border-white/5 p-4 flex gap-4">
            <img src={m.image} alt="" className="w-20 h-20 object-cover" loading="lazy"/>
            <div className="flex-1">
              <p className="text-warm font-medium">{m.name}</p>
              <p className="label-mono mt-1">{m.category}</p>
              <p className="font-display text-xl text-ember mt-1">{inr(m.price)}</p>
            </div>
            <div className="flex flex-col gap-1 text-[10px] tracking-widest uppercase">
              <button className="text-copper hover:text-ember">Edit</button>
              <button className="text-warm/60 hover:text-warm">Toggle</button>
              <button className="text-warm/40 hover:text-destructive">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Location() {
  return (
    <div>
      <h1 className="display-lg text-warm">Truck Location</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 aspect-[16/10] bg-bg2 border border-white/5 overflow-hidden">
          <iframe src="https://www.google.com/maps?q=Koramangala+Bangalore&output=embed" className="w-full h-full grayscale-[40%] brightness-[0.55]" />
        </div>
        <div className="bg-bg2 border border-white/5 p-6 space-y-4">
          <div>
            <label className="label-mono">Status</label>
            <select className="mt-2 w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-warm">
              <option>Open</option><option>Closed</option><option>Moving</option>
            </select>
          </div>
          <div>
            <label className="label-mono">Address</label>
            <input className="mt-2 w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-warm" defaultValue="80 Feet Road, Koramangala 5th Block" />
          </div>
          <div>
            <label className="label-mono">Hours</label>
            <input className="mt-2 w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-warm" defaultValue="6PM – 11PM" />
          </div>
          <button className="w-full bg-ember text-white py-2.5 text-xs tracking-widest uppercase">Update Location</button>
        </div>
      </div>
    </div>
  );
}

function Customers() {
  return (
    <div>
      <h1 className="display-lg text-warm">Customers</h1>
      <div className="mt-6 overflow-x-auto bg-bg2 border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-black/40 label-mono">
            <tr>{["Name", "Visits", "Tier", "Last Order"].map((h) => <th key={h} className="text-left p-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CUSTOMERS.map((c) => (
              <tr key={c.id}>
                <td className="p-3 text-warm">{c.name}</td>
                <td className="p-3 font-display text-xl text-warm">{c.visits}</td>
                <td className="p-3"><span className="px-2 py-0.5 text-[10px] bg-copper/15 text-copper tracking-widest uppercase">{c.tier}</span></td>
                <td className="p-3 label-mono">{c.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const AnalyticsCharts = lazy(() => import("@/components/AnalyticsCharts"));
function Analytics() {
  return (
    <div>
      <h1 className="display-lg text-warm">Analytics</h1>
      <Suspense fallback={<div className="mt-8 text-warm/50 label-mono">Loading charts...</div>}>
        <AnalyticsCharts daily={CHART_DAILY} top={TOP_ITEMS} />
      </Suspense>
    </div>
  );
}

function Coupons() {
  const coupons = [
    { code: "FIRST5", off: "₹50 off", uses: 248 },
    { code: "INFERNO", off: "Free wings", uses: 92 },
    { code: "SOCIETY10", off: "10% members", uses: 51 },
  ];
  return (
    <div>
      <h1 className="display-lg text-warm">Coupons</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="bg-bg2 border border-white/5 p-6 lg:col-span-1">
          <p className="label-mono">Create Coupon</p>
          <div className="mt-4 space-y-3">
            <input placeholder="Code" className="w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-warm" />
            <input placeholder="Discount" className="w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-warm" />
            <button className="w-full bg-ember text-white py-2.5 text-xs tracking-widest uppercase">Create</button>
          </div>
        </div>
        <div className="lg:col-span-2 bg-bg2 border border-white/5">
          <table className="w-full text-sm">
            <thead className="bg-black/40 label-mono"><tr>{["Code", "Discount", "Uses"].map((h) => <th key={h} className="text-left p-3 font-normal">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-white/5">
              {coupons.map((c) => (
                <tr key={c.code}><td className="p-3 font-mono text-copper">{c.code}</td><td className="p-3 text-warm">{c.off}</td><td className="p-3 font-display text-xl text-ember">{c.uses}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  const reviews = [
    { name: "Aarav K.", text: "Hellfire wings are unreal. 10/10.", rating: 5 },
    { name: "Priya M.", text: "Shawarma was perfect, fries soggy. Mixed feelings.", rating: 3 },
    { name: "Vikram S.", text: "Best food truck in Bangalore, hands down.", rating: 5 },
  ];
  return (
    <div>
      <h1 className="display-lg text-warm">Pending Reviews</h1>
      <div className="mt-6 space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="bg-bg2 border border-white/5 p-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-warm font-medium">{r.name}</p>
                <span className="label-mono">{"🔥".repeat(r.rating)}</span>
              </div>
              <p className="mt-2 text-warm/70 text-sm">{r.text}</p>
            </div>
            <div className="flex gap-2">
              <button className="border border-ember text-ember px-3 py-1.5 text-[10px] tracking-widest uppercase">Approve</button>
              <button className="border border-white/10 text-warm/60 px-3 py-1.5 text-[10px] tracking-widest uppercase">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notifications() {
  const notes = [
    { time: "2m ago", text: "New order #GL-2846 from Anita J." },
    { time: "12m ago", text: "Inventory: chicken thigh below threshold" },
    { time: "1h ago", text: "5-star review from Vikram S." },
    { time: "3h ago", text: "Catering inquiry: wedding, 200 guests" },
  ];
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="display-lg text-warm">Notifications</h1>
        <span className="bg-ember text-white text-[10px] tracking-widest px-2 py-0.5">4 NEW</span>
      </div>
      <div className="mt-6 bg-bg2 border border-white/5 divide-y divide-white/5">
        {notes.map((n, i) => (
          <div key={i} className="p-5 flex items-center justify-between">
            <p className="text-warm/80 text-sm">{n.text}</p>
            <span className="label-mono">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
