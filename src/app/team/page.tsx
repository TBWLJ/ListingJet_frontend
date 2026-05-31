"use client";

import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

export default function TeamPage() {
  const [data, setData] = useState<any>({ members: [], invites: [] });
  const [email, setEmail] = useState("");
  async function load() { const res = await api.get("/team"); setData(res.data); }
  useEffect(() => { load(); }, []);
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Team management</h1>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-navy">Invite team member</h2>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input placeholder="team@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={async () => { await api.post("/team/invite", { email, role: "marketer", permissions: ["listings:write", "leads:write"] }); setEmail(""); load(); }}><UserPlus className="h-4 w-4" /> Invite</Button>
        </div>
      </section>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-navy">Members</h2>
        <div className="mt-4 space-y-3">
          {data.members.map((member: any) => <div key={member._id} className="flex justify-between rounded-md bg-slate-50 p-3 text-sm"><span>{member.name} · {member.email}</span><span>{member.teamRole}</span></div>)}
        </div>
      </section>
    </DashboardShell>
  );
}
