import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity.client";
import { listingSlugsQuery } from "@/lib/sanity.queries";

export const revalidate = 60;

const SITE_URL = "https://vittagroup.uy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client.fetch(listingSlugsQuery);

  const listingUrls = (slugs ?? []).map((x: any) => {
    const slug = x.slug?.current ?? x.slug;

    return {
      url: `${SITE_URL}/propiedades/${slug}`,
      lastModified: x._updatedAt ? new Date(x._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/propiedades`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...listingUrls,
  ];
}