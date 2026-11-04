import { z } from "zod";

export const serviceSchema=z.array(z.object({title:z.string(),type:z.string(),icon:z.string(),description:z.string(),benefits:z.array(z.string())})).min(1);
export const projectSchema=z.array(z.object({slug:z.string().regex(/^[a-z0-9-]+$/),title:z.string(),category:z.string(),type:z.string(),description:z.string(),image:z.string().regex(/^photo-[A-Za-z0-9-]+$/),accent:z.string(),tags:z.array(z.string()),demo:z.string().refine(value=>value.startsWith("/")&&!value.startsWith("//")||value.startsWith("https://"),"Demo links must be local paths or HTTPS URLs.")}));
export const packageSchema=z.array(z.object({
 name:z.enum(["Single Plan","Premium Plan"]),
 durations:z.array(z.object({months:z.union([z.literal(12),z.literal(24),z.literal(48)]),price:z.number().int().positive()})).length(3),
 domainHostingIncluded:z.boolean(),
 featured:z.boolean().optional(),
})).length(2).superRefine((plans,context)=>{
 const single=plans.find(plan=>plan.name==="Single Plan");
 const premium=plans.find(plan=>plan.name==="Premium Plan");
 if(!single||!premium){context.addIssue({code:"custom",message:"Pricing must include Single Plan and Premium Plan."});return}
 if(plans[0].name!=="Single Plan"||plans[1].name!=="Premium Plan"){
  context.addIssue({code:"custom",message:"Show Single Plan first and Premium Plan second."});
 }
 if(single.domainHostingIncluded)context.addIssue({code:"custom",message:"Single Plan cannot include a domain or hosting."});
 if(!premium.domainHostingIncluded)context.addIssue({code:"custom",message:"Premium Plan must include a domain and hosting."});
 if(premium.featured!==true)context.addIssue({code:"custom",message:"Premium Plan must keep its recommended highlight."});
 if(single.featured===true)context.addIssue({code:"custom",message:"Only Premium Plan can have the recommended highlight."});
 for(const plan of plans){
  if(plan.durations.map(duration=>duration.months).join(",")!=="12,24,48"){
   context.addIssue({code:"custom",message:`${plan.name} must include 12, 24, and 48 month durations in order.`});
  }
 }
});
export const faqSchema=z.array(z.object({question:z.string(),answer:z.string()}));
export const websiteSchema=z.object({heroDescription:z.string(),introTitle:z.string(),introCopy:z.string(),closingTitle:z.string()});
export const contentSchemas={projects:projectSchema,services:serviceSchema,packages:packageSchema,faqs:faqSchema,website:websiteSchema};
export type WebsiteCopy=z.infer<typeof websiteSchema>;
