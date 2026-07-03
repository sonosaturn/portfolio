import type { MetadataRoute } from "next";
import { getAllProjects, getAllInterests } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/interests"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const projects = getAllProjects().map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: p.date,
  }));

  const interests = getAllInterests().map((i) => ({
    url: `${site.url}/interests/${i.slug}`,
    lastModified: i.date,
  }));

  return [...staticRoutes, ...projects, ...interests];
}
