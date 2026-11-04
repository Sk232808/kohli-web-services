import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AlertTriangle, ArrowUpRight, Database, LockKeyhole, ShieldCheck } from "lucide-react";
import { hasSupabaseConfig, isAdminUser, getServerSupabase } from "@/lib/supabase";
import { AdminWorkspace } from "@/components/admin-workspace";
import { business, defaultWebsiteCopy, faqs, projects, services } from "@/config/business";

export const metadata:Metadata={title:"Studio admin",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function AdminPage(){
 if(!hasSupabaseConfig())return <section className="admin-setup"><div className="admin-setup-card card"><div className="admin-lock"><LockKeyhole size={23}/></div><span className="eyebrow">ADMIN · SETUP REQUIRED</span><h1>Your studio.<br/><span className="gradient-text">Your keys.</span></h1><p>The private dashboard is intentionally unavailable until a Supabase project and authorized administrator are configured. This is a safe setup screen — not a mock login.</p><div className="admin-check"><AlertTriangle size={17}/><span>Authentication and database credentials are not configured in this environment.</span></div><ol><li><b>01</b> Create a Supabase project.</li><li><b>02</b> Add the public project URL and anon key to your deployment environment.</li><li><b>03</b> Add your account email to the server-only <code>ADMIN_EMAILS</code> allowlist.</li><li><b>04</b> Run the documented schema setup in the project SQL editor.</li></ol><a className="button button-primary" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">Set up Supabase <ArrowUpRight size={15}/></a><p className="admin-safe-note"><ShieldCheck size={14}/> No password is hardcoded. No service-role key is exposed.</p></div></section>;
 const supabase=await getServerSupabase();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user||!isAdminUser(user))redirect("/admin/login");
 const {data,error}=await supabase.from("studio_content").select("key,value");
 const defaults=[{key:"projects",value:projects},{key:"services",value:services},{key:"packages",value:business.packages},{key:"faqs",value:faqs},{key:"website",value:defaultWebsiteCopy}];
 const entries=error?null:defaults.map(item=>data?.find(entry=>entry.key===item.key)??item);
 return <section className="admin-dashboard"><div className="wrap"><div className="admin-dashboard-head"><div><span className="eyebrow">PRIVATE STUDIO AREA</span><h1>Good to have<br/>you <span className="gradient-text">back.</span></h1><p>Signed in as {user.email}. Content access is protected by Supabase authentication and your server-side email allowlist.</p></div><form action="/auth/signout" method="post"><button className="button button-quiet" type="submit">Sign out <ArrowUpRight size={14}/></button></form></div>{entries?<AdminWorkspace initialEntries={entries}/>:<div className="admin-check"><Database size={17}/><span>Couldn’t load studio content. Confirm the database schema and row-level security policies are configured: {error?.message}</span></div>}<div className="admin-security-note"><ShieldCheck size={15}/> Supabase Auth verified server-side. Data access is governed by database RLS.</div></div></section>;
}
