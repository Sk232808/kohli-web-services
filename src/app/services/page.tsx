import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Blocks, Compass, Dumbbell, Hotel, MousePointerClick, PanelsTopLeft, ShoppingBag, UserRound, Utensils } from "lucide-react";
import { services as defaultServices } from "@/config/business";
import { getStudioContent } from "@/lib/supabase";
import { serviceSchema } from "@/lib/content";
import { ContactActions } from "@/components/contact-actions";

export const metadata: Metadata = { title: "Services", description: "Custom websites, e-commerce and web applications — thoughtfully designed and built by Kohli Web Studio." };
const icons = [PanelsTopLeft, ShoppingBag, Utensils, Hotel, Compass, Dumbbell, UserRound, MousePointerClick, Blocks];
export default async function ServicesPage() {
  const services=await getStudioContent("services",defaultServices,serviceSchema);
  return <><section className="page-hero"><div className="wrap"><span className="eyebrow">What we can build together</span><h1>Thoughtful digital,<br/><span className="gradient-text">made for you.</span></h1><p>From a sharper online presence to a custom digital product — choose a service, or tell us what you have in mind.</p><Link className="button button-primary page-hero-button" href="/contact">Tell us what you need <ArrowUpRight size={15}/></Link></div></section>
    <section className="section"><div className="wrap service-list">{services.map((service,i)=>{const Icon=icons[i]??PanelsTopLeft;return <article className="service-detail card" key={service.type}><div className="service-detail-top"><span className="service-detail-icon"><Icon size={23}/></span><span className="service-index">SERVICE / {String(i+1).padStart(2,"0")}</span></div><h2>{service.title}</h2><p>{service.description}</p><ul>{service.benefits.map(item=><li key={item}><span/> {item}</li>)}</ul><Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="service-cta">Enquire about this service <ArrowUpRight size={15}/></Link></article>})}</div></section>
    <section className="inline-cta"><div className="wrap inline-cta-inner"><div><span className="eyebrow">Something a little different?</span><h2>Tell us about your idea.</h2><p>We love a good custom brief.</p></div><Link className="button button-primary" href="/contact">Let’s talk <ArrowUpRight size={15}/></Link></div><div className="wrap"><ContactActions message="Hello Kohli Web Studio, I’m on the services page and would like to request a quote."/></div></section></>;
}
