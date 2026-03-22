import type { MetadataRoute } from "next";

const baseUrl = "https://cova-kinetic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/modules", "/hub", "/mouse-web", "/waitlist", "/privacy", "/terms", "/support"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
