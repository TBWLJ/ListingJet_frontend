"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, MessageSquare, Phone, Share2 } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { api } from "@/lib/api";

export default function PublicReportPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>();
  useEffect(() => { api.get(`/public/report/${id}`).then((res) => setData(res.data)); }, [id]);
  if (!data) return <main className="grid min-h-screen place-items-center">Loading report...</main>;
  const stats = data.summary || {};
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-navy py-12 text-white">
        <div className="container-page">
          <p className="text-gold">Listing performance report</p>
          <h1 className="mt-2 text-4xl font-bold">{data.listing.title}</h1>
          <p className="mt-2 text-white/70">{data.business.name}</p>
        </div>
      </section>
      <section className="container-page py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Views" value={stats.views || 0} icon={BarChart3} />
          <MetricCard label="Leads" value={stats.leadSubmissions || 0} icon={MessageSquare} />
          <MetricCard label="Calls" value={stats.callClicks || 0} icon={Phone} />
          <MetricCard label="Shares" value={stats.shareClicks || 0} icon={Share2} />
        </div>
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-navy">Inquiry timeline</h2>
          <div className="mt-4 space-y-3">{data.leads.map((lead: any) => <div key={lead._id} className="rounded-md bg-slate-50 p-3 text-sm"><strong>{lead.name}</strong> submitted an inquiry · {lead.status}</div>)}</div>
        </section>
      </section>
    </main>
  );
}
