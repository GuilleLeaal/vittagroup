"use client";

import Image from "next/image";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { urlFor } from "@/lib/sanity.image";

type GalleryItem = {
  _key?: string;
  alt?: string;
  asset?: any;
};

export default function ListingGallery({
  title,
  items,
  priority = false,
}: {
  title: string;
  items: GalleryItem[];
  priority?: boolean;
}) {
  const images = useMemo(
    () => (items ?? []).filter((x) => !!x?.asset),
    [items]
  );

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!images.length) return;
    setActive((i) => Math.min(i, images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setActive((i) => (images.length ? (i + 1) % images.length : 0));
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((i) =>
      images.length ? (i - 1 + images.length) % images.length : 0
    );
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, next, prev]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const thumbsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = thumbsRef.current;
    if (!root) return;

    const el = root.querySelector<HTMLElement>(`[data-thumb="${active}"]`);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  if (!images.length) return null;

  const current = images[active];
  const canNavigate = images.length > 1;

  return (
    <div className="space-y-4 min-w-0">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-card
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Abrir galería"
        >
          <Image
            src={urlFor(current).width(1600).quality(85).url()}
            alt={current?.alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 900px"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {canNavigate && (
            <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/45 backdrop-blur px-3 py-1 text-xs text-white">
              {active + 1}/{images.length}
            </div>
          )}
        </button>

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-black/45 backdrop-blur px-3 py-2 text-white
                         transition hover:bg-black/60
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Imagen anterior"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-black/45 backdrop-blur px-3 py-2 text-white
                         transition hover:bg-black/60
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Imagen siguiente"
            >
              →
            </button>
          </>
        )}
      </div>

      {canNavigate && (
        <div
          ref={thumbsRef}
          className="flex w-full max-w-full min-w-0 gap-3 overflow-x-auto pb-1 overscroll-x-contain"
        >
          {images.map((img, i) => {
            const isActive = i === active;

            return (
              <button
                key={img._key ?? i}
                data-thumb={i}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "border-amber-500/70 ring-1 ring-amber-500/30"
                    : "border-border hover:border-amber-500/40",
                ].join(" ")}
                aria-label={`Imagen ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
              >
                <Image
                  src={urlFor(img).width(500).quality(70).url()}
                  alt={img?.alt ?? title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </button>
            );
          })}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${title}`}
        >
          <div
            className="relative w-full max-w-6xl max-h-[85svh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(current).width(2400).quality(90).url()}
              alt={current?.alt ?? title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1200px"
              priority
            />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur px-3 py-1 text-xs text-white/90">
                {active + 1}/{images.length}
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur px-3 py-2 text-sm text-white/90
                           transition hover:bg-black/55
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Cerrar
              </button>
            </div>

            {canNavigate && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-black/40 backdrop-blur px-3 py-2 text-white/90
                             transition hover:bg-black/55
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Imagen anterior"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-black/40 backdrop-blur px-3 py-2 text-white/90
                             transition hover:bg-black/55
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Imagen siguiente"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}