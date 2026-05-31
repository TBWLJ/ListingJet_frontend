import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-navy px-4 text-center text-white">
      <section>
        <p className="text-sm text-gold">404</p>
        <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-white/70">The page may have moved or the campaign is no longer active.</p>
        <Link href="/"><Button className="mt-6 bg-gold text-navy hover:bg-amber-300">Back home</Button></Link>
      </section>
    </main>
  );
}
