"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { business, createWhatsAppLink } from "@/config/business";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const links = [{ href: "/services", label: "Services" }, { href: "/work", label: "Selected work" }, { href: "/pricing", label: "Pricing" }, { href: "/contact", label: "Contact" }];

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const pathname=usePathname();
  useEffect(() => {
    if(pathname.startsWith("/demo")||pathname.startsWith("/admin"))return;
    if (sessionStorage.getItem("kws-seen")) return;
    setVisible(true);
    const timer = window.setTimeout(() => { setVisible(false); sessionStorage.setItem("kws-seen", "1"); }, 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  if (!visible) return null;
  return <div className="preloader" aria-label="Kohli Web Studio loading"><span>K<span style={{ color: "#a78bfa" }}>.</span></span></div>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname=usePathname();
  const reduceMotion=useReducedMotion();
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if(pathname.startsWith("/demo")||pathname.startsWith("/admin"))return null;
  return <header className="site-header"><div className="wrap header-inner">
    <Link href="/" className="brand" aria-label="Kohli Web Studio home"><span className="brand-mark">K<span>.</span></span><span className="brand-name">KOHLI WEB STUDIO<small>INDEPENDENT DIGITAL STUDIO</small></span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
    <a className="header-cta" href={createWhatsAppLink("Hello Kohli Web Studio, I found your website and would like to discuss a project.")} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={14}/></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
  </div><AnimatePresence>{open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={reduceMotion?false:{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.2}}>{links.map((link, index) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href}><span>0{index + 1}</span>{link.label}<ArrowDownRight size={18}/></Link>)}</motion.nav>}</AnimatePresence></header>;
}

export function SiteFooter() {
  const pathname=usePathname();
  if(pathname.startsWith("/demo")||pathname.startsWith("/admin"))return null;
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-top"><div><span className="eyebrow">Have a good one in mind?</span><h2>Let’s make it<br/><span>real.</span></h2></div><Link href="/contact" className="button button-primary">Start a project <ArrowUpRight size={16}/></Link></div>
    <div className="footer-bottom"><Link href="/" className="footer-brand">KOHLI WEB STUDIO<span>© {new Date().getFullYear()} · {business.location}</span></Link><div className="footer-links"><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link><Link href="/admin">Admin</Link></div><div className="footer-contact"><a href={business.phoneLink}>Call Now<small>{business.phone}</small></a><a href={`mailto:${business.email}`}>Email Us<small>{business.email}</small></a><a href={createWhatsAppLink("Hello Kohli Web Studio, I found your website and would like to discuss a project.")} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div><div className="footer-social"><a href={business.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12}/></a><a href={business.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12}/></a></div></div>
  </div></footer>;
}

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const pageName = pathname.startsWith("/demo/restaurant")
    ? "the Sora restaurant website concept"
    : pathname.startsWith("/demo/hotel")
      ? "the Solstice House hotel website concept"
      : pathname.startsWith("/demo/travel")
        ? "the Northbound Co. travel website concept"
        : pathname === "/pricing"
          ? "the pricing page"
          : pathname === "/contact"
            ? "the contact page"
            : pathname === "/"
              ? "the Kohli Web Studio website"
              : `${pathname.slice(1).replaceAll("/", " ")} page`;
  const message = `Hello Kohli Web Studio, I found ${pageName} and would like to discuss a website project.`;
  return <a className="floating-whatsapp" href={createWhatsAppLink(message)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp with Kohli Web Studio">
    <MessageCircle size={19}/><span>Chat on WhatsApp</span>
  </a>;
}
