"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { business, services } from "@/config/business";
import { usePathname } from "next/navigation";

type PricingPlan = (typeof business.packages)[number];
type Props = { compact?: boolean; demo?: boolean; demoVariant?:"restaurant"|"hotel"|"travel"; initialVehicle?:string; initialService?:string; initialPackage?:string; initialDuration?:number; pricingPlans?:PricingPlan[] };
export function ContactForm({ compact = false, demo = false, demoVariant, initialVehicle="", initialService="", initialPackage="", initialDuration=12, pricingPlans=business.packages }: Props) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(initialPackage);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  const pathname=usePathname();
  const formVariant=demoVariant??(pathname==="/demo/travel"?"travel":pathname==="/demo/hotel"?"hotel":pathname==="/demo/restaurant"?"restaurant":undefined);
  const selectedPrice = pricingPlans.find(plan => plan.name === selectedPlan)?.durations.find(item => item.months === selectedDuration)?.price;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement=event.currentTarget;
    const form = new FormData(formElement);
    const values = Object.fromEntries(form.entries());
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setBusy(true);
      setMessage("");
      try {
        const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "We couldn't save your enquiry.");
        formElement.reset();
        setMessage("Your enquiry has been received. We’ll be in touch.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "We couldn't save your enquiry. Please email us directly.");
      } finally {
        setBusy(false);
      }
      return;
    }
    const subject = `${demo ? "Demo enquiry" : "Project enquiry"} — ${String(form.get("business") || form.get("name"))}`;
    const body = [...form.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
    setMessage(`Your email app is opening with your enquiry drafted. Review it and press Send to contact ${business.email}.`);
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return <form className="contact-form" onSubmit={submit}>
    {!compact && <div className="form-grid">
      <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required autoComplete="name" placeholder="How should we address you?"/></div>
      <div className="field"><label htmlFor="business">Business name</label><input id="business" name="business" autoComplete="organization" placeholder="Your brand or business"/></div>
      <div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com"/></div>
      <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000"/></div>
      <div className="field"><label htmlFor="website-type">What are you looking to build? *</label><select id="website-type" name="website type" required defaultValue={initialService}><option value="" disabled>Select a website type</option>{services.map(service => <option value={service.title} key={service.type}>{service.title}</option>)}</select></div>
      <div className="field"><label htmlFor="budget">Approximate budget (optional)</label><select id="budget" name="budget" defaultValue=""><option value="" disabled>Select a price in INR</option>{Array.from(new Set(pricingPlans.flatMap(plan=>plan.durations.map(item=>item.price)))).sort((a,b)=>a-b).map(price=><option key={price}>{`Around ${new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(price)}`}</option>)}<option>Not sure yet</option></select></div>
      <div className="field span-2"><label htmlFor="package">Plan</label><select id="package" name="preferred package" value={selectedPlan} onChange={event=>{setSelectedPlan(event.target.value);setSelectedDuration(12)}}><option value="">Choose a plan (optional)</option>{pricingPlans.map(item=><option key={item.name}>{item.name}</option>)}</select></div>
      {selectedPlan&&<><div className="field"><label htmlFor="plan-duration">Duration</label><select id="plan-duration" name="selected duration" value={selectedDuration} onChange={event=>setSelectedDuration(Number(event.target.value))}>{pricingPlans.find(item=>item.name===selectedPlan)?.durations.map(item=><option value={item.months} key={item.months}>{item.months} Months</option>)}</select></div><div className="field"><label>Selected plan price</label><div className="selected-plan-price" aria-live="polite">{selectedPrice===undefined?"Select a plan":new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(selectedPrice)}</div><input type="hidden" name="selected plan price" value={selectedPrice??""}/></div></>}
      <div className="field span-2"><label htmlFor="project">Tell us a little about the project *</label><textarea id="project" name="project description" required placeholder="What are you hoping to make, and what would success look like?"/></div>
    </div>}
    {compact && <div className="form-grid">
      <div className="field"><label htmlFor="demo-name">Your name *</label><input id="demo-name" name="name" required autoComplete="name" placeholder="Your name"/></div>
      <div className="field"><label htmlFor="demo-email">Email address *</label><input id="demo-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com"/></div>
      {formVariant==="restaurant"&&<><div className="field"><label htmlFor="reservation-date">Preferred date *</label><input id="reservation-date" name="preferred date" type="date" required/></div><div className="field"><label htmlFor="reservation-guests">Guests</label><select id="reservation-guests" name="number of guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select></div></>}
      {formVariant==="hotel"&&<><div className="field"><label htmlFor="arrival-date">Arrival date *</label><input id="arrival-date" name="arrival date" type="date" required/></div><div className="field"><label htmlFor="departure-date">Departure date *</label><input id="departure-date" name="departure date" type="date" required/></div><div className="field"><label htmlFor="hotel-guests">Guests</label><select id="hotel-guests" name="number of guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option></select></div></>}
      {formVariant==="travel"&&<><div className="field"><label htmlFor="travel-destination">Destination *</label><select id="travel-destination" name="destination" required defaultValue=""><option value="" disabled>Choose a place</option><option>Ladakh</option><option>Spiti Valley</option><option>Western Ghats</option><option>Help me choose</option></select></div><div className="field"><label htmlFor="travel-dates">Preferred travel dates *</label><input id="travel-dates" name="travel dates" required placeholder="For example, late September"/></div><div className="field"><label htmlFor="travel-guests">Travellers</label><select id="travel-guests" name="number of travelers" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div><div className="field"><label htmlFor="travel-vehicle">Vehicle preference</label><select id="travel-vehicle" name="vehicle" defaultValue={initialVehicle}><option>The Highlander</option><option>The Wayfinder</option><option>The Trailhead</option></select></div></>}
      {demo && <div className="field span-2"><label htmlFor="demo-details">{formVariant==="restaurant"?"Anything else we should know?":"Share your preferences or questions"}{formVariant==="restaurant"?"":" *"}</label><textarea id="demo-details" name="enquiry details" required={formVariant!=="restaurant"} placeholder={formVariant==="restaurant"?"Dietary needs, seating requests or a special occasion?":"A little more about the stay or trip you have in mind..."}/></div>}
    </div>}
    <button className="button button-primary form-submit" type="submit" disabled={busy}>{busy?"Sending securely…":process.env.NEXT_PUBLIC_SUPABASE_URL?"Send enquiry":demo?"Draft enquiry":"Draft project enquiry"} <ArrowUpRight size={15}/></button>
    <p className="form-disclaimer"><Mail size={13}/>{process.env.NEXT_PUBLIC_SUPABASE_URL?"Enquiries are sent securely to the configured project database.":demo?<>Demonstration only: this creates an email draft to Kohli Web Studio, not the fictional business. No message is sent automatically.</>:<>No message is sent automatically. Your email app opens a draft addressed to {business.email}.</>}</p>
    {message && <p className="form-feedback" role="status"><Check size={14}/>{message}</p>}
  </form>;
}
