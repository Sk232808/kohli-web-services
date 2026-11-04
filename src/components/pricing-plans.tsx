"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Globe2, MessageCircle } from "lucide-react";
import { business, createWhatsAppLink, type PlanDuration, type PricingPlan } from "@/config/business";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function PricingCard({ plan }: { plan: PricingPlan }) {
  const [duration, setDuration] = useState<PlanDuration>(12);
  const reduceMotion = useReducedMotion();
  const selected = plan.durations.find((item) => item.months === duration) ?? plan.durations[0];
  const enquiry = `/contact?plan=${encodeURIComponent(plan.name)}&duration=${duration}`;
  const whatsappMessage = `Hello Kohli Web Studio, I’m enquiring from the pricing page about the ${plan.name} for ${duration} months at ${formatPrice(selected.price)}.`;

  return (
    <article className={`price-card card ${plan.featured ? "price-featured" : ""}`}>
      {plan.featured && <span className="recommended">RECOMMENDED</span>}
      <span className="price-name">{plan.name}</span>
      {plan.domainHostingIncluded && (
        <div className="plan-inclusion"><Globe2 size={16}/><span>Domain and hosting included</span></div>
      )}
      <p className="plan-prompt">Choose your duration</p>
      <div className="duration-selector" role="group" aria-label={`${plan.name} duration`}>
        {plan.durations.map((item) => (
          <button
            aria-pressed={duration === item.months}
            className={duration === item.months ? "duration-option active" : "duration-option"}
            key={item.months}
            onClick={() => setDuration(item.months)}
            type="button"
          >
            {item.months} Months
          </button>
        ))}
      </div>
      <div className="price-display" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${duration}-${selected.price}`}
            initial={reduceMotion ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            {formatPrice(selected.price)}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="price-duration-label">for {duration} months</p>
      {plan.domainHostingIncluded && (
        <p className="plan-domain-detail"><Check size={14}/>Domain and hosting included for this duration.</p>
      )}
      <Link className={`button ${plan.featured ? "button-primary" : "button-quiet"} plan-cta`} href={enquiry}>
        Get Started <ArrowUpRight size={15}/>
      </Link>
      <a className="plan-whatsapp" href={createWhatsAppLink(whatsappMessage)} target="_blank" rel="noreferrer">
        <MessageCircle size={14}/> Chat on WhatsApp · {business.phone}
      </a>
      <div className="plan-contact-links"><a href={business.phoneLink}>Call Now</a><a href={`mailto:${business.email}`}>Email Us</a></div>
    </article>
  );
}

export function PricingPlans({ plans }: { plans: PricingPlan[] }) {
  return <div className="price-grid">{plans.map((plan) => <PricingCard key={plan.name} plan={plan}/>)}</div>;
}
