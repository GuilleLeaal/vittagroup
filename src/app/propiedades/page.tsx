import { client } from "@/lib/sanity.client";
import { listingsQuery } from "@/lib/sanity.queries";
import ListingsGrid from "@/components/listings-grid";

export const revalidate = 60;

export default async function PropiedadesPage() {
  const listings = await client.fetch(listingsQuery);

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      <header className="mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Vitta Group</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
          <span>Propiedades</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Propiedades seleccionadas
        </h1>

        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Explorá oportunidades en Montevideo y consultanos por WhatsApp para
          recibir información completa, condiciones y asesoramiento.
        </p>
      </header>

      <ListingsGrid items={listings} />
    </main>
  );
}