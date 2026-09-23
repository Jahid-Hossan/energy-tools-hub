import { siteConfig } from "@/lib/site";
import { categories, tools } from "@/lib/tools";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = siteConfig.url; return [{ url: base, lastModified: new Date() }, { url: `${base}/tools`, lastModified: new Date() }, ...categories.map((item) => ({ url: `${base}${item.path}`, lastModified: new Date() })), ...tools.map((item) => ({ url: `${base}/tools/${item.slug}`, lastModified: new Date() }))]; }
