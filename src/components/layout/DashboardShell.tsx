"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Bell, BriefcaseBusiness, CreditCard, Home, LogOut, Megaphone, Menu, Settings, Users, X } from "lucide-react";
import { api, clearSession } from "@/lib/api";

const nav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/listings", label: "Listings", icon: BriefcaseBusiness },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/leads", label: "Leads", icon: Bell },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/team", label: "Team", icon: Users },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    let alive = true;

    async function checkSubscription() {
      try {
        const { data } = await api.get("/subscriptions/current");
        const subscription = data.subscription;
        const active = subscription?.status === "active";
        if (alive && !active && pathname !== "/billing") {
          router.replace("/billing?onboarding=1");
          return;
        }
      } catch {
        if (alive) {
          clearSession();
          router.replace("/login");
          return;
        }
      } finally {
        if (alive) setCheckingSubscription(false);
      }
    }

    checkSubscription();
    return () => {
      alive = false;
    };
  }, [pathname, router]);

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-navy text-white lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-[min(84vw,20rem)] flex-col bg-navy text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Link href="/dashboard" className="text-lg font-bold">ListingJet</Link>
              <button
                type="button"
                aria-label="Close navigation"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent pathname={pathname} compact />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 text-navy hover:border-mint hover:bg-slate-50 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/dashboard" className="shrink-0 font-bold text-navy lg:hidden">ListingJet</Link>
              <p className="hidden truncate text-sm text-slate-500 sm:block">Upload Once. Market Everywhere. Generate More Leads.</p>
            </div>
            <button
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm text-slate-600 hover:bg-slate-100"
              onClick={() => {
                clearSession();
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          {checkingSubscription && pathname !== "/billing" ? (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">Checking subscription...</div>
          ) : children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, compact = false }: { pathname: string; compact?: boolean }) {
  return (
    <>
      {!compact && <div className="p-6 text-xl font-bold">ListingJet</div>}
      <nav className={`space-y-1 ${compact ? "p-3" : "px-3"}`}>
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${active ? "bg-white text-navy" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
