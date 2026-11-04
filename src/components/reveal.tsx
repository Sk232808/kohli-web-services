"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gsap.fromTo(node, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: node, start: "top 88%", once: true } });
    return () => { animation.scrollTrigger?.kill(); animation.kill(); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
