import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSupabase, hasSupabaseConfig, isAdminUser } from "@/lib/supabase";
import { contentSchemas } from "@/lib/content";

const allowedKeys=["projects","services","packages","faqs","website"] as const;
const schema=z.object({key:z.enum(allowedKeys),value:z.unknown()});
async function authorize(){const supabase=await getServerSupabase();const {data:{user}}=await supabase.auth.getUser();if(!isAdminUser(user))return null;return supabase}
export async function GET(request:Request){
 if(!hasSupabaseConfig())return NextResponse.json({error:"Supabase is not configured."},{status:503});
 const supabase=await authorize();if(!supabase)return NextResponse.json({error:"Unauthorized"},{status:401});
 const key=new URL(request.url).searchParams.get("key");if(!allowedKeys.includes(key as typeof allowedKeys[number]))return NextResponse.json({error:"Unknown content area"},{status:400});
 const {data,error}=await supabase.from("studio_content").select("value").eq("key",key).maybeSingle();
 if(error)return NextResponse.json({error:"Could not load content. Verify the database schema and row-level security."},{status:502});
 return NextResponse.json({value:data?.value??null});
}
export async function PUT(request:Request){
 if(!hasSupabaseConfig())return NextResponse.json({error:"Supabase is not configured."},{status:503});
 const supabase=await authorize();if(!supabase)return NextResponse.json({error:"Unauthorized"},{status:401});
 const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Invalid content update"},{status:400});
 const content=contentSchemas[parsed.data.key].safeParse(parsed.data.value);if(!content.success)return NextResponse.json({error:`Content is invalid: ${content.error.issues[0]?.message??"check the content shape."}`},{status:400});
 const {error}=await supabase.from("studio_content").upsert({key:parsed.data.key,value:content.data,updated_at:new Date().toISOString()},{onConflict:"key"});
 if(error)return NextResponse.json({error:"Could not save content. Verify the database schema and row-level security."},{status:502});
 return NextResponse.json({ok:true});
}
