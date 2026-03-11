"use client";

import { useMemo, useState } from "react";
import ListingCard from "@/components/listing-card";

type Listing = any;

export default function ListingsGrid({ items }: { items: Listing[] }) {
  const [kind, setKind] = useState<"all" | "property" | "development">("all");
  const [op, setOp] = useState<"all" | "sale" | "rent">("all");

  const filtered = useMemo(() => {
    return (items ?? []).filter((x) => {
      const okKind = kind === "all" ? true : x.kind === kind;
      const okOp = op === "all" ? true : x.operation === op;
      return okKind && okOp;
    });
  }, [items, kind, op]);

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-border bg-card/80 p-4 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">Filtrar catálogo</div>

            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              <div className="flex flex-wrap gap-2">
                <Chip active={kind === "all"} onClick={() => setKind("all")}>
                  Todo
                </Chip>
                <Chip
                  active={kind === "property"}
                  onClick={() => setKind("property")}
                >
                  Propiedades
                </Chip>
                <Chip
                  active={kind === "development"}
                  onClick={() => setKind("development")}
                >
                  Proyectos
                </Chip>
              </div>

              <div className="hidden md:block h-8 w-px bg-border mx-1" />

              <div className="flex flex-wrap gap-2">
                <Chip active={op === "all"} onClick={() => setOp("all")}>
                  Todas
                </Chip>
                <Chip active={op === "sale"} onClick={() => setOp("sale")}>
                  Venta
                </Chip>
                <Chip active={op === "rent"} onClick={() => setOp("rent")}>
                  Alquiler
                </Chip>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground xl:text-right">
            <span className="font-medium text-foreground">{filtered.length}</span>{" "}
            resultado{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((listing: any) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="text-lg font-semibold">No encontramos resultados</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Probá ajustar los filtros para ver más propiedades disponibles.
          </p>
        </div>
      )}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "text-sm px-3.5 py-2 rounded-xl border transition",
        active
          ? "border-primary/50 bg-primary/15 text-foreground"
          : "border-border bg-background/35 text-foreground/85 hover:border-primary/50 hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}