"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { api } from "@/lib/api";
import { money } from "@/lib/format";
import type { Listing } from "@/types";

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [q, setQ] = useState("");
  async function load() {
    const { data } = await api.get("/listings", { params: { q } });
    setListings(data.listings);
  }
  useEffect(() => { load(); }, []);
  return (
    <DashboardShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><h1 className="text-2xl font-bold text-navy">Listings</h1><p className="text-sm text-slate-500">Create, publish, pause, duplicate, and track listings.</p></div>
        <Link href="/listings/create"><Button><Plus className="h-4 w-4" /> Create listing</Button></Link>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input placeholder="Search listings" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button className="w-full sm:w-auto" variant="secondary" onClick={load}><Search className="h-4 w-4" /> <span className="sm:hidden">Search</span></Button>
      </div>
      <div className="mt-6 grid gap-4">
        {listings.length ? listings.map((listing) => (
          <Link key={listing._id} href={`/listings/${listing._id}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-mint">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="font-semibold text-navy">{listing.title}</p>
                <p className="text-sm text-slate-500">{listing.location} · {listing.listingType}</p>
              </div>
              <div className="shrink-0 text-sm sm:text-right">
                <p className="font-semibold">{money(listing.price, listing.currency)}</p>
                <p className="capitalize text-slate-500">{listing.status}</p>
              </div>
            </div>
          </Link>
        )) : <EmptyState title="No listings yet" body="Create your first listing and turn it into a campaign page." />}
      </div>
    </DashboardShell>
  );
}
