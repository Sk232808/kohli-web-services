import { NextResponse } from "next/server";
import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabaseConfig, isAdminUser } from "@/lib/supabase";
export async function GET(request:Request){
 const url=new URL(request.url);const code=url.searchParams.get("code");
 if(!hasSupabaseConfig())return NextResponse.redirect(new URL("/admin",url.origin));
 if(!code)return NextResponse.redirect(new URL("/admin/login?error=missing_code",url.origin));
 const jar=await cookies();const cookieMethods:CookieMethodsServer={getAll:()=>jar.getAll(),setAll(values){values.forEach(({name,value,options})=>jar.set(name,value,options))}};const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:cookieMethods});
 const {data,error}=await supabase.auth.exchangeCodeForSession(code);
 if(error||!isAdminUser(data.user)){await supabase.auth.signOut();return NextResponse.redirect(new URL("/admin/login?error=unauthorized",url.origin))}
 return NextResponse.redirect(new URL("/admin",url.origin));
}
