"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import type { Lead } from "@/types";

export default function LeadDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead>();
  const [note, setNote] = useState("");
  async function load() { const { data } = await api.get(`/leads/${id}`); setLead(data.lead); }
  useEffect(() => { load(); }, [id]);
  if (!lead) return <DashboardShell><p>Loading lead...</p></DashboardShell>;
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">{lead.name}</h1>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <p><strong>Phone:</strong> {lead.phone || "N/A"}</p>
          <p><strong>Email:</strong> {lead.email || "N/A"}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Listing:</strong> {lead.listing?.title}</p>
        </div>
        <p className="mt-4 text-slate-600">{lead.message}</p>
        <div className="mt-6 max-w-xl">
          <label>Update status</label>
          <select value={lead.status} onChange={async (e) => { await api.patch(`/leads/${id}`, { status: e.target.value }); load(); }}>
            <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="converted">Converted</option><option value="lost">Lost</option>
          </select>
        </div>
        <div className="mt-6 max-w-xl">
          <label>Internal note</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          <Button className="mt-3 w-full sm:w-auto" onClick={async () => { await api.post(`/leads/${id}/notes`, { body: note }); setNote(""); load(); }}>Add note</Button>
        </div>
      </section>
    </DashboardShell>
  );
}
