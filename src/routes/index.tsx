import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

const TARGET_URL = "https://rco.rwadlar.com/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Open in browser" },
      { name: "description", content: "For the best experience, open this page in your browser." },
      { property: "og:title", content: "Open in browser" },
      { property: "og:description", content: "For the best experience, open this page in your browser." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function openExternal() {
  const ua = navigator.userAgent || "";
  const url = new URL(TARGET_URL);
  if (/android/i.test(ua)) {
    window.location.href = `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=${url.protocol.replace(":", "")};package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(TARGET_URL)};end`;
    return;
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    window.location.href = `x-safari-${TARGET_URL}`;
    setTimeout(() => {
      window.location.href = TARGET_URL;
    }, 800);
    return;
  }
  window.open(TARGET_URL, "_blank", "noopener,noreferrer");
}

function Index() {
  return (
    <main className="page-bg flex min-h-screen items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="icon-tile mb-8 flex h-20 w-20 items-center justify-center rounded-2xl">
          <ExternalLink className="h-8 w-8 text-foreground" strokeWidth={2.2} />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Open in <span className="text-gradient">browser</span>
        </h1>
        <p className="mt-5 max-w-xs leading-relaxed text-muted-foreground">
          For the best experience, this page needs to open in your browser.
        </p>
        <button onClick={openExternal} className="cta mt-12 w-full rounded-xl py-5 font-display text-lg font-black uppercase tracking-[0.2em] text-primary-foreground">
          Continue →
        </button>
        <p className="mt-4 text-sm text-primary">Opens in Safari or Chrome</p>
      </div>
    </main>
  );
}
