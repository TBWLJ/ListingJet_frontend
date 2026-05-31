"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, Pause, Play, Trash2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { money } from "@/lib/format";
import type { Listing } from "@/types";

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<Listing>();
  useEffect(() => { api.get(`/listings/${id}`).then((res) => setListing(res.data.listing)); }, [id]);
  if (!listing) return <DashboardShell><p>Loading listing...</p></DashboardShell>;
  const campaignUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/campaign/${listing.slug}`;
  async function action(path: string) {
    await api.post(`/listings/${id}/${path}`);
    const { data } = await api.get(`/listings/${id}`);
    setListing(data.listing);
  }
  return (
    <DashboardShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-navy">{listing.title}</h1>
          <p className="text-sm text-slate-500">{listing.location} · {money(listing.price, listing.currency)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/listings/edit?id=${listing._id}`}><Button variant="secondary">Edit</Button></Link>
          <Link href={`/marketing?listing=${listing._id}`}><Button variant="secondary">Marketing hub</Button></Link>
          <a href={campaignUrl} target="_blank"><Button><ExternalLink className="h-4 w-4" /> Campaign</Button></a>
        </div>
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Views" value={listing.stats?.views || 0} />
          <Stat label="Leads" value={listing.stats?.leadSubmissions || 0} />
          <Stat label="WhatsApp" value={listing.stats?.whatsappClicks || 0} />
          <Stat label="Shares" value={listing.stats?.shareClicks || 0} />
        </div>
        <p className="mt-6 text-slate-600">{listing.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => navigator.clipboard.writeText(campaignUrl)}><Copy className="h-4 w-4" /> Copy link</Button>
          <Button variant="secondary" onClick={() => action("publish")}><Play className="h-4 w-4" /> Publish</Button>
          <Button variant="secondary" onClick={() => action("pause")}><Pause className="h-4 w-4" /> Pause</Button>
          <Button variant="secondary" onClick={async () => { await api.delete(`/listings/${id}`); router.push("/listings"); }}><Trash2 className="h-4 w-4" /> Delete</Button>
        </div>
      </section>
    </DashboardShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-md bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-bold text-navy">{value}</p></div>;
}
