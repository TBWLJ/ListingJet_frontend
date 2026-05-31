"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("Verifying your email...");
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return setMessage("Verification token missing.");
    api.get(`/auth/verify-email/${token}`).then(() => setMessage("Email verified successfully.")).catch(() => setMessage("Verification link is invalid or expired."));
  }, []);
  return (
    <div>
      <PublicNav />
      <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center text-center">
        <section className="rounded-lg border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-bold text-navy">{message}</h1>
          <Link href="/dashboard"><Button className="mt-6">Go to dashboard</Button></Link>
        </section>
      </main>
    </div>
  );
}
