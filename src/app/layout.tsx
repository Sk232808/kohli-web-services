import type { Metadata } from "next";
import "./globals.css";
import { business, siteUrl } from "@/config/business";
import { SiteHeader, SiteFooter, Preloader, FloatingWhatsApp } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${business.name} — ${business.tagline}`, template: `%s — ${business.name}` },
  description: "Independent creative web design and development for ambitious ideas. Kohli Web Studio builds thoughtful, custom digital experiences.",
  other: { "contact:email": business.email, "contact:phone_number": business.phone },
  openGraph: { title: "Kohli Web Studio — We build digital experiences.", description: "Independent creative web design and development for ambitious ideas.", siteName: "Kohli Web Studio", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Preloader/><SiteHeader/><main>{children}</main><SiteFooter/><FloatingWhatsApp/></body></html>;
}
