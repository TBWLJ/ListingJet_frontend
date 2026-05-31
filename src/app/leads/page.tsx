"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { api } from "@/lib/api";
import type { Lead } from "@/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => { api.get("/leads").then((res) => setLeads(res.data.leads)); }, []);
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Leads</h1>
      <div className="mt-6 grid gap-3">
        {leads.length ? leads.map((lead) => (
          <Link key={lead._id} href={`/leads/${lead._id}`} className="rounded-lg border border-slate-200 bg-white p-4 hover:border-mint">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div><p className="font-semibold text-navy">{lead.name}</p><p className="text-sm text-slate-500">{lead.listing?.title || "Listing inquiry"}</p></div>
              <span className="h-fit rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold capitalize text-mint">{lead.status}</span>
            </div>
          </Link>
        )) : <EmptyState title="No leads captured" body="Public campaign inquiries will appear here with status tracking." />}
      </div>
    </DashboardShell>
  );
}
