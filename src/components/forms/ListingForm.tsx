"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Video } from "lucide-react";
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
  videoUrl: z.string().optional().or(z.literal("")),
  status: z.string().default("draft"),
  visibility: z.string().default("public"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

type ListingFormValues = z.infer<typeof schema>;

export function ListingForm({ listing }: { listing?: Listing }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ListingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: listing ? {
      ...listing,
      features: listing.features?.join(", "),
      amenities: listing.amenities?.join(", ")
    } as any : { currency: "NGN", listingType: "property", status: "draft", visibility: "public" }
  });
  async function onSubmit(values: ListingFormValues) {
    setError("");
    try {
      const payload = { ...values, features: values.features?.split(",").map((i) => i.trim()).filter(Boolean), amenities: values.amenities?.split(",").map((i) => i.trim()).filter(Boolean) };
      const formData = new window.FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        if (Array.isArray(value)) formData.append(key, value.join(","));
        else formData.append(key, String(value));
      });
      imageFiles.forEach((file) => formData.append("images", file));
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
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
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
        <div className="md:col-span-2">
          <Field label="Listing photos">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-mint hover:bg-mint/5">
              <ImagePlus className="h-8 w-8 text-mint" />
              <span className="mt-2 text-sm font-semibold text-navy">Upload listing photos</span>
              <span className="mt-1 text-xs text-slate-500">JPG, PNG, WebP, or GIF. You can add up to 12 photos.</span>
              <input
                className="sr-only"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={(event) => setImageFiles(Array.from(event.target.files || []).slice(0, 12))}
              />
            </label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {listing?.images?.slice(0, 6).map((image) => (
                <div key={image.url} className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-500">
                  <div className="h-10 w-12 shrink-0 rounded bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url(${image.url})` }} />
                  Existing photo
                </div>
              ))}
              {imageFiles.map((file) => (
                <div key={`${file.name}-${file.lastModified}`} className="truncate rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-xs font-medium text-navy">
                  {file.name}
                </div>
              ))}
            </div>
          </Field>
        </div>
        <Field label="Video upload optional">
          <label className="flex cursor-pointer flex-col rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 transition hover:border-mint hover:bg-mint/5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy"><Video className="h-4 w-4 text-mint" /> Add video file</span>
            <span className="mt-1 text-xs text-slate-500">Optional. Use this only when the listing has a video.</span>
          <input
            className="sr-only"
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
          />
          </label>
          {videoFile && <p className="mt-2 truncate rounded-md bg-slate-50 px-3 py-2 text-xs font-medium text-navy">{videoFile.name}</p>}
          <p className="mt-1 text-xs text-slate-500">MP4, WebM, or MOV. Leave empty for photo-only listings.</p>
        </Field>
        <Field label="Video URL optional"><input placeholder="https://youtube.com/..." {...register("videoUrl")} /><p className="mt-1 text-xs text-slate-500">Paste a YouTube, Vimeo, or hosted video link only when available.</p></Field>
        <Field label="Status"><select {...register("status")}><option value="draft">Draft</option><option value="active">Active</option><option value="paused">Paused</option><option value="archived">Archived</option></select></Field>
        <Field label="Visibility"><select {...register("visibility")}><option value="public">Public</option><option value="private">Private</option></select></Field>
        <Field label="Features"><input placeholder="Pool, parking, furnished" {...register("features")} /></Field>
        <Field label="Amenities"><input placeholder="Security, WiFi, backup power" {...register("amenities")} /></Field>
        <Field label="SEO title"><input {...register("seoTitle")} /></Field>
        <Field label="SEO description"><input {...register("seoDescription")} /></Field>
        <div className="md:col-span-2"><label>Description</label><textarea rows={6} {...register("description")} /></div>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <Button className="mt-6 w-full sm:w-auto" loading={isSubmitting}>Save listing</Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label>{label}</label>{children}</div>;
}
