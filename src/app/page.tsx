import Link from "next/link";
import Image from "next/image";

import Hero from "@/components/hero";
import { client } from "@/lib/sanity.client";
import { featuredListingsQuery } from "@/lib/sanity.queries";
import ListingCard from "@/components/listing-card";
import { urlFor } from "@/lib/sanity.image";

export const revalidate = 60;

function waHref(title?: string) {
  const msg = title
    ? `Hola, me interesa "${title}". ¿Me pasás más información?`
    : "Hola, quiero consultar por propiedades/inversiones con Vitta Group.";
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`;
}

function priceText(listing: any) {
  if (listing?.priceMode !== "amount" || !listing?.price) return "Consultar";

  const value =
    typeof listing.price === "number" ? listing.price : Number(listing.price);

  if (Number.isNaN(value))
    return `${listing.currency ?? "USD"} ${listing.price}`;

  try {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: listing.currency || "USD",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${listing.currency ?? "USD"} ${value}`;
  }
}
function opLabel(op?: string) {
  if (op === "sale") return "Venta";
  if (op === "rent") return "Alquiler";
  return "Consultar";
}

export default async function Home() {
  const featured = (await client.fetch(featuredListingsQuery)) ?? [];

  const heroListing = featured?.[0];
  const mainFeatured = featured?.[0];
  const cards = featured?.slice(1, 7) ?? [];

  const mainImage = mainFeatured?.heroImage?.asset
    ? urlFor(mainFeatured.heroImage).width(2000).quality(85).url()
    : null;

  return (
    <main>
      <Hero featured={heroListing} />

      {/* ✅ Destacados premium */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Vitta Group</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
              <span>Destacados</span>
            </div>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Propiedades destacadas
            </h2>

            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Oportunidades seleccionadas en Montevideo. Consultanos por
              WhatsApp para recibir información completa y asesoramiento.
            </p>
          </div>

          <Link
            href="/propiedades"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Ver todo →
          </Link>
        </div>

        {/* ✅ bloque principal grande */}
        {mainFeatured?.slug ? (
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <Link
              href={`/propiedades/${mainFeatured.slug}`}
              className="lg:col-span-8 group block rounded-2xl overflow-hidden border border-border bg-card"
            >
              <div className="relative h-[360px] sm:h-[420px]">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={mainFeatured?.title ?? "Propiedad destacada"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}

                {/* overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-full border border-white/15 bg-black/30 text-white/90 backdrop-blur">
                    {opLabel(mainFeatured.operation)}
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-full border border-white/15 bg-black/30 text-white/90 backdrop-blur">
                    {mainFeatured.locationText ?? "Montevideo"}
                  </span>
                </div>

                <div className="absolute bottom-0 p-6">
                  <div className="text-primary font-semibold">
                    {priceText(mainFeatured)}
                  </div>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                    {mainFeatured.title}
                  </h3>

                  {mainFeatured.headline && (
                    <p className="mt-2 text-sm text-white/80 max-w-2xl">
                      {mainFeatured.headline}
                    </p>
                  )}

                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                    Ver detalle <span aria-hidden>→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* ✅ columna CTA */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-sm text-muted-foreground">
                  ¿Querés asesoramiento?
                </div>
                <div className="mt-2 text-xl font-semibold">
                  Te respondemos por WhatsApp
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contanos qué buscás y te enviamos opciones compatibles.
                </p>

                <a
                  href={waHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold"
                >
                  Consultar por WhatsApp
                </a>

                <Link
                  href="/contacto"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-border bg-background/40 px-5 py-3"
                >
                  Ir a contacto
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-background/40 p-6">
                <div className="text-sm font-semibold">Tip</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Si querés invertir, indicá presupuesto aproximado y zona.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground mb-12">
            Todavía no hay propiedades destacadas publicadas.
          </div>
        )}

        {/* ✅ grid normal con ListingCard */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((listing: any) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/propiedades"
            className="rounded-xl border border-border bg-background/40 px-6 py-3 text-sm hover:border-primary/60 transition"
          >
            Ver todas las propiedades →
          </Link>
        </div>
      </section>
    </main>
  );
}
