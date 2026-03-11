import { client } from "@/lib/sanity.client";
import { listingBySlugQuery, listingSlugsQuery } from "@/lib/sanity.queries";
import ListingGallery from "@/components/listing-gallery";
import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity.image";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

const SITE_URL = "https://vittagroup.uy";
const WHATSAPP_NUMBER = "59892112466";

export async function generateStaticParams() {
  const slugs = await client.fetch(listingSlugsQuery);

  return (slugs ?? []).map((x: any) => ({
    slug: x.slug?.current ?? x.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await client.fetch(listingBySlugQuery, { slug });

  if (!listing) {
    return {
      title: "Propiedad no encontrada",
      description: "Vitta Group - Negocios Inmobiliarios en Montevideo.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = listing?.seo?.title || listing.title;
  const description =
    listing?.seo?.description ||
    listing.headline ||
    listing.summary ||
    "Propiedades y oportunidades de inversión en Montevideo.";

  const canonicalUrl = `${SITE_URL}/propiedades/${slug}`;

  const ogImg = listing?.seo?.ogImage
    ? urlFor(listing.seo.ogImage).width(1200).height(630).quality(85).url()
    : listing?.gallery?.[0]
      ? urlFor(listing.gallery[0]).width(1200).height(630).quality(85).url()
      : `${SITE_URL}/brand/og.jpeg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Vitta Group",
      locale: "es_UY",
      type: "website",
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

type PageProps = {
  params: Params;
};

function waHref(title: string) {
  const msg = `Hola, me interesa "${title}". ¿Me pasás más información?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function formatPrice(price: number | string, currency = "USD") {
  const value = typeof price === "number" ? price : Number(price);

  if (Number.isNaN(value)) return `${currency} ${price}`;

  try {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

function formatOperation(operation?: string) {
  if (!operation) return null;

  const map: Record<string, string> = {
    sale: "Venta",
    rent: "Alquiler",
    alquiler: "Alquiler",
    venta: "Venta",
  };

  return map[operation.toLowerCase()] ?? operation;
}

function formatKind(kind?: string) {
  if (!kind) return null;

  const map: Record<string, string> = {
    development: "Proyecto",
    property: "Propiedad",
  };

  return map[kind.toLowerCase()] ?? (kind.charAt(0).toUpperCase() + kind.slice(1));
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await client.fetch(listingBySlugQuery, { slug });

  if (!listing) {
    notFound();
  }

  const priceText =
    listing.priceMode === "amount"
      ? formatPrice(listing.price, listing.currency || "USD")
      : "Consultar";

  const canonicalUrl = `${SITE_URL}/propiedades/${slug}`;

  const imageUrls =
    listing.gallery
      ?.filter((img: any) => img?.asset)
      .map((img: any) => urlFor(img).width(1600).quality(85).url()) ?? [];

  const operationLabel = formatOperation(listing.operation);
  const kindLabel = formatKind(listing.kind);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description:
      listing.headline ||
      listing.summary ||
      "Propiedad publicada por Vitta Group.",
    url: canonicalUrl,
    image: imageUrls,
    brand: {
      "@type": "Brand",
      name: "Vitta Group",
    },
    offers:
      listing.priceMode === "amount"
        ? {
            "@type": "Offer",
            price: String(listing.price),
            priceCurrency: listing.currency || "USD",
            availability: "https://schema.org/InStock",
            url: canonicalUrl,
          }
        : {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: listing.currency || "USD",
            },
            availability: "https://schema.org/InStock",
            url: canonicalUrl,
          },
    additionalProperty: [
      listing.specs?.areaM2 != null
        ? {
            "@type": "PropertyValue",
            name: "Área",
            value: `${listing.specs.areaM2} m²`,
          }
        : null,
      listing.specs?.bedrooms != null
        ? {
            "@type": "PropertyValue",
            name: "Dormitorios",
            value: String(listing.specs.bedrooms),
          }
        : null,
      listing.specs?.bathrooms != null
        ? {
            "@type": "PropertyValue",
            name: "Baños",
            value: String(listing.specs.bathrooms),
          }
        : null,
      listing.locationText
        ? {
            "@type": "PropertyValue",
            name: "Ubicación",
            value: listing.locationText,
          }
        : null,
      listing.operation
        ? {
            "@type": "PropertyValue",
            name: "Operación",
            value: String(listing.operation),
          }
        : null,
      listing.kind
        ? {
            "@type": "PropertyValue",
            name: "Tipo de propiedad",
            value: String(listing.kind),
          }
        : null,
    ].filter(Boolean),
  };

  return (
    <main className="max-w-7xl mx-auto py-10 md:py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="mb-8 md:mb-10 space-y-4">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Vitta Group</span>
          {operationLabel && (
            <span className="rounded-full border border-border bg-card px-2.5 py-1 text-foreground">
              {operationLabel}
            </span>
          )}
          {kindLabel && (
            <span className="rounded-full border border-border bg-card px-2.5 py-1 text-foreground">
              {kindLabel}
            </span>
          )}
        </div>

        {listing.locationText && (
          <div className="text-sm text-muted-foreground">
            {listing.locationText}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
          {listing.title}
        </h1>

        {listing.headline && (
          <p className="max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {listing.headline}
          </p>
        )}
      </section>

      <div className="grid lg:grid-cols-[1.55fr_0.85fr] gap-8 xl:gap-10 items-start">
        <div className="space-y-8 min-w-0">
          <ListingGallery
            title={listing.title}
            items={listing.gallery ?? []}
            priority
          />

          {(listing.specs?.areaM2 ||
            listing.specs?.bedrooms ||
            listing.specs?.bathrooms) && (
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                Datos principales
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Superficie
                  </div>
                  <div className="mt-2 text-xl md:text-2xl font-semibold">
                    {listing.specs?.areaM2 ?? "—"}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">m²</div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Dormitorios
                  </div>
                  <div className="mt-2 text-xl md:text-2xl font-semibold">
                    {listing.specs?.bedrooms ?? "—"}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Baños
                  </div>
                  <div className="mt-2 text-xl md:text-2xl font-semibold">
                    {listing.specs?.bathrooms ?? "—"}
                  </div>
                </div>
              </div>
            </section>
          )}

          {listing.summary && (
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                Descripción
              </h2>
              <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {listing.summary}
                </p>
              </div>
            </section>
          )}

          {!!listing.features?.length && (
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                Características
              </h2>
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature: string) => (
                  <span
                    key={feature}
                    className="text-sm px-3.5 py-2 rounded-full border border-border bg-card text-foreground/90"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6 space-y-5">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Consulta rápida
              </div>
              <div className="text-3xl font-semibold text-primary">
                {priceText}
              </div>
              {listing.locationText && (
                <p className="text-sm text-muted-foreground">
                  {listing.locationText}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-background/30 p-3.5">
                <div className="text-xs text-muted-foreground">Operación</div>
                <div className="mt-1 font-medium">
                  {operationLabel ?? "Consultar"}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/30 p-3.5">
                <div className="text-xs text-muted-foreground">Tipo</div>
                <div className="mt-1 font-medium">
                  {kindLabel ?? "Propiedad"}
                </div>
              </div>
            </div>

            <a
              href={waHref(listing.title)}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-primary text-primary-foreground px-5 py-3.5 rounded-xl font-semibold transition hover:opacity-95"
            >
              Consultar por WhatsApp
            </a>

            <a
              href="/propiedades"
              className="block text-center border border-border px-5 py-3 rounded-xl transition hover:bg-muted/30"
            >
              Volver a propiedades
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-background/30 p-4 text-sm text-muted-foreground leading-relaxed">
            Atención y coordinación por WhatsApp. También podemos orientarte según zona, presupuesto o tipo de búsqueda.
          </div>
        </aside>
      </div>
    </main>
  );
}