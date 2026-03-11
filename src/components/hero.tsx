import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanity.image"

function waHref() {
  const msg = "Hola, quiero consultar por propiedades/inversiones con Vitta Group."
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`
}

function waListingHref(title?: string) {
  const msg = `Hola, me interesa "${title ?? "esta propiedad"}". ¿Me pasás más información?`
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`
}

function formatPrice(n: any) {
  const num = typeof n === "number" ? n : Number(n)
  if (!Number.isFinite(num)) return null
  return new Intl.NumberFormat("es-UY").format(num)
}

function priceText(listing: any) {
  if (!listing) return ""
  if (listing?.priceMode === "amount" && listing?.price != null) {
    const formatted = formatPrice(listing.price)
    return formatted ? `${listing.currency} ${formatted}` : `${listing.currency} ${listing.price}`
  }
  return "Consultar"
}

export default function Hero({ featured }: { featured?: any }) {
  const img = featured?.heroImage

  const slug =
    typeof featured?.slug === "string"
      ? featured.slug
      : featured?.slug?.current ?? featured?.slug

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

      {img ? (
        <div className="absolute inset-0">
          <Image
            src={urlFor(img).width(2400).quality(85).url()}
            alt={featured?.title ?? "Vitta Group"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/70 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,190,80,0.10),transparent_50%)]" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      )}

      <div
        className="
          relative max-w-7xl mx-auto px-6
          flex items-center
          py-16 sm:py-14
          min-h-0
          sm:min-h-[calc(100dvh-72px)]
        "
      >
        <div className="w-full max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-background/55 backdrop-blur">
            <span className="font-semibold text-foreground">
              Vitta <span className="text-amber-500">Group</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-amber-500/70" />
            <span className="text-muted-foreground">Negocios Inmobiliarios · Montevideo</span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Inversiones inmobiliarias en Montevideo, con respaldo profesional
          </h1>

          <p className="mt-4 text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            Compra, venta y alquiler. Oportunidades seleccionadas y gestión transparente de principio a fin.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/propiedades"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold
                         hover:opacity-95 active:opacity-90
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Ver propiedades
            </Link>

            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-border bg-background/45 backdrop-blur px-6 py-3 text-sm
                         hover:bg-muted/35 hover:border-amber-500/40 transition
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Consultar por WhatsApp"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 max-w-2xl">
            <Chip>Compra</Chip>
            <Chip>Venta</Chip>
            <Chip>Alquiler</Chip>
            <Chip>Inversión</Chip>
            <Chip muted>Asesoramiento profesional</Chip>
          </div>

          {featured?.title && slug && (
            <div className="mt-6 rounded-2xl border border-border bg-card/55 backdrop-blur p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Destacado</div>
                  <div className="mt-1 text-base sm:text-lg font-semibold truncate">{featured.title}</div>
                  {featured.locationText && (
                    <div className="text-sm text-muted-foreground truncate">{featured.locationText}</div>
                  )}
                </div>

                <div className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap">
                  {priceText(featured)}
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/propiedades/${slug}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm
                             hover:bg-muted/30 hover:border-amber-500/40 transition
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Ver detalle
                </Link>

                <a
                  href={waListingHref(featured.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold
                             hover:opacity-95 active:opacity-90
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Consultar
                </a>
              </div>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
            </div>
          )}

          <div className="mt-10 hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
            Deslizá para ver destacados
          </div>
        </div>
      </div>
    </section>
  )
}

function Chip({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs backdrop-blur",
        muted ? "bg-muted/20 text-muted-foreground" : "bg-background/45 text-foreground/80",
      ].join(" ")}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500/60" />
      {children}
    </span>
  )
}