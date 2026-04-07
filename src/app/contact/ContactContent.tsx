"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const typeOptions = [
  { value: "commission", label: "Commission a Project" },
  { value: "attend", label: "Attend an Event" },
  { value: "collaborate", label: "Join the Collective" },
  { value: "other", label: "Other" },
];

export function ContactContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") ?? "commission";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      type: form.get("type") as string,
      message: form.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-cinema-black pt-32">
        <div className="text-center">
          <h2 className="font-display text-4xl font-light text-cinema-warm">
            Thank you
          </h2>
          <p className="mt-4 font-body text-cinema-muted">
            We'll be in touch soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cinema-black pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left column — intro text */}
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <SectionReveal>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                Get in Touch
              </span>
              <h1 className="mb-4 font-display text-5xl font-light tracking-tight text-cinema-warm md:text-6xl">
                Contact
              </h1>
              <p className="mb-8 font-body text-cinema-muted">
                Whether you want to commission a project, attend an event, or join
                the collective — we'd love to hear from you.
              </p>
              <div className="hidden space-y-4 md:block">
                <div className="h-px w-full bg-cinema-gray-800" aria-hidden="true" />
                <a
                  href="mailto:hello@unconfinedcinema.com"
                  className="block font-mono text-xs text-cinema-muted hover:text-cinema-gold transition-colors"
                >
                  hello@unconfinedcinema.com
                </a>
                <a
                  href="https://instagram.com/theunconfinedcinema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-xs text-cinema-muted hover:text-cinema-gold transition-colors"
                >
                  @theunconfinedcinema
                </a>
              </div>
            </SectionReveal>
          </div>

          {/* Right column — form */}
          <div className="md:col-span-7">

        <SectionReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-cinema-muted"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-b border-cinema-gray-800 bg-transparent px-0 py-3 font-body text-cinema-warm outline-none transition-colors focus:border-cinema-gold placeholder:text-cinema-muted/40"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-cinema-muted"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-b border-cinema-gray-800 bg-transparent px-0 py-3 font-body text-cinema-warm outline-none transition-colors focus:border-cinema-gold placeholder:text-cinema-muted/40"
                placeholder="your@email.com"
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-cinema-muted"
              >
                I'm interested in
              </label>
              <select
                id="type"
                name="type"
                defaultValue={initialType}
                aria-label="Interest type"
                className="w-full border-b border-cinema-gray-800 bg-transparent px-0 py-3 font-body text-cinema-warm outline-none transition-colors focus:border-cinema-gold"
              >
                {typeOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-cinema-black"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-cinema-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none border-b border-cinema-gray-800 bg-transparent px-0 py-3 font-body text-cinema-warm outline-none transition-colors focus:border-cinema-gold placeholder:text-cinema-muted/40"
                placeholder="Tell us about your project or interest..."
              />
            </div>

            {/* Error */}
            {error && (
              <p className="font-body text-sm text-red-400" role="alert">{error}</p>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-h-[44px] items-center justify-center border border-cinema-gold/40 px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-cinema-gold transition-colors hover:bg-cinema-gold/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </SectionReveal>

          </div>
        </div>
      </div>
    </div>
  );
}
