import Link from "next/link"

function waHref() {
  const msg = "Hola, quiero consultar por propiedades/inversiones con Vitta Group."
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-border bg-background">
      {/* top subtle gold divider */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-2">
              <div className="text-lg font-semibold tracking-tight">
                <span className="text-foreground">Vitta</span>{" "}
                <span className="text-amber-500">Group</span>
              </div>

              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                Negocios inmobiliarios en Montevideo. Compra, venta, alquiler e inversión con asesoramiento profesional.
              </p>
            </div>

            {/* Mobile: botones full width / Desktop: inline */}
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3 pt-1">
              <a
                href={waHref()}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir WhatsApp para consultar con Vitta Group"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 sm:py-2 text-sm font-semibold text-primary-foreground shadow-sm
                           hover:opacity-95 active:opacity-90
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/vittagroupuy"
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir Instagram de Vitta Group (@vittagroupuy)"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-border bg-background/60 px-4 py-3 sm:py-2 text-sm
                           hover:bg-muted/40 hover:border-amber-500/40
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition"
              >
                Instagram
              </a>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-3 text-xs text-muted-foreground leading-relaxed">
              <span className="text-amber-500/90 font-semibold">Nota:</span>{" "}
              No contamos con oficina física. Coordinación por WhatsApp.
            </div>
          </div>

          {/* Sections */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-sm font-semibold text-amber-500 tracking-wide">Secciones</div>

            {/* Mobile: 2 columnas para no alargar */}
            <nav aria-label="Secciones del sitio" className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-2">
              <FooterNavLink href="/" label="Inicio" hint="Home" />
              <FooterNavLink href="/propiedades" label="Propiedades" hint="Listado" />
              <FooterNavLink href="/servicios" label="Servicios" hint="Qué hacemos" />
              <FooterNavLink href="/contacto" label="Contacto" hint="Hablemos" />
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-sm font-semibold text-amber-500 tracking-wide">Contacto</div>

            <div className="grid gap-2">
              <ContactRow title="WhatsApp" value="+598 92 112 466" href="https://wa.me/59892112466" external />
              <ContactRow
                title="Instagram"
                value="@vittagroupuy"
                href="https://www.instagram.com/vittagroupuy"
                external
              />
            </div>

            <div className="rounded-xl border border-border bg-background/40 p-4 text-xs text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500/80 shrink-0" />
                <span>
                  Respondemos por WhatsApp. Si consultás por una propiedad, ideal incluir{" "}
                  <span className="text-foreground/80">zona</span>,{" "}
                  <span className="text-foreground/80">presupuesto</span> y{" "}
                  <span className="text-foreground/80">objetivo</span> (vivir / invertir).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border relative">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            © {year} <span className="text-foreground/80">Vitta Group</span> · Montevideo
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="opacity-70">Dominio:</span>
            <span className="font-medium text-foreground/80">vittagroup.uy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Link de navegación: fila completa clickeable + hint a la derecha + dot dorado */
function FooterNavLink({ href, label, hint }: { href: string; label: string; hint?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2
                 hover:bg-muted/30 hover:border-amber-500/30 transition
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="flex items-center gap-2 text-sm text-foreground/90 group-hover:text-amber-500 transition">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition" />
        {label}
      </span>

      {hint ? (
        <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/90">
          {hint}
        </span>
      ) : null}
    </Link>
  )
}

/** Contacto: fila completa clickeable para que no haya confusión + borde dorado en hover */
function ContactRow({
  title,
  value,
  href,
  external,
}: {
  title: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-background/50 px-4 py-3
                 hover:bg-muted/30 hover:border-amber-500/40 transition
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${title}: ${value}${external ? " (se abre en una nueva pestaña)" : ""}`}
    >
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="text-sm font-semibold text-foreground truncate">{value}</div>
      </div>

      <div className="text-xs text-amber-500/80 group-hover:text-amber-500">
        Abrir →
      </div>
    </a>
  )
}