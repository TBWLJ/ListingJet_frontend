"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";
import { api, setSession } from "@/lib/api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Checking verification status...");
  const [verified, setVerified] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const sent = params.get("sent");
    if (sent && !token) {
      setSentEmail(sent);
      setMessage("Check your email to verify your account.");
      return;
    }
    if (!token) {
      setMessage("Verification token missing.");
      return;
    }
    api.get(`/auth/verify-email/${token}`)
      .then((res) => {
        setSession(res.data.token);
        setVerified(true);
        setMessage("Email verified. Continue to subscription to activate your workspace.");
        window.setTimeout(() => router.push(res.data.next || "/billing?onboarding=1"), 1200);
      })
      .catch(() => setMessage("Verification link is invalid or expired."));
  }, [router]);

  return (
    <div>
      <PublicNav />
      <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center text-center">
        <section className="max-w-lg rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-navy">{message}</h1>
          {sentEmail && <p className="mt-3 text-sm text-slate-500">We sent a verification link to {sentEmail}. After verification, you will choose a subscription plan.</p>}
          {verified ? (
            <Link href="/billing?onboarding=1"><Button className="mt-6">Continue to subscription</Button></Link>
          ) : (
            <Link href="/login"><Button className="mt-6" variant="secondary">Back to login</Button></Link>
          )}
        </section>
      </main>
    </div>
  );
}
