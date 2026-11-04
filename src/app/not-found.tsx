import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound(){return <section className="not-found"><span className="eyebrow">404 · THIS PAGE WANDERED OFF</span><h1>Nothing here<br/><span className="gradient-text">but possibility.</span></h1><p>The page you’re looking for might have moved or never existed.</p><Link className="button button-primary" href="/"><ArrowLeft size={15}/> Back to the studio</Link></section>}
