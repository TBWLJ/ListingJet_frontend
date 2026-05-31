"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Bell, BriefcaseBusiness, CreditCard, Home, LogOut, Megaphone, Settings, Users } from "lucide-react";
import { clearSession } from "@/lib/api";

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
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-navy text-white lg:block">
        <div className="p-6 text-xl font-bold">ListingJet</div>
        <nav className="space-y-1 px-3">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${active ? "bg-white text-navy" : "text-white/75 hover:bg-white/10"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <Link href="/dashboard" className="font-bold text-navy lg:hidden">ListingJet</Link>
            <p className="hidden text-sm text-slate-500 lg:block">Upload Once. Market Everywhere. Track Every Lead.</p>
            <button
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
              onClick={() => {
                clearSession();
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
