"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroTitle(){
 const reduceMotion=useReducedMotion();
 return <motion.h1 initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:[.22,1,.36,1]}}>WE BUILD<br/><span>DIGITAL</span><br/>EXPERIENCES<span className="hero-period">.</span></motion.h1>;
}
