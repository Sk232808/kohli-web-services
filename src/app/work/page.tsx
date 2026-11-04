import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { projects as defaultProjects } from "@/config/business";
import { getStudioContent } from "@/lib/supabase";
import { projectSchema } from "@/lib/content";
export const metadata: Metadata = { title: "Selected work", description: "Explore original demonstration website concepts by Kohli Web Studio. Fictional concepts, not client projects." };
export default async function WorkPage(){const projects=await getStudioContent("projects",defaultProjects,projectSchema);return <><section className="page-hero"><div className="wrap"><span className="eyebrow">A collection of directions</span><h1>Selected <span className="gradient-text">work.</span></h1><p>These are original fictional demonstration concepts — a glimpse of what thoughtful, goal-led web design can feel like.</p></div></section><PortfolioGallery projects={projects}/></>}
