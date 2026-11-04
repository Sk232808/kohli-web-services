import "server-only";
import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { unstable_noStore } from "next/cache";

export function hasSupabaseConfig(){return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}
export function isAdminEmail(email?:string|null){const allowed=(process.env.ADMIN_EMAILS||"").split(",").map(value=>value.trim().toLowerCase()).filter(Boolean);return Boolean(email&&allowed.includes(email.toLowerCase()))}
export function isAdminUser(user?:{email?:string;app_metadata?:Record<string,unknown>}|null){return Boolean(user&&isAdminEmail(user.email)&&user.app_metadata?.role==="studio_admin")}
export async function getServerSupabase(){
 const jar=await cookies();
 const cookieMethods:CookieMethodsServer={getAll:()=>jar.getAll(),setAll(cookiesToSet){try{cookiesToSet.forEach(({name,value,options})=>jar.set(name,value,options))}catch{}}};
 return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:cookieMethods});
}
export async function getStudioContent<T>(key:string,fallback:T,schema:{parse(value:unknown):T}):Promise<T>{
 if(!hasSupabaseConfig())return fallback;
 unstable_noStore();
 const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await supabase.from("studio_content").select("value").eq("key",key).maybeSingle();
 if(error)throw new Error(`Could not load studio content "${key}": ${error.message}`);
 return data?schema.parse(data.value):fallback;
}
