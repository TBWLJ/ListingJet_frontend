"use client";

import { useEffect, useState } from "react";
import { BarChart3, BriefcaseBusiness, MessageSquare, Phone } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { api } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

export default function DashboardPage() {
  const [data, setData] = useState<any>();
  useEffect(() => { api.get("/analytics/overview").then((res) => setData(res.data)); }, []);
  const metrics = data?.metrics;
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Dashboard overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total listings" value={metrics?.totalListings ?? "..."} icon={BriefcaseBusiness} />
        <MetricCard label="Total views" value={metrics?.totalViews ?? "..."} icon={BarChart3} />
        <MetricCard label="Total leads" value={metrics?.totalLeads ?? "..."} icon={MessageSquare} />
        <MetricCard label="WhatsApp clicks" value={metrics?.whatsappClicks ?? "..."} icon={Phone} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-navy">Best performing listings</h2>
          <div className="mt-4 space-y-3">
            {data?.topListings?.length ? data.topListings.map((listing: any) => (
              <div key={listing._id} className="flex flex-col gap-1 rounded-md bg-slate-50 p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0 truncate">{listing.title}</span><span className="shrink-0 font-medium">{listing.stats?.views || 0} views</span>
              </div>
            )) : <EmptyState title="No listing data yet" body="Publish a listing to start collecting campaign views." />}
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-navy">Recent leads</h2>
          <div className="mt-4 space-y-3">
            {data?.recentLeads?.length ? data.recentLeads.map((lead: any) => (
              <div key={lead._id} className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-medium">{lead.name}</p>
                <p className="text-slate-500">{lead.listing?.title}</p>
              </div>
            )) : <EmptyState title="No leads yet" body="Lead submissions from campaign pages will appear here." />}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
