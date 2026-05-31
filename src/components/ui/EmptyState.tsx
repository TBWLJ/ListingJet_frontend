import { Inbox } from "lucide-react";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
      <Inbox className="mx-auto h-10 w-10 text-slate-400" />
      <h3 className="mt-4 font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{body}</p>
    </div>
  );
}
