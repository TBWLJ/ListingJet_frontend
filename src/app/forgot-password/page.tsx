"use client";

import { useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit() {
    setLoading(true);
    const { data } = await api.post("/auth/forgot-password", { email });
    setMessage(data.message);
    setLoading(false);
  }
  return (
    <div>
      <PublicNav />
      <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center">
        <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-navy">Reset password</h1>
          <div className="mt-5"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <Button className="mt-5 w-full" loading={loading} onClick={submit}>Send reset link</Button>
          {message && <p className="mt-4 text-sm text-mint">{message}</p>}
        </section>
      </main>
    </div>
  );
}
