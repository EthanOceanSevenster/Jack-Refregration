"use client";

import { CircleAlert, CircleCheck, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { APPLIANCES, whatsappLink } from "@/lib/site";

const API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

/*
 * Where a filled-in form goes.
 *
 * "api" posts it to Django, which stores it and emails him. "whatsapp"
 * hands the same details to WhatsApp on his own number instead, for when
 * the site is up before the backend is. Set with NEXT_PUBLIC_CALLOUT_MODE;
 * anything other than whatsapp means the API.
 */
const MODE = process.env.NEXT_PUBLIC_CALLOUT_MODE === "whatsapp" ? "whatsapp" : "api";

type FieldErrors = Record<string, string[]>;

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors placeholder:text-gray-300 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

/**
 * The after-hours route.
 *
 * Phoning is still the main action everywhere else on this site; this is for
 * somebody whose fridge dies at nine at night and who does not want to leave
 * a voicemail. Short on purpose: name, number, what broke. Everything else
 * can be asked on the callback.
 */
export function CalloutForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const wa = whatsappLink("Hi Jack, my unit needs looking at.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setStatus("sending");
    setMessage(null);
    setErrors({});

    if (MODE === "whatsapp") {
      const appliance = APPLIANCES.find(
        (item) => item.value === String(data.get("appliance") ?? ""),
      );
      const lines = [
        "Hi Jack, I need a callout.",
        "",
        `Name: ${String(data.get("name") ?? "").trim()}`,
        `Number: ${String(data.get("phone") ?? "").trim()}`,
      ];
      const suburb = String(data.get("suburb") ?? "").trim();
      if (suburb) lines.push(`Where: ${suburb}`);
      if (appliance) lines.push(`Unit: ${appliance.label}`);
      const problem = String(data.get("problem") ?? "").trim();
      if (problem) lines.push(`Problem: ${problem}`);
      if (data.get("is_urgent") === "on") lines.push("It is not cooling at all.");

      const link = whatsappLink(lines.join("\n"));
      if (link) window.open(link, "_blank", "noopener");
      setStatus("sent");
      return;
    }

    try {
      const response = await fetch(`${API}/api/callouts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          suburb: String(data.get("suburb") ?? ""),
          appliance: String(data.get("appliance") ?? "fridge"),
          problem: String(data.get("problem") ?? ""),
          is_urgent: data.get("is_urgent") === "on",
        }),
      });

      if (response.ok) {
        setStatus("sent");
        return;
      }

      if (response.status === 400) {
        const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
        const fields: FieldErrors = {};
        for (const [key, value] of Object.entries(body)) {
          if (Array.isArray(value)) fields[key] = value.map(String);
        }
        setErrors(fields);
        setMessage("Please check the highlighted fields.");
      } else if (response.status === 429) {
        setMessage("Too many requests from this connection. Please phone instead.");
      } else {
        setMessage("Something went wrong on our side. Please phone instead.");
      }
    } catch {
      setMessage("Could not reach us. Please check your connection, or phone.");
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="core-card text-center">
        <CircleCheck className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Got it</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">
          {MODE === "whatsapp"
            ? "Your details are in a WhatsApp message to Jack. Press send in WhatsApp and he has it. If it is urgent, phone instead and it rings straight away."
            : "Your details are through. Jack will call you back. If it is urgent and you would rather not wait, phone instead and it rings straight away."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {message ? (
        <p className="flex items-start gap-2.5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {message}
        </p>
      ) : null}

      {/* One grid, not two stacked ones: the columns then share a single set
          of tracks and cannot drift apart. */}
      <div className="grid items-start gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field label="Your name" name="name" errors={errors} required>
          <input id="name" name="name" required className={inputClass} placeholder="Jane" />
        </Field>

        <Field
          label="Phone number"
          name="phone"
          errors={errors}
          required
          hint="So Jack can call you back."
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="082 123 4567"
          />
        </Field>

        <Field label="Suburb or town" name="suburb" errors={errors}>
          <input id="suburb" name="suburb" className={inputClass} placeholder="Where you are" />
        </Field>

        <Field label="What needs looking at" name="appliance" errors={errors}>
          <select id="appliance" name="appliance" defaultValue="fridge" className={inputClass}>
            {APPLIANCES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="What is it doing"
        name="problem"
        errors={errors}
        hint="Noises, water, warm inside, anything you have noticed."
      >
        <textarea id="problem" name="problem" rows={4} className={inputClass} />
      </Field>

      {/* Sorts the morning. Somebody with no cooling at all is losing food. */}
      <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
        <input type="checkbox" name="is_urgent" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" />
        <span>
          <span className="font-medium">It is not cooling at all.</span>{" "}
          <span className="text-gray-600">Tick this and Jack calls you first.</span>
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary w-full disabled:opacity-60 sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === "sending"
          ? "Sending..."
          : MODE === "whatsapp"
            ? "Send on WhatsApp"
            : "Send my details"}
        </button>

        {/* If our server is having a bad day, the customer should still reach
            him. This is the same message, sent the way he already works. */}
        {message && wa ? (
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full sm:w-auto">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Send on WhatsApp instead
          </a>
        ) : null}
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        Your details are used to call you back about this job and nothing else.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  errors,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  errors: FieldErrors;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  const fieldErrors = errors[name];
  return (
    /*
     * Label, then input, then hint.
     *
     * The hint used to sit between the label and the input, which pushed one
     * input half a line below the one next to it and made the whole form look
     * crooked. Everything above the input is now one line high, so every
     * input in a row starts on the same baseline.
     */
    <div className="flex flex-col">
      <div className="flex h-6 items-baseline justify-between gap-3">
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
        {!required ? (
          <span className="text-xs text-gray-500">Optional</span>
        ) : null}
      </div>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
      {fieldErrors?.length ? (
        <p className="mt-2 text-sm font-medium text-red-600">{fieldErrors[0]}</p>
      ) : null}
    </div>
  );
}
