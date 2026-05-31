"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ListingForm } from "@/components/forms/ListingForm";
import { api } from "@/lib/api";
import type { Listing } from "@/types";

export default function EditListingPage() {
  const [listing, setListing] = useState<Listing>();
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) api.get(`/listings/${id}`).then((res) => setListing(res.data.listing));
  }, []);
  return (
    <DashboardShell>
      <h1 className="mb-6 text-2xl font-bold text-navy">Edit listing</h1>
      {listing ? <ListingForm listing={listing} /> : <p>Loading listing...</p>}
    </DashboardShell>
  );
}
