import { groq } from "next-sanity";

export const featuredListingsQuery = groq`
*[_type=="listing" && isFeatured==true && status=="available"]
| order(_createdAt desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  kind,
  operation,
  locationText,
  priceMode,
  price,
  currency,
  headline,
  features,
  "heroImage": gallery[0]
}
`;

export const listingsQuery = groq`
*[_type=="listing" && status=="available"]
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  kind,
  operation,
  locationText,
  priceMode,
  price,
  currency,
  headline,
  features,
  "image": gallery[0]
}
`;

export const listingBySlugQuery = groq`
*[_type=="listing" && slug.current==$slug][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  kind,
  operation,
  locationText,
  priceMode,
  price,
  currency,
  headline,
  summary,
  features,
  specs,
  seo{
    title,
    description,
    ogImage
  },
  gallery[] {
    _key,
    alt,
    asset
  }
}
`;

export const listingSlugsQuery = groq`
*[_type=="listing" && status=="available" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}
`;