import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type Project = {slug:string;title:string;category:string;type:string;description:string;image:string;accent:string;tags:string[];demo:string};
export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <Link href={project.demo} className="project-image" aria-label={`View ${project.title} demonstration concept`}>
      <Image src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1000&q=85`} alt={`${project.category} visual concept for ${project.title}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"/>
      <span className="project-open"><ArrowUpRight size={17}/></span><span className="project-concept">DEMO CONCEPT</span>
    </Link>
    <div className="project-meta"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><Link href={project.demo} aria-label={`View ${project.title}`}><ArrowUpRight size={17}/></Link></div>
    <p>{project.description}</p><div className="project-tags">{project.tags.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
  </article>;
}
