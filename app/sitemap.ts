import type { MetadataRoute } from "next";
import { workCards } from "@/constants/work/workCards";

const BASE_URL = "https://quickgen-portfolio.vercel.app/";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/services`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/work`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/process`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/media`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/careers`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/contact`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = workCards.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
