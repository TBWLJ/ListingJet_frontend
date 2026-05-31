"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send, Share2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { money } from "@/lib/format";

export default function CampaignPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>();
  const [lead, setLead] = useState({ name: "", phone: "", email: "", message: "", preferredContactMethod: "whatsapp", budget: "", locationPreference: "" });
  const [sent, setSent] = useState(false);
  useEffect(() => { api.get(`/public/campaign/${slug}`).then((res) => setData(res.data)); }, [slug]);
  if (!data) return <main className="grid min-h-screen place-items-center">Loading campaign...</main>;
  const { listing, business, similar } = data;
  const hero = listing.images?.[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80";
  async function track(action: string, channel?: string) { await api.post(`/public/campaign/${slug}/event`, { action, channel }); }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await api.post(`/public/campaign/${slug}/lead`, lead);
    setSent(true);
  }
  return (
    <main className="bg-white">
      <section className="relative min-h-[78vh] bg-navy text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url(${hero})` }} />
        <div className="container-page relative flex min-h-[78vh] items-end py-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm"><ShieldCheck className="h-4 w-4 text-gold" /> Verified campaign page</div>
            <h1 className="text-4xl font-bold md:text-6xl">{listing.title}</h1>
            <p className="mt-4 flex items-center gap-2 text-white/80"><MapPin className="h-4 w-4" /> {listing.location}</p>
            <p className="mt-3 text-3xl font-bold text-gold">{money(listing.price, listing.currency)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a onClick={() => track("whatsapp", "whatsapp")} href={`https://wa.me/${listing.whatsapp || business.whatsapp}`}><Button className="bg-mint hover:bg-emerald-500"><Send className="h-4 w-4" /> WhatsApp inquiry</Button></a>
              <a onClick={() => track("call")} href={`tel:${listing.contactPhone || business.phone}`}><Button className="bg-gold text-navy hover:bg-amber-300"><Phone className="h-4 w-4" /> Call now</Button></a>
            </div>
          </div>
        </div>
      </section>
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_380px]">
        <article>
          <h2 className="text-2xl font-bold text-navy">Listing details</h2>
          <p className="mt-4 leading-7 text-slate-600">{listing.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[...(listing.features || []), ...(listing.amenities || [])].map((item) => <div key={item} className="flex items-center gap-2 rounded-md bg-slate-50 p-3 text-sm"><CheckCircle2 className="h-4 w-4 text-mint" /> {item}</div>)}
          </div>
          {listing.videoUrl && <iframe className="mt-8 aspect-video w-full rounded-lg" src={listing.videoUrl} title={listing.title} />}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">{similar.map((item: any) => <a key={item._id} className="rounded-lg border border-slate-200 p-4" href={`/campaign/${item.slug}`}><p className="font-semibold">{item.title}</p><p className="text-sm text-slate-500">{item.location}</p></a>)}</div>
        </article>
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-navy">Send an inquiry</h2>
          {sent ? <p className="mt-4 rounded-md bg-mint/10 p-3 text-sm text-mint">Inquiry submitted. The business will contact you soon.</p> : (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} required />
              <input placeholder="Phone" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
              <input placeholder="Email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
              <textarea placeholder="Message" value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} />
              <Button className="w-full">Submit inquiry</Button>
            </form>
          )}
          <div className="mt-6 rounded-md bg-slate-50 p-4">
            <p className="font-semibold text-navy">{business.name}</p>
            <p className="text-sm text-slate-500">{business.description || "Trusted ListingJet business workspace"}</p>
            <div className="mt-3 flex gap-2 text-sm"><Mail className="h-4 w-4" /> {business.contactEmail}</div>
          </div>
          <Button className="mt-4 w-full" variant="secondary" onClick={() => { track("share"); navigator.share?.({ title: listing.title, url: window.location.href }); }}><Share2 className="h-4 w-4" /> Share listing</Button>
        </aside>
      </section>
    </main>
  );
}
