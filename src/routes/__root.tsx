import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="label-mono mb-4">Error 404</p>
        <h1 className="display-xl forged">Off the Grid</h1>
        <p className="mt-4 text-sm text-warm/60">
          This street ain't on our route. Head back to the fire.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-ember px-6 py-3 text-sm font-semibold tracking-widest uppercase text-white hover:opacity-90 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="label-mono mb-4">Something burned</p>
        <h1 className="display-lg forged">Page Didn't Load</h1>
        <p className="mt-4 text-sm text-warm/60">
          The fire flickered. Try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center bg-ember px-6 py-3 text-sm font-semibold tracking-widest uppercase text-white"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-copper px-6 py-3 text-sm font-semibold tracking-widest uppercase text-copper"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Grill Lab — Burning Charcoal | BBQ Chicken & Shawarma" },
      { name: "description", content: "Born in fire. Built for the streets. Premium charcoal BBQ chicken & shawarma food truck. Crafted, not cooked." },
      { name: "author", content: "The Grill Lab" },
      { name: "theme-color", content: "#0A0A0A" },
      { property: "og:title", content: "The Grill Lab — Burning Charcoal" },
      { property: "og:description", content: "Premium charcoal BBQ chicken & shawarma. Crafted, not cooked." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isAdmin = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdmin && <NavBar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
    </QueryClientProvider>
  );
}
