"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

const plans = [
  { id: "starter", name: "Starter", monthly: "₦15,000", annual: "₦150,000" },
  { id: "growth", name: "Growth", monthly: "₦50,000", annual: "₦500,000" },
  { id: "premium", name: "Premium", monthly: "₦100,000", annual: "₦1,000,000" },
  { id: "enterprise", name: "Enterprise", monthly: "₦250,000", annual: "₦2,500,000" }
];

export default function BillingPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>();
  const [payments, setPayments] = useState<any[]>([]);
  const [cycle, setCycle] = useState("monthly");
  const [notice, setNotice] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");
    const onboarding = params.get("onboarding");
    if (onboarding) setNotice("Email verified. Choose a subscription plan to activate your workspace.");
    async function load() {
      if (reference) {
        setVerifying(true);
        try {
          await api.post("/subscriptions/verify", { reference });
          setNotice("Payment verified. Redirecting to your dashboard...");
          window.setTimeout(() => router.push("/dashboard"), 1000);
        } catch (error: any) {
          setNotice(error.response?.data?.message || "Payment verification failed. Please try again.");
        } finally {
          setVerifying(false);
        }
      }
      const [subscriptionRes, paymentsRes] = await Promise.all([
        api.get("/subscriptions/current"),
        api.get("/payments/history")
      ]);
      setSubscription(subscriptionRes.data.subscription);
      setPayments(paymentsRes.data.payments);
    }
    load();
  }, [router]);

  async function subscribe(plan: string) {
    const { data } = await api.post("/subscriptions/subscribe", { plan, billingCycle: cycle });
    window.location.href = data.authorizationUrl;
  }
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-navy">Billing</h1>
      {notice && <p className="mt-4 rounded-md bg-mint/10 p-3 text-sm font-medium text-mint">{notice}</p>}
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <p className="font-semibold text-navy">Current plan: <span className="capitalize">{subscription?.plan || "trial"}</span></p>
        <p className="mt-1 text-sm text-slate-500">Status: {subscription?.status || "loading"}</p>
      </section>
      <div className="mt-6 max-w-xs"><label>Billing cycle</label><select value={cycle} onChange={(e) => setCycle(e.target.value)}><option value="monthly">Monthly</option><option value="annual">Annual</option></select></div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-navy">{plan.name}</h2>
            <p className="mt-3 text-2xl font-bold">{cycle === "monthly" ? plan.monthly : plan.annual}</p>
            <Button className="mt-5 w-full" loading={verifying} onClick={() => subscribe(plan.id)}>Subscribe</Button>
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
