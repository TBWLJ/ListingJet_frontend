"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Facebook,
  Globe2,
  Linkedin,
  Megaphone,
  MessageSquareText,
  PieChart,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Twitter,
  Users
} from "lucide-react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/Button";

const wins = [
  "Launch campaign pages in minutes",
  "Capture calls, WhatsApp clicks, and form inquiries",
  "Share polished assets across every channel",
  "Prove performance with client-ready reports"
];

const featureCards = [
  { Icon: ShieldCheck, title: "Trust-first campaign pages", body: "Present every listing with premium pages, business credentials, owner-ready details, and clear calls to action." },
  { Icon: Megaphone, title: "One-click distribution", body: "Generate captions and share listings across WhatsApp, Facebook, Instagram, X, LinkedIn, Telegram, and email." },
  { Icon: MessageSquareText, title: "Lead capture built in", body: "Turn visitors into inquiries, calls, WhatsApp messages, inspections, bookings, and sales conversations." },
  { Icon: BarChart3, title: "Proof clients can see", body: "Give owners and stakeholders visibility into views, leads, share clicks, sources, and campaign performance." }
];

const industries = [
  "Real estate brokerages",
  "Apartment managers",
  "Hotels and short stays",
  "Event venues",
  "Auto dealers",
  "Schools and admissions",
  "Recruiting teams",
  "Local service businesses"
];

const workflow = [
  { title: "Upload once", body: "Add listing details, media, contact info, pricing, location, amenities, and SEO metadata.", Icon: Building2 },
  { title: "Publish everywhere", body: "Launch a premium page and generate ready-to-share captions, links, and visual preview cards.", Icon: Globe2 },
  { title: "Track every lead", body: "Monitor views, lead submissions, calls, WhatsApp clicks, shares, sources, and conversion rate.", Icon: PieChart }
];

const proofMetrics = [
  ["12.8k", "campaign views"],
  ["384", "captured leads"],
  ["8.4%", "conversion rate"],
  ["71%", "mobile traffic"]
];

const pricing = [
  { name: "Starter", price: "₦50,000", detail: "50 active listings", highlighted: false },
  { name: "Professional", price: "₦100,000", detail: "500 active listings and team access", highlighted: true },
  { name: "Enterprise", price: "₦250,000", detail: "Unlimited listings and white-label access", highlighted: false }
];

export default function LandingPage() {
  return (
    <div className="bg-white text-ink">
      <PublicNav />
      <section className="bg-[#f6f8fb]">
        <div className="container-page grid min-h-[calc(100vh-64px)] items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-gold" /> Upload Once. Market Everywhere. Track Every Lead.
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-navy md:text-6xl">Turn Every Listing Into a Marketing Campaign</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ListingJet helps businesses create premium campaign pages, distribute listings across channels, capture leads, and prove marketing performance with real analytics.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register"><Button className="h-12 px-5">Start Growing Your Listings <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/pricing"><Button className="h-12 px-5" variant="secondary">View Pricing</Button></Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {wins.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-mint" /> {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="font-semibold text-navy">Built for modern listing teams in Canada, the USA, and fast-growing markets.</span>
              <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" /> Premium SaaS experience</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.08 }} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="border-b border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Campaign dashboard</p>
                  <p className="font-semibold text-navy">Downtown Residence Launch</p>
                </div>
                <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">Live</span>
              </div>
            </div>
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="min-h-[360px] bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center" />
              <div className="p-5">
                <p className="text-sm font-semibold text-navy">4 Bed Detached Home</p>
                <p className="mt-1 text-sm text-slate-500">Toronto-style campaign page with lead capture, channel tracking, and owner reporting.</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {proofMetrics.map(([value, label]) => (
                    <div key={label} className="rounded-md border border-slate-200 p-3">
                      <p className="text-xl font-bold text-navy">{value}</p>
                      <p className="text-xs text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-md bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Lead source mix</p>
                  <div className="mt-3 space-y-3">
                    {[["WhatsApp", "46%"], ["Facebook", "28%"], ["LinkedIn", "16%"], ["Direct", "10%"]].map(([label, value]) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs text-slate-500"><span>{label}</span><span>{value}</span></div>
                        <div className="mt-1 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-mint" style={{ width: value }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-page grid gap-4 py-6 text-sm text-slate-500 md:grid-cols-4">
          {["Brokerage-ready", "Mobile-first pages", "Secure subscription billing", "Client proof reports"].map((item) => (
            <div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-mint" /> {item}</div>
          ))}
        </div>
      </section>

      <section id="platform" className="container-page py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-mint">Platform</p>
          <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">Everything a listing team needs after the upload</h2>
          <p className="mt-4 text-slate-600">ListingJet gives your operation the professional polish customers expect from established Canadian and American SaaS products, without adding more manual marketing work.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-mint/10">
                <Icon className="h-6 w-6 text-mint" />
              </div>
              <h3 className="mt-4 font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-mint">Workflow</p>
            <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">From listing upload to measurable pipeline</h2>
            <p className="mt-4 text-slate-600">Use ListingJet as the command center for every campaign page, caption, share action, lead, and stakeholder report.</p>
            <div className="mt-8 space-y-5">
              {workflow.map(({ Icon, title, body }, index) => (
                <div key={title} className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-white text-navy shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gold">Step {index + 1}</p>
                    <h3 className="font-semibold text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-md bg-navy p-5 text-white">
                <p className="text-xs font-semibold uppercase text-white/50">Marketing asset generator</p>
                <h3 className="mt-4 text-2xl font-bold">Luxury 2 Bedroom Apartment</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">Generate high-converting captions, email copy, WhatsApp broadcast text, and social posts from one listing.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[Send, Facebook, Twitter, Linkedin].map((Icon, index) => (
                    <div key={index} className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
                      <Icon className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {["Instagram caption", "WhatsApp broadcast", "LinkedIn post", "Email promo copy"].map((item) => (
                  <div key={item} className="rounded-md border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-navy">{item}</p>
                    <p className="mt-2 text-sm text-slate-500">Premium listing now available. View photos, details, pricing, and request an inspection today.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-mint">Industries</p>
            <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">Made for teams that market real things</h2>
            <p className="mt-4 text-slate-600">Whether you list homes, rooms, venues, cars, jobs, products, or services, ListingJet turns each opportunity into a professional page with trackable demand.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <div key={industry} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <ClipboardCheck className="h-5 w-5 text-mint" />
                <span className="text-sm font-medium text-slate-700">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="bg-navy py-16 text-white lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-gold">Trust and reporting</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Show owners the work. Show customers the value.</h2>
            <p className="mt-4 leading-7 text-white/70">ListingJet helps businesses build confidence with landlord reports, performance summaries, inquiry timelines, verified badges, and clear activity records.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Downloadable PDF reports", "Shareable report links", "Listing performance summaries", "Lead status and notes"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/75">
                  <CheckCircle2 className="h-4 w-4 text-mint" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 text-navy shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Owner report</p>
                <h3 className="font-bold">Campaign Performance Summary</h3>
              </div>
              <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">Verified</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {proofMetrics.map(([value, label]) => (
                <div key={label} className="rounded-md bg-slate-50 p-4">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Lead submitted", "Buyer requested inspection"],
                ["WhatsApp clicked", "Mobile visitor from Facebook"],
                ["Report shared", "Owner opened campaign summary"]
              ].map(([title, body]) => (
                <div key={title} className="flex items-start gap-3 rounded-md border border-slate-200 p-3">
                  <CalendarCheck className="mt-0.5 h-4 w-4 text-mint" />
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-slate-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-mint">Plans</p>
            <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">Simple pricing for growing listing operations</h2>
            <p className="mt-4 text-slate-600">Start with essential campaign pages and scale into advanced analytics, team access, reports, API access, and white-label capabilities.</p>
            <Link href="/pricing"><Button className="mt-6">Compare all plans <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className={`rounded-lg border p-5 shadow-sm ${plan.highlighted ? "border-mint bg-navy text-white" : "border-slate-200 bg-white text-navy"}`}>
                <p className="font-bold">{plan.name}</p>
                <p className="mt-4 text-3xl font-bold">{plan.price}</p>
                <p className={`mt-1 text-sm ${plan.highlighted ? "text-white/65" : "text-slate-500"}`}>per month</p>
                <p className={`mt-5 text-sm leading-6 ${plan.highlighted ? "text-white/75" : "text-slate-500"}`}>{plan.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-16">
        <div className="container-page rounded-lg bg-white p-8 shadow-soft md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1 text-sm font-semibold text-mint">
                <Users className="h-4 w-4" /> Built for professional teams
              </div>
              <h2 className="text-3xl font-bold text-navy md:text-4xl">Ready to market listings like a serious business?</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Create your workspace, publish your first campaign page, and start tracking the conversations your listings generate.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register"><Button className="h-12 px-5">Start Growing Your Listings</Button></Link>
              <Link href="/login"><Button className="h-12 px-5" variant="secondary">Login</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container-page flex flex-col justify-between gap-4 py-8 text-sm text-slate-500 md:flex-row">
          <p className="font-semibold text-navy">ListingJet</p>
          <p>Upload Once. Market Everywhere. Track Every Lead.</p>
          <div className="flex gap-4">
            <Link href="/pricing">Pricing</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
