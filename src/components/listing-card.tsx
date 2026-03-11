import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

function kindLabel(kind?: string) {
  if (kind === "development") return "Proyecto";
  return "Propiedad";
}

function opLabel(op?: string) {
  if (op === "sale") return "Venta";
  if (op === "rent") return "Alquiler";
  return "Consultar";
}

function priceText(listing: any) {
  if (listing.priceMode !== "amount") return "Consultar";

  const value =
    typeof listing.price === "number" ? listing.price : Number(listing.price);

  if (Number.isNaN(value)) return `${listing.currency ?? "USD"} ${listing.price}`;

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

export default function ListingCard({ listing }: any) {
  return (
    <Link
      href={`/propiedades/${listing.slug}`}
      className="group block h-full"
      aria-label={`Ver detalle de ${listing.title}`}
    >
      <article
        className="h-full rounded-2xl overflow-hidden border border-border bg-card/90
                   transition duration-300 hover:border-primary/40 hover:-translate-y-1
                   hover:shadow-[0_24px_70px_-45px_rgba(0,0,0,0.95)]"
      >
        {listing.image?.asset && (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={urlFor(listing.image).width(1200).quality(85).url()}
              alt={listing.image?.alt ?? listing.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
              <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-black/45 text-white backdrop-blur">
                {kindLabel(listing.kind)}
              </span>

              <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-black/45 text-white backdrop-blur">
                {opLabel(listing.operation)}
              </span>
            </div>
          </div>
        )}

        <div className="p-5 md:p-6 space-y-3">
          {listing.locationText && (
            <div className="text-sm text-muted-foreground">
              {listing.locationText}
            </div>
          )}

          <h3 className="text-lg md:text-xl font-semibold leading-snug text-balance">
            {listing.title}
          </h3>

          {listing.headline && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {listing.headline}
            </p>
          )}

          {!!listing.features?.length && (
            <div className="flex flex-wrap gap-2 pt-1">
              {listing.features.slice(0, 3).map((feature: string) => (
                <span
                  key={feature}
                  className="text-xs px-2.5 py-1 rounded-full border border-border bg-background/40 text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          <div className="pt-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Precio
              </div>
              <div className="mt-1 text-lg md:text-xl font-semibold text-primary">
                {priceText(listing)}
              </div>
            </div>

            <div className="text-sm text-muted-foreground transition group-hover:text-foreground">
              Ver detalle →
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}