import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";return["","/admission","/fees","/thank-you"].map((path,i)=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:i===0?"weekly":"monthly",priority:i===0?1:.8}))}
