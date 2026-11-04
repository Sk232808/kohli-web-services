"use client";

import { FormEvent, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function AdminLoginForm(){
 const [status,setStatus]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setStatus("");const form=new FormData(event.currentTarget);const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;if(!url||!key){setStatus("Supabase authentication is not configured.");return}
 const supabase=createBrowserClient(url,key);const {error}=await supabase.auth.signInWithOtp({email:String(form.get("email")),options:{emailRedirectTo:`${window.location.origin}/auth/callback`}});setStatus(error?error.message:"If this address is authorized, a sign-in link has been sent. Check your email.");}
 return <form className="admin-login-form" onSubmit={submit}><div className="field"><label htmlFor="admin-email">Authorized email address</label><input id="admin-email" name="email" type="email" required autoComplete="email" placeholder="you@your-studio.com"/></div><button className="button button-primary" type="submit">Send secure sign-in link</button>{status&&<p className="form-feedback" role="status">{status}</p>}<p>Sign-in links are delivered by Supabase Auth. Unauthorized accounts are denied access after server verification.</p></form>
}
