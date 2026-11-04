import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { hasSupabaseConfig, getServerSupabase, isAdminUser } from "@/lib/supabase";
import { AdminLoginForm } from "@/components/admin-login-form";
export const metadata:Metadata={title:"Admin sign in",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function AdminLoginPage(){
 if(!hasSupabaseConfig())redirect("/admin");
 const supabase=await getServerSupabase();
 const {data:{user}}=await supabase.auth.getUser();
 if(isAdminUser(user))redirect("/admin");
 return <section className="admin-setup"><div className="admin-setup-card card"><div className="admin-lock"><LockKeyhole size={23}/></div><span className="eyebrow">AUTHORIZED STUDIO ACCESS</span><h1>Sign in<br/><span className="gradient-text">securely.</span></h1><p>Use your authorized Supabase account. Only email addresses on the private server-side allowlist can access this dashboard.</p><AdminLoginForm/><Link className="admin-return" href="/">← Back to the studio</Link></div></section>;
}
