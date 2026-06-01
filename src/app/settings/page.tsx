"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [business, setBusiness] = useState<any>({});
  const [saved, setSaved] = useState(false);
  useEffect(() => { api.get("/business/me").then((res) => setBusiness(res.data.business)); }, []);
  function set(key: string, value: string) { setBusiness((current: any) => ({ ...current, [key]: value })); }
  async function save() {
    const { data } = await api.patch("/business/me", business);
    setBusiness(data.business);
    setSaved(true);
  }
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Workspace settings</h1>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["name", "Business name"], ["description", "Description"], ["contactEmail", "Contact email"], ["phone", "Phone"], ["whatsapp", "WhatsApp"], ["website", "Website"], ["address", "Address"]
          ].map(([key, label]) => (
            <div key={key}>
              <label>{label}</label>
              <input value={business?.[key] || ""} onChange={(e) => set(key, e.target.value)} />
            </div>
          ))}
          <div>
            <label>Brand color</label>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="color"
                className="h-10 w-14 cursor-pointer rounded-md border border-slate-200 bg-white p-1"
                value={business?.brandColor || "#0f766e"}
                onChange={(e) => set("brandColor", e.target.value)}
              />
              <input value={business?.brandColor || "#0f766e"} onChange={(e) => set("brandColor", e.target.value)} />
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="w-full sm:w-auto" onClick={save}>Save settings</Button>
          {saved && <span className="text-sm text-mint">Saved</span>}
        </div>
      </section>
    </DashboardShell>
  );
}
