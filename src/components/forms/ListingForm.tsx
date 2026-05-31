"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import type { Listing } from "@/types";

const schema = z.object({
  title: z.string().min(3),
  category: z.string().optional(),
  listingType: z.string().min(2),
  price: z.coerce.number().optional(),
  currency: z.string().default("NGN"),
  location: z.string().optional(),
  description: z.string().optional(),
  features: z.string().optional(),
  amenities: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  whatsapp: z.string().optional(),
  videoUrl: z.string().optional(),
  status: z.string().default("draft"),
  visibility: z.string().default("public"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export function ListingForm({ listing }: { listing?: Listing }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: listing ? {
      ...listing,
      features: listing.features?.join(", "),
      amenities: listing.amenities?.join(", ")
    } as any : { currency: "NGN", listingType: "property", status: "draft", visibility: "public" }
  });
  async function onSubmit(values: FormData) {
    setError("");
    try {
      const payload = { ...values, features: values.features?.split(",").map((i) => i.trim()).filter(Boolean), amenities: values.amenities?.split(",").map((i) => i.trim()).filter(Boolean) };
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) formData.append(key, value.join(","));
        else formData.append(key, String(value));
      });
      if (videoFile) formData.append("video", videoFile);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (listing) await api.patch(`/listings/${listing._id}`, formData, config);
      else await api.post("/listings", formData, config);
      router.push("/listings");
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not save listing");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title"><input {...register("title")} /></Field>
        <Field label="Category"><input {...register("category")} /></Field>
        <Field label="Listing type"><select {...register("listingType")}><option value="property">Property</option><option value="hotel_room">Hotel room</option><option value="event_center">Event center</option><option value="vehicle">Vehicle</option><option value="job">Job</option><option value="product">Product</option><option value="service">Service</option></select></Field>
        <Field label="Price"><input type="number" {...register("price")} /></Field>
        <Field label="Currency"><input {...register("currency")} /></Field>
        <Field label="Location"><input {...register("location")} /></Field>
        <Field label="Contact person"><input {...register("contactPerson")} /></Field>
        <Field label="Contact phone"><input {...register("contactPhone")} /></Field>
        <Field label="WhatsApp"><input {...register("whatsapp")} /></Field>
        <Field label="Video upload">
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
          />
          <p className="mt-1 text-xs text-slate-500">Upload MP4, WebM, or MOV. If you do not have a video file, paste a URL below.</p>
        </Field>
        <Field label="Video URL fallback"><input placeholder="https://youtube.com/..." {...register("videoUrl")} /></Field>
        <Field label="Status"><select {...register("status")}><option value="draft">Draft</option><option value="active">Active</option><option value="paused">Paused</option><option value="archived">Archived</option></select></Field>
        <Field label="Visibility"><select {...register("visibility")}><option value="public">Public</option><option value="private">Private</option></select></Field>
        <Field label="Features"><input placeholder="Pool, parking, furnished" {...register("features")} /></Field>
        <Field label="Amenities"><input placeholder="Security, WiFi, backup power" {...register("amenities")} /></Field>
        <Field label="SEO title"><input {...register("seoTitle")} /></Field>
        <Field label="SEO description"><input {...register("seoDescription")} /></Field>
        <div className="md:col-span-2"><label>Description</label><textarea rows={6} {...register("description")} /></div>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <Button className="mt-6" loading={isSubmitting}>Save listing</Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label>{label}</label>{children}</div>;
}
