"use client";

import { useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit() {
    setLoading(true);
    const token = new URLSearchParams(window.location.search).get("token");
    await api.post("/auth/reset-password", { token, password });
    setMessage("Password reset successful. You can now log in.");
    setLoading(false);
  }
  return (
    <div>
      <PublicNav />
      <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center">
        <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-navy">Choose new password</h1>
          <div className="mt-5"><label>New password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button className="mt-5 w-full" loading={loading} onClick={submit}>Reset password</Button>
          {message && <p className="mt-4 text-sm text-mint">{message}</p>}
        </section>
      </main>
    </div>
  );
}
