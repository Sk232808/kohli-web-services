import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request:NextRequest){
 const {pathname}=request.nextUrl;
 if(!pathname.startsWith("/admin")||pathname==="/admin/login")return NextResponse.next();
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)return NextResponse.next();
 let response=NextResponse.next({request});
 const cookieMethods:CookieMethodsServer={getAll:()=>request.cookies.getAll(),setAll(cookiesToSet){cookiesToSet.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});cookiesToSet.forEach(({name,value,options})=>response.cookies.set(name,value,options))}};
 const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,{cookies:cookieMethods});
 const {data:{user}}=await supabase.auth.getUser();
 const allowed=(process.env.ADMIN_EMAILS||"").split(",").map(value=>value.trim().toLowerCase()).filter(Boolean);
 if(!user?.email||!allowed.includes(user.email.toLowerCase())||user.app_metadata?.role!=="studio_admin"){const login=new URL("/admin/login",request.url);return NextResponse.redirect(login)}
 return response;
}

export const config={matcher:["/admin/:path*"]};
