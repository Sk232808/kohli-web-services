import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/business";
const site=siteUrl;
export default function sitemap():MetadataRoute.Sitemap{
 const paths=["","/services","/work","/pricing","/contact","/demo/restaurant","/demo/hotel","/demo/travel"];
 return paths.map(path=>({url:`${site}${path}`,lastModified:new Date(),changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:path.startsWith("/demo")?0.6:0.8}));
}
