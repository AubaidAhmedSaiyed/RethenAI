"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function EarlyAccess() {
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      company: formData.get("company"),
      building: formData.get("building"),
      hardest: formData.get("hardest") || "",
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState("success");
        formRef.current?.reset();
      } else {
        setFormState("error");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      setFormState("error");
    }
  }

  return (
    <section
      id="early-access"
      className="py-24 px-6 border-t border-[var(--dark-border)] bg-[var(--dark-bg)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left copy */}
          <div>
            <p className="chip border-[var(--dark-border)] text-[var(--soft-gray)] mb-6">Early access</p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-tight tracking-tight text-[var(--ivory)] mb-4">
              Know what your agents did.
            </h2>
            <p className="text-[18px] text-[var(--soft-gray)] font-light leading-relaxed mb-8">
              Follow the work. Understand the outcome.
            </p>

            <div className="flex flex-col gap-3">
              {[
                "Early access to the investigation interface",
                "Ability to connect your agent workflows",
                "Direct conversations with the team building Rethen",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                  <p className="text-[14px] text-[var(--soft-gray)] font-light leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="border border-[var(--dark-border)] p-8 bg-[var(--dark-surface)]">
            {formState === "success" ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border border-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[var(--accent)] text-sm">✓</span>
                </div>
                <p className="text-[var(--ivory)] text-[15px] font-medium mb-2">
                  Request received.
                </p>
                <p className="text-[var(--soft-gray)] text-[13px] font-light">
                  We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <FormField
                  id="email"
                  label="Work email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
                <FormField
                  id="company"
                  label="Company"
                  type="text"
                  placeholder="Your company name"
                  required
                />
                <FormField
                  id="building"
                  label="What are you building with agents?"
                  type="textarea"
                  placeholder="Describe what you're working on..."
                  required
                />
                <FormField
                  id="hardest"
                  label="What is hardest to understand today? (optional)"
                  type="textarea"
                  placeholder="What visibility gaps are most painful..."
                />

                {formState === "error" && (
                  <p className="text-red-400 text-[12px] font-mono text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="mt-2 px-5 py-3 bg-[var(--accent)] text-white text-[13px] font-medium hover:bg-[var(--accent-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "submitting" ? "Sending..." : "Request early access"}
                </button>

                <p className="text-[10px] font-mono text-center" style={{ color: "#3A4256" }}>
                  No spam. We read every submission.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  type,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required?: boolean;
}) {
  const baseClass =
    "w-full bg-[var(--dark-bg)] border border-[var(--dark-border)] text-[var(--ivory)] placeholder-[#3A4256] text-[13px] font-light px-4 py-2.5 focus:outline-none focus:border-[var(--accent)] transition-colors";

  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-mono text-[var(--soft-gray)] mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
