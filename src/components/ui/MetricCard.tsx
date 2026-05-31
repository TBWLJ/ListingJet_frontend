import { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <Icon className="h-5 w-5 text-mint" />
      </div>
      <p className="mt-3 text-2xl font-bold text-navy">{value}</p>
    </div>
  );
}
