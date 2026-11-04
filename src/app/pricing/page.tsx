import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { PricingPlans } from "@/components/pricing-plans";
import { ContactActions } from "@/components/contact-actions";
import { getStudioContent } from "@/lib/supabase";
import { packageSchema } from "@/lib/content";

export const metadata: Metadata = { title:"Pricing",description:"Choose a Single Plan or Premium Plan and select a 12, 24, or 48 month duration." };
export default async function PricingPage(){
 const packages=await getStudioContent("packages",business.packages,packageSchema);
 return <><section className="page-hero"><div className="wrap"><span className="eyebrow">Straightforward plans</span><h1>Choose what<br/><span className="gradient-text">works for you.</span></h1><p>Select a plan and duration to see its price. Premium includes a domain and hosting for every duration.</p></div></section>
 <section className="section"><div className="wrap"><PricingPlans plans={packages}/><p className="price-disclaimer">Choose a plan to start an enquiry with your selected duration and price included.</p></div></section>
 <section className="inline-cta"><div className="wrap inline-cta-inner"><div><span className="eyebrow">Questions about a plan?</span><h2>Let’s talk it through.</h2><p>Send us an enquiry to get started.</p></div><Link className="button button-primary" href="/contact">Contact the studio <ArrowRight size={15}/></Link></div><div className="wrap"><ContactActions message="Hello Kohli Web Studio, I’m on the pricing page and would like to request a quote."/></div></section></>;
}
