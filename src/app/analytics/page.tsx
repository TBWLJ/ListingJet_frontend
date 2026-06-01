"use client";

import { useEffect, useState } from "react";
import { BarChart3, BriefcaseBusiness, MessageSquare, TrendingUp } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { api } from "@/lib/api";
import { percent } from "@/lib/format";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>();
  useEffect(() => { api.get("/analytics/overview").then((res) => setData(res.data)); }, []);
  const metrics = data?.metrics;
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Analytics</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Listings" value={metrics?.totalListings ?? "..."} icon={BriefcaseBusiness} />
        <MetricCard label="Views" value={metrics?.totalViews ?? "..."} icon={BarChart3} />
        <MetricCard label="Leads" value={metrics?.totalLeads ?? "..."} icon={MessageSquare} />
        <MetricCard label="WhatsApp" value={metrics?.whatsappClicks ?? "..."} icon={TrendingUp} />
        <MetricCard label="Conversion" value={metrics ? percent(metrics.conversionRate) : "..."} icon={TrendingUp} />
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-navy">Monthly performance chart</h2>
        <div className="mt-5 flex h-64 items-end gap-2 overflow-x-auto border-b border-slate-200 pb-1 sm:gap-3">
          {(data?.monthlyPerformance?.length ? data.monthlyPerformance : Array.from({ length: 8 })).map((item: any, index: number) => (
            <div key={index} className="flex min-w-10 flex-1 flex-col items-center justify-end">
              <div className="w-full rounded-t bg-mint" style={{ height: `${Math.max(18, (item?.count || index + 2) * 12)}px` }} />
              <span className="mt-2 text-xs text-slate-500">{item?._id?.month || index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
