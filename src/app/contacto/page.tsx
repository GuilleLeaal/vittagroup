import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contacto",
  description:
    "Consultas por compra, venta, alquiler e inversión inmobiliaria en Montevideo.",
};

function waHref() {
  const msg =
    "Hola, quiero consultar por propiedades/inversiones con Vitta Group.";
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`;
}

export default function ContactoPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 sm:py-12">
      {/* Header */}
      <header className="mb-8 sm:mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-background/55 backdrop-blur">
          <span className="font-semibold text-foreground">
            Vitta <span className="text-amber-500">Group</span>
          </span>
          <span className="h-1 w-1 rounded-full bg-amber-500/70" />
          <span className="text-muted-foreground">Contacto</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Contacto
        </h1>

        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Contanos qué buscás y te respondemos por WhatsApp. Atención y
          coordinación a convenir.
        </p>
      </header>

      <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        {/* Form */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-sm font-semibold">Formulario</div>
              <div className="text-xs text-muted-foreground">
                Te respondemos por WhatsApp.
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
              Respuesta rápida
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/25 to-transparent mb-5" />

          <ContactForm />
        </section>

        {/* Sidebar */}
        <aside>
          {/* Primary CTA (mobile-first) */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="text-sm text-muted-foreground">
              ¿Preferís directo?
            </div>
            <div className="mt-1 text-xl font-semibold">
              Consultanos por WhatsApp
            </div>

            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold
                         hover:opacity-95 active:opacity-90 transition
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Abrir WhatsApp
            </a>

            <div className="mt-3 text-xs text-muted-foreground">
              No contamos con oficina física. Coordinación por WhatsApp.
            </div>
          </div>

          {/* Channels */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-semibold">
              Canales <span className="text-amber-500">·</span>
            </h2>

            <div className="grid gap-2">
              <ContactRow
                title="WhatsApp"
                value="+598 92 112 466"
                href="https://wa.me/59892112466"
              />
              <ContactRow
                title="Instagram"
                value="@vittagroupuy"
                href="https://www.instagram.com/vittagroupuy"
              />
            </div>
          </div>

          {/* Tips */}

          <div className="rounded-2xl border border-border bg-background/40 p-6">
            <div className="text-sm font-semibold">Sugerencia</div>
            <p className="text-sm text-muted-foreground mt-2">
              Si ya tenés una propiedad vista, indicá el nombre (ej: “Casa
              Rambla”) para responder más rápido.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ContactRow({
  title,
  value,
  href,
}: {
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-background/50 px-4 py-3
                 hover:bg-muted/30 hover:border-amber-500/40 transition
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${title}: ${value} (se abre en una nueva pestaña)`}
    >
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="text-sm font-semibold text-foreground truncate">
          {value}
        </div>
      </div>
      <div className="text-xs text-amber-500/80 group-hover:text-amber-500">
        Abrir →
      </div>
    </a>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500/60" />
      {children}
    </span>
  );
}
