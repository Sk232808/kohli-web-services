import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema=z.object({
 name:z.string().trim().min(1).max(120),
 email:z.string().trim().email().max(254),
 business:z.string().trim().max(160).optional(),
 phone:z.string().trim().max(50).optional(),
 "website type":z.string().trim().max(100).optional(),
 budget:z.string().trim().max(100).optional(),
 "preferred package":z.string().trim().max(100).optional(),
 "selected duration":z.string().trim().max(10).optional(),
 "selected plan price":z.string().trim().max(20).optional(),
 "preferred date":z.string().trim().max(50).optional(),
 "number of guests":z.string().trim().max(10).optional(),
 "arrival date":z.string().trim().max(50).optional(),
 "departure date":z.string().trim().max(50).optional(),
 destination:z.string().trim().max(100).optional(),
 "travel dates":z.string().trim().max(120).optional(),
 "number of travelers":z.string().trim().max(10).optional(),
 vehicle:z.string().trim().max(100).optional(),
 "project description":z.string().trim().max(5000).optional(),
 "enquiry details":z.string().trim().max(5000).optional(),
});
export async function POST(request:Request){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key)return NextResponse.json({error:"Enquiry storage is not configured. Please use the email draft option."},{status:503});
 const parsed=schema.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:"Please check your enquiry details and try again."},{status:400});
 const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {error}=await supabase.from("contact_enquiries").insert({name:parsed.data.name,email:parsed.data.email,payload:parsed.data});
 if(error)return NextResponse.json({error:"We couldn't save your enquiry. Please email us directly instead."},{status:502});
 return NextResponse.json({ok:true});
}
