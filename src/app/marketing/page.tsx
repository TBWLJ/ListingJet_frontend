"use client";

import { useEffect, useState } from "react";
import { Copy, Download, Facebook, Linkedin, Send, Twitter } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import type { Listing } from "@/types";

export default function MarketingPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selected, setSelected] = useState("");
  const [assets, setAssets] = useState<any>();
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("listing");
    api.get("/listings").then((res) => {
      setListings(res.data.listings);
      setSelected(requested || res.data.listings[0]?._id || "");
    });
  }, []);
  useEffect(() => { if (selected) api.get(`/listings/${selected}/marketing-assets`).then((res) => setAssets(res.data.assets)); }, [selected]);
  const listing = listings.find((item) => item._id === selected);
  const url = listing ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/campaign/${listing.slug}` : "";
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Distribution hub</h1>
      <div className="mt-6 max-w-xl"><label>Select listing</label><select value={selected} onChange={(e) => setSelected(e.target.value)}>{listings.map((item) => <option key={item._id} value={item._id}>{item.title}</option>)}</select></div>
      {assets && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {Object.entries(assets).filter(([key]) => !["previewCard"].includes(key)).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="capitalize font-semibold text-navy">{key}</h2>
                  <Button variant="ghost" onClick={() => navigator.clipboard.writeText(String(value))}><Copy className="h-4 w-4" /></Button>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{String(value)}</p>
              </div>
            ))}
          </section>
          <aside className="rounded-lg border border-slate-200 bg-white p-4">
            <div style={{ backgroundColor: assets.previewCard.brandColor }} className="rounded-md p-4 text-white">
              <div className="aspect-video rounded bg-white/20 bg-cover bg-center" style={{ backgroundImage: `url(${assets.previewCard.image || ""})` }} />
              <h3 className="mt-4 text-xl font-bold">{assets.previewCard.title}</h3>
              <p>{assets.previewCard.price}</p>
              <p className="text-sm opacity-85">{assets.previewCard.location}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Share icon={<Send className="h-4 w-4" />} href={`https://wa.me/?text=${encodeURIComponent(`${assets.whatsapp}\n${url}`)}`} label="WhatsApp" />
              <Share icon={<Facebook className="h-4 w-4" />} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} label="Facebook" />
              <Share icon={<Twitter className="h-4 w-4" />} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(assets.x)}`} label="X" />
              <Share icon={<Linkedin className="h-4 w-4" />} href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`} label="LinkedIn" />
              <Button variant="secondary" onClick={() => navigator.clipboard.writeText(url)}>Copy link</Button>
              <Button variant="secondary"><Download className="h-4 w-4" /> Card</Button>
            </div>
          </aside>
        </div>
      )}
    </DashboardShell>
  );
}

function Share({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return <a href={href} target="_blank" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 text-sm font-semibold">{icon}{label}</a>;
}
