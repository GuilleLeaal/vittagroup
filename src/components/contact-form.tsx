"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PHONE = "59892112466";

type Operation = "Compra" | "Venta" | "Alquiler" | "Inversión";

type FormState = {
  name: string;
  operation: Operation;
  budget: string;
  area: string;
  message: string;
};

type Touched = Partial<Record<keyof FormState, boolean>>;

function waLink(text: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

function validate(s: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!s.name.trim()) errors.name = "Ingresá tu nombre";
  if (!s.message.trim() || s.message.trim().length < 8) {
    errors.message = "Contanos un poco más (mínimo 8 caracteres)";
  }

  if (s.budget.length > 40) errors.budget = "Muy largo";
  if (s.area.length > 40) errors.area = "Muy largo";

  return errors;
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>({
    name: "",
    operation: "Compra",
    budget: "",
    area: "",
    message: "",
  });

  const [touched, setTouched] = useState<Touched>({});
  const errors = useMemo(() => validate(state), [state]);
  const isValid = Object.keys(errors).length === 0;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function onBlur(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  function buildMessage() {
    const lines = [
      "Hola, vengo desde la web de Vitta Group.",
      "",
      `Nombre: ${state.name}`,
      `Interés: ${state.operation}`,
    ];

    if (state.area.trim()) lines.push(`Zona / área: ${state.area.trim()}`);
    if (state.budget.trim()) lines.push(`Presupuesto: ${state.budget.trim()}`);

    lines.push("");
    lines.push(`Mensaje: ${state.message.trim()}`);

    return lines.join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // marcar todo como touched para mostrar errores
    setTouched({
      name: true,
      message: true,
      budget: true,
      area: true,
      operation: true,
    });

    if (!isValid) return;

    const msg = buildMessage();
    window.open(waLink(msg), "_blank", "noopener,noreferrer");

    // ✅ limpiar form
    setState({
      name: "",
      operation: "Compra",
      budget: "",
      area: "",
      message: "",
    });
    setTouched({});
  }

  const show = <K extends keyof FormState>(k: K) => !!touched[k] && !!errors[k];
  const err = <K extends keyof FormState>(k: K) =>
    show(k) ? errors[k] : undefined;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre" error={err("name")}>
          <Input
            value={state.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => onBlur("name")}
            placeholder="Tu nombre"
            className={
              show("name")
                ? "border-red-500/50 focus-visible:ring-red-500/30"
                : ""
            }
          />
        </Field>

        <Field label="Interés" error={err("operation")}>
          <select
            value={state.operation}
            onChange={(e) => set("operation", e.target.value as Operation)}
            onBlur={() => onBlur("operation")}
            className={[
              "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "hover:border-amber-500/30 transition",
            ].join(" ")}
          >
            <option>Compra</option>
            <option>Venta</option>
            <option>Alquiler</option>
            <option>Inversión</option>
          </select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Zona / área (opcional)" error={err("area")}>
          <Input
            value={state.area}
            onChange={(e) => set("area", e.target.value)}
            onBlur={() => onBlur("area")}
            placeholder="Ej: Pocitos, Carrasco, Centro..."
            className={
              show("area")
                ? "border-red-500/50 focus-visible:ring-red-500/30"
                : ""
            }
          />
        </Field>

        <Field label="Presupuesto (opcional)" error={err("budget")}>
          <Input
            value={state.budget}
            onChange={(e) => set("budget", e.target.value)}
            onBlur={() => onBlur("budget")}
            placeholder="Ej: USD 150.000 / UYU 45.000"
            className={
              show("budget")
                ? "border-red-500/50 focus-visible:ring-red-500/30"
                : ""
            }
          />
        </Field>
      </div>

      <Field label="Mensaje" error={err("message")}>
        <Textarea
          value={state.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => onBlur("message")}
          placeholder='Ej: "Me interesa invertir en un apartamento de 1–2 dormitorios. ¿Qué opciones tienen?"'
          rows={6}
          className={
            show("message")
              ? "border-red-500/50 focus-visible:ring-red-500/30"
              : ""
          }
        />
      </Field>

      <div className="rounded-2xl border border-border bg-background/40 p-4">
        <div className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/80 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Al enviar, se abre WhatsApp con el mensaje listo para enviar.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
        <Button type="submit" className="rounded-xl w-full sm:w-auto">
          Enviar por WhatsApp
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <label className="text-sm font-medium">{label}</label>

        {/* Reservo altura para que no “salte” el layout */}
        <span className="min-h-[16px] text-xs text-red-400">{error ?? ""}</span>
      </div>
      {children}
    </div>
  );
}
