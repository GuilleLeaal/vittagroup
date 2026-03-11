import Link from "next/link"

export const metadata = {
  title: "Servicios",
  description:
    "Compra, venta, alquiler e inversión inmobiliaria en Montevideo con asesoramiento profesional.",
}

function waHref() {
  const msg =
    "Hola, quiero asesoramiento sobre compra/venta/alquiler o inversión inmobiliaria en Montevideo."
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`
}

export default function ServiciosPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 sm:py-12">
      {/* Header */}
      <header className="mb-10 sm:mb-12 space-y-5">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-background/55 backdrop-blur">
          <span className="font-semibold text-foreground">
            Vitta <span className="text-amber-500">Group</span>
          </span>
          <span className="h-1 w-1 rounded-full bg-amber-500/70" />
          <span className="text-muted-foreground">Servicios</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Asesoramiento inmobiliario con enfoque en inversión
        </h1>

        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Trabajamos oportunidades reales en Montevideo. Te acompañamos desde la búsqueda hasta la coordinación,
          negociación y cierre, con comunicación clara y criterios de selección profesionales.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-6 py-3 font-semibold
                       hover:opacity-95 active:opacity-90 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Consultar por WhatsApp
          </a>

          <Link
            href="/propiedades"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background/40 px-6 py-3
                       hover:bg-muted/25 hover:border-amber-500/40 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ver propiedades
          </Link>
        </div>

        {/* subtle divider */}
        <div className="pt-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
        </div>
      </header>

      {/* Services grid */}
      <section className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <ServiceCard
          title="Compra de propiedades"
          eyebrow="Para vivir o invertir"
          bullets={[
            "Búsqueda guiada según objetivo y presupuesto.",
            "Selección de oportunidades con criterio (rentabilidad / potencial).",
            "Coordinación de visitas y asesoramiento en el proceso.",
          ]}
        />

        <ServiceCard
          title="Venta de propiedades"
          eyebrow="Estrategia + ejecución"
          bullets={[
            "Estrategia de publicación y posicionamiento.",
            "Presentación profesional y filtro de interesados.",
            "Acompañamiento en negociación y cierre.",
          ]}
        />

        <ServiceCard
          title="Alquileres"
          eyebrow="Dueños e inquilinos"
          bullets={[
            "Asesoramiento para propietarios e inquilinos.",
            "Gestión de consultas y coordinación.",
            "Búsqueda alineada a necesidades reales.",
          ]}
        />

        <ServiceCard
          title="Inversión inmobiliaria"
          eyebrow="Enfoque recomendado"
          highlight
          bullets={[
            "Análisis de oportunidades para invertir en Montevideo.",
            "Enfoque en proyección, liquidez y riesgo.",
            "Recomendaciones claras según tu perfil.",
          ]}
        />
      </section>

      {/* Process */}
      <section className="mt-12 sm:mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8 relative overflow-hidden">
        {/* subtle gold top line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Cómo trabajamos</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              Un proceso simple y profesional para que la experiencia sea clara y eficiente.
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            Coordinación ágil por WhatsApp.
          </div>
        </div>

        <div className="mt-7 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Step n="1" title="Definimos objetivo" desc="Compra, venta, alquiler o inversión. Perfil y prioridades." />
          <Step n="2" title="Seleccionamos opciones" desc="Curaduría de oportunidades y comparación realista." />
          <Step n="3" title="Coordinamos y negociamos" desc="Visitas, consultas, propuesta y negociación." />
          <Step n="4" title="Cierre y seguimiento" desc="Acompañamiento final y próximos pasos." />
        </div>

        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-6 py-3 font-semibold
                       hover:opacity-95 active:opacity-90 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Hablar ahora por WhatsApp
          </a>

          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background/40 px-6 py-3
                       hover:bg-muted/25 hover:border-amber-500/40 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ir a contacto
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="mt-12 sm:mt-14 grid lg:grid-cols-3 gap-6 sm:gap-8">
        <InfoCard
          title="Comunicación clara"
          desc="Priorizamos transparencia y velocidad de respuesta. Coordinación por WhatsApp."
        />
        <InfoCard
          title="Selección profesional"
          desc="Menos ruido, más calidad. Curamos oportunidades para ahorrar tiempo y mejorar decisiones."
        />
        <InfoCard
          title="Montevideo"
          desc="Enfoque local, conocimiento del mercado y oportunidades alineadas a inversión."
        />
      </section>

      {/* CTA bottom */}
      <section className="mt-12 sm:mt-14 rounded-2xl border border-border bg-background/40 p-7 sm:p-10 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          ¿Buscás una oportunidad concreta?
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
          Contanos qué buscás y te enviamos opciones compatibles con tu objetivo.
        </p>

        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-7 py-3 font-semibold
                       hover:opacity-95 active:opacity-90 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Consultar por WhatsApp
          </a>

          <Link
            href="/propiedades"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background/40 px-7 py-3
                       hover:bg-muted/25 hover:border-amber-500/40 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ver catálogo
          </Link>
        </div>
      </section>
    </main>
  )
}

function ServiceCard({
  title,
  eyebrow,
  bullets,
  highlight,
}: {
  title: string
  eyebrow?: string
  bullets: string[]
  highlight?: boolean
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-border bg-card p-6 sm:p-7 relative overflow-hidden",
        "hover:border-amber-500/30 transition",
        highlight ? "border-amber-500/40" : "",
      ].join(" ")}
    >
      {highlight && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />
          <div className="absolute top-5 right-5 text-xs px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500">
            Recomendado
          </div>
        </>
      )}

      <div className="space-y-1 pr-16">
        {eyebrow && <div className="text-xs text-muted-foreground">{eyebrow}</div>}
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-500/18 to-transparent" />

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500/70 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/35 p-5 hover:border-amber-500/25 transition">
      <div className="text-xs text-muted-foreground">Paso {n}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</div>
    </div>
  )
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 hover:border-amber-500/25 transition">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
        <div className="font-semibold">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
    </div>
  )
}