"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

const schema = z.object({
  businessName: z.string().min(2),
  ownerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  password: z.string().min(8),
  industry: z.string().min(2),
  country: z.string().min(2),
  city: z.string().min(2)
});

type FormData = z.infer<typeof schema>;
type CountryOption = { name: string; isoCode: string; flag?: string };
type StateOption = { name: string; isoCode: string; countryCode: string };

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [states, setStates] = useState<StateOption[]>([]);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const selectedCountry = watch("country");

  useEffect(() => {
    api.get("/locations/countries").then((res) => setCountries(res.data.countries)).catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    api.get("/locations/states", { params: { country: selectedCountry } }).then((res) => {
      setStates(res.data.states);
      setValue("city", "");
    }).catch(() => setStates([]));
  }, [selectedCountry, setValue]);

  async function onSubmit(values: FormData) {
    setError("");
    try {
      await api.post("/auth/register", values);
      setSubmittedEmail(values.email);
      router.push(`/verify-email?sent=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div>
      <PublicNav />
      <main className="container-page grid min-h-[calc(100vh-64px)] items-center py-10 lg:grid-cols-2">
        <div className="hidden pr-12 lg:block">
          <h1 className="text-4xl font-bold text-navy">Create your business workspace</h1>
          <p className="mt-4 text-slate-600">Publish credible campaign pages, share faster, and show clients exactly what is happening with their listings.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-navy">Register</h2>
          {submittedEmail && (
            <p className="mt-3 rounded-md bg-mint/10 p-3 text-sm text-mint">
              Account created. Check {submittedEmail} to verify your email and continue to subscription.
            </p>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["businessName", "Business name"], ["ownerName", "Owner name"], ["email", "Email"], ["phone", "Phone"], ["industry", "Industry"]
            ].map(([name, label]) => (
              <div key={name}>
                <label>{label}</label>
                <input type="text" {...register(name as keyof FormData)} />
                {errors[name as keyof FormData] && <p className="mt-1 text-xs text-red-600">Required field</p>}
              </div>
            ))}
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
              {errors.password && <p className="mt-1 text-xs text-red-600">Password must be at least 8 characters</p>}
            </div>
            <div>
              <label>Country</label>
              <select {...register("country")}>
                <option value="">Select country</option>
                {countries.map((country) => <option key={country.isoCode} value={country.isoCode}>{country.flag ? `${country.flag} ` : ""}{country.name}</option>)}
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-600">Country is required</p>}
            </div>
            <div>
              <label>State/city</label>
              {selectedCountry && states.length === 0 ? (
                <input placeholder="Enter city or region" {...register("city")} />
              ) : (
                <select {...register("city")} disabled={!selectedCountry}>
                  <option value="">{selectedCountry ? "Select state/city" : "Select country first"}</option>
                  {states.map((state) => <option key={`${state.countryCode}-${state.isoCode}`} value={state.name}>{state.name}</option>)}
                </select>
              )}
              {errors.city && <p className="mt-1 text-xs text-red-600">State/city is required</p>}
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <Button className="mt-6 w-full" loading={isSubmitting}>Create workspace</Button>
          <p className="mt-4 text-center text-sm text-slate-500">Already have an account? <Link className="text-navy" href="/login">Login</Link></p>
        </form>
      </main>
    </div>
  );
}
