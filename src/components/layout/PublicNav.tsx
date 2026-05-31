import Link from "next/link";
import { Button } from "../ui/Button";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 text-navy backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-navy text-sm text-white">LJ</span>
          ListingJet
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/#platform">Platform</Link>
          <Link href="/#industries">Industries</Link>
          <Link href="/#proof">Proof</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden text-sm font-semibold text-slate-600 sm:inline" href="/login">Login</Link>
          <Link href="/register"><Button>Start Free</Button></Link>
        </div>
      </div>
    </header>
  );
}
