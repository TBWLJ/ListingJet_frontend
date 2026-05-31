"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";
import { api, setSession } from "@/lib/api";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  async function onSubmit(values: FormData) {
    try {
      const { data } = await api.post("/auth/login", values);
      setSession(data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  }
  return (
    <div>
      <PublicNav />
      <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-navy">Welcome back</h1>
          <div className="mt-6 space-y-4">
            <div><label>Email</label><input {...register("email")} /></div>
            <div>
              <label>Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className="pr-10" {...register("password")} />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <Button className="mt-6 w-full" loading={isSubmitting}>Login</Button>
          <div className="mt-4 flex justify-between text-sm text-slate-500">
            <Link href="/forgot-password">Forgot password?</Link>
            <Link href="/register">Create account</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
