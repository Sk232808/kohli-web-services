import { NextResponse } from "next/server";
import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabaseConfig } from "@/lib/supabase";
export async function POST(request:Request){
 if(!hasSupabaseConfig())return NextResponse.redirect(new URL("/",request.url),303);
 const jar=await cookies();const cookieMethods:CookieMethodsServer={getAll:()=>jar.getAll(),setAll(values){values.forEach(({name,value,options})=>jar.set(name,value,options))}};const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:cookieMethods});
 await supabase.auth.signOut();
 return NextResponse.redirect(new URL("/",request.url),303);
}
