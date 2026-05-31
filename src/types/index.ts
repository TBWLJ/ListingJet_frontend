export type Listing = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  listingType: string;
  price?: number;
  currency: string;
  location?: string;
  description?: string;
  features?: string[];
  amenities?: string[];
  images?: { url: string; publicId?: string }[];
  videoUrl?: string;
  contactPerson?: string;
  contactPhone?: string;
  whatsapp?: string;
  status: "draft" | "active" | "paused" | "archived";
  visibility: "public" | "private";
  stats?: Record<string, number>;
};

export type Business = {
  _id: string;
  name: string;
  industry: string;
  country: string;
  city: string;
  brandColor?: string;
  logo?: { url: string };
  description?: string;
  contactEmail?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  address?: string;
  isVerified?: boolean;
};

export type Lead = {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  listing?: Listing;
  createdAt: string;
};
