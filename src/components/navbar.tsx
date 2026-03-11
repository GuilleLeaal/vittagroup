"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import "../app/globals.css";

function waHref() {
  const msg =
    "Hola, quiero consultar por propiedades/inversiones con Vitta Group.";
  return `https://wa.me/59892112466?text=${encodeURIComponent(msg)}`;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-navbar border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 min-h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Ir al inicio"
        >
          <Image
            src="/brand/logo-light.png"
            alt="Vitta Group"
            width={190}
            height={52}
            priority
            className="h-[50px] md:h-[80px] w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <DesktopNavItem href="/" active={isActive(pathname, "/")}>
            Inicio
          </DesktopNavItem>
          <DesktopNavItem
            href="/propiedades"
            active={isActive(pathname, "/propiedades")}
          >
            Propiedades
          </DesktopNavItem>
          <DesktopNavItem
            href="/servicios"
            active={isActive(pathname, "/servicios")}
          >
            Servicios
          </DesktopNavItem>
          <DesktopNavItem
            href="/contacto"
            active={isActive(pathname, "/contacto")}
          >
            Contacto
          </DesktopNavItem>

          <div className="ml-3">
            <Button asChild className="rounded-xl">
              <a href={waHref()} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] sm:w-[360px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center">
                  <Image
                    src="/brand/logo-light.png"
                    alt="Vitta Group"
                    width={170}
                    height={46}
                    className="h-[42px] w-auto"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="grid gap-2">
                  <MobileNavItem
                    href="/"
                    active={isActive(pathname, "/")}
                    onPick={() => setOpen(false)}
                  >
                    Inicio
                  </MobileNavItem>
                  <MobileNavItem
                    href="/propiedades"
                    active={isActive(pathname, "/propiedades")}
                    onPick={() => setOpen(false)}
                  >
                    Propiedades
                  </MobileNavItem>
                  <MobileNavItem
                    href="/servicios"
                    active={isActive(pathname, "/servicios")}
                    onPick={() => setOpen(false)}
                  >
                    Servicios
                  </MobileNavItem>
                  <MobileNavItem
                    href="/contacto"
                    active={isActive(pathname, "/contacto")}
                    onPick={() => setOpen(false)}
                  >
                    Contacto
                  </MobileNavItem>
                </div>

                <Separator />

                <Button asChild className="w-full rounded-xl">
                  <a href={waHref()} target="_blank" rel="noreferrer">
                    Consultar por WhatsApp
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground">
                  Atención y coordinación por WhatsApp.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function DesktopNavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active ? "text-foreground" : "text-foreground/72 hover:text-foreground",
      ].join(" ")}
    >
      {children}
      <span
        className={[
          "pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] rounded-full bg-amber-500/55 transition-all duration-200",
          active ? "w-8" : "w-0",
        ].join(" ")}
      />
    </Link>
  );
}

function MobileNavItem({
  href,
  children,
  onPick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onPick: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onPick}
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center justify-between w-full rounded-xl px-3 py-2.5 border transition",
        active
          ? "bg-muted/40 border-border text-foreground"
          : "border-transparent hover:bg-muted/30 text-foreground/85",
      ].join(" ")}
    >
      <span className="flex items-center gap-2">
        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            active ? "bg-amber-500" : "bg-amber-500/60",
          ].join(" ")}
        />
        <span className={active ? "font-medium" : undefined}>{children}</span>
      </span>

      <span className="text-xs text-muted-foreground">Ir →</span>
    </Link>
  );
}
