"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function ErrorPage({error,reset}:{error:Error&{digest?:string};reset:()=>void}){useEffect(()=>{console.error(error)},[error]);return <section className="not-found"><span className="eyebrow">SOMETHING DIDN’T LOAD</span><h1>Let’s try<br/><span className="gradient-text">that again.</span></h1><p>We couldn’t load this page. You can try again or return to the studio.</p><div className="error-actions"><button className="button button-primary" onClick={()=>reset()}>Try again</button><Link className="button button-quiet" href="/">Back home</Link></div></section>}
