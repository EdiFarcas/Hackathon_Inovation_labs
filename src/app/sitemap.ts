import type { MetadataRoute } from "next";

const baseUrl = "https://kova-kinetic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/accessories", "/hub", "/mouse-web", "/waitlist", "/privacy", "/terms", "/support"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
