"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";

export function PortfolioGallery({projects}:{projects:import("@/components/project-card").Project[]}){
  const [active,setActive]=useState("All");
  const categories = ["All", ...new Set(projects.map(project=>project.category))];
  const filtered=active==="All"?projects:projects.filter(project=>project.category===active);
  return <section className="section"><div className="wrap"><div className="filter-row" role="group" aria-label="Filter projects by category">{categories.map(category=><button key={category} onClick={()=>setActive(category)} className={`filter-button ${active===category?"active":""}`} aria-pressed={active===category}>{category}<span>{category==="All"?projects.length:projects.filter(p=>p.category===category).length}</span></button>)}</div><div className="project-grid portfolio-grid">{filtered.map(project=><ProjectCard key={project.slug} project={project}/>)}</div><p className="concept-disclaimer">Every project shown is a fictional demonstration concept, not a real client or collaboration.</p></div></section>
}
