"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

const plans = [
  { id: "starter", name: "Starter", monthly: "₦50,000", annual: "₦500,000" },
  { id: "professional", name: "Professional", monthly: "₦100,000", annual: "₦1,000,000" },
  { id: "enterprise", name: "Enterprise", monthly: "₦250,000", annual: "₦2,500,000" }
];

export default function BillingPage() {
  const [subscription, setSubscription] = useState<any>();
  const [payments, setPayments] = useState<any[]>([]);
  const [cycle, setCycle] = useState("monthly");
  useEffect(() => {
    api.get("/subscriptions/current").then((res) => setSubscription(res.data.subscription));
    api.get("/payments/history").then((res) => setPayments(res.data.payments));
  }, []);
  async function subscribe(plan: string) {
    const { data } = await api.post("/subscriptions/subscribe", { plan, billingCycle: cycle });
    window.location.href = data.authorizationUrl;
  }
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Billing</h1>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <p className="font-semibold text-navy">Current plan: <span className="capitalize">{subscription?.plan || "trial"}</span></p>
        <p className="mt-1 text-sm text-slate-500">Status: {subscription?.status || "loading"}</p>
      </section>
      <div className="mt-6 max-w-xs"><label>Billing cycle</label><select value={cycle} onChange={(e) => setCycle(e.target.value)}><option value="monthly">Monthly</option><option value="annual">Annual</option></select></div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-navy">{plan.name}</h2>
            <p className="mt-3 text-2xl font-bold">{cycle === "monthly" ? plan.monthly : plan.annual}</p>
            <Button className="mt-5 w-full" onClick={() => subscribe(plan.id)}>Subscribe</Button>
          </div>
        ))}
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-navy">Payment history</h2>
        <div className="mt-4 space-y-2">{payments.map((payment) => <div key={payment._id} className="flex justify-between rounded-md bg-slate-50 p-3 text-sm"><span>{payment.reference}</span><span>{payment.status}</span></div>)}</div>
      </section>
    </DashboardShell>
  );
}
