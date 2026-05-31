import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ListingJet",
  description: "Upload Once. Market Everywhere. Track Every Lead."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
