"use client";

import { useState, useEffect, useRef } from "react";

export function FloatingContact() {
  const [isOpen, setIsOpen]       = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [form, setForm]           = useState({ name: "", email: "", message: "" });
  const [status, setStatus]       = useState<"idle" | "sending" | "success" | "error">("idle");
  const firstInputRef             = useRef<HTMLInputElement>(null);

  // Trigger entrance animation after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const open = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => setStatus("idle"), 300);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    const handler = () => open();
    document.addEventListener("open-contact-modal", handler);
    return () => document.removeEventListener("open-contact-modal", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstInputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      {/* ── Floating Action Button ────────────────────────────────────────── */}
      <div
        className="group fixed bottom-8 right-8 z-50 cursor-pointer"
        style={{
          width: 112,
          height: 112,
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "scale(1) translateY(0)"
            : "scale(0.6) translateY(20px)",
          transition:
            "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onClick={open}
        role="button"
        aria-label="Book a call"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && open()}
      >
        {/* Frosted glass backing ring — ensures text is legible on any bg */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,255,255,0.18)",
          }}
        />

        {/* Rotating circular "BOOK A CALL" text */}
        <svg
          viewBox="0 0 112 112"
          width="112"
          height="112"
          className="fab-spin absolute inset-0"
          aria-hidden="true"
        >
          <defs>
            <path
              id="fab-circle-path"
              d="M 56,56 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>

          {/* Dark stroke layer for contrast on light backgrounds */}
          <text
            fontSize="10.5"
            fontWeight="900"
            letterSpacing="2.8"
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          >
            <textPath href="#fab-circle-path" startOffset="0%">
              BOOK A CALL • BOOK A CALL •{" "}
            </textPath>
          </text>

          {/* Main white text */}
          <text
            fontSize="10.5"
            fontWeight="900"
            letterSpacing="2.8"
            fill="#ffffff"
          >
            <textPath href="#fab-circle-path" startOffset="0%">
              BOOK A CALL • BOOK A CALL •{" "}
            </textPath>
          </text>
        </svg>

        {/* Center icon button */}
        <button
          aria-hidden="true"
          tabIndex={-1}
          className="absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white outline-none transition-transform duration-200 group-hover:scale-110"
          style={{
            background: "#C0392B",
            boxShadow:
              "0 0 0 3px rgba(192,57,43,0.35), 0 8px 28px rgba(192,57,43,0.55)",
          }}
        >
          {/* chat icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 h-7 w-7"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* ── Modal overlay ── */}
      {hasOpened && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fab-modal-title"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-300"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {/* Panel */}
          <div
            className="relative w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 sm:p-10"
            style={{
              maxHeight: "90vh",
              opacity: isOpen ? 1 : 0,
              transform: isOpen
                ? "scale(1) translateY(0)"
                : "scale(0.95) translateY(16px)",
            }}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close contact form"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Heading */}
            <h2
              id="fab-modal-title"
              className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl"
            >
              First chat is on us<span className="text-red-500">.</span>
            </h2>

            {/* ── Success state ── */}
            {status === "success" ? (
              <div className="mt-10 flex flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-zinc-900">Message sent!</p>
                <p className="text-sm text-zinc-500">We&apos;ll reach out soon.</p>
                <button
                  onClick={close}
                  className="mt-4 rounded-full bg-[#C0392B] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a93226]"
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
                <input
                  ref={firstInputRef}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="w-full rounded-2xl bg-zinc-100 px-5 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-300"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  autoComplete="email"
                  className="w-full rounded-2xl bg-zinc-100 px-5 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-300"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project…"
                  rows={5}
                  required
                  className="w-full resize-none rounded-2xl bg-zinc-100 px-5 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-300"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C0392B] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a93226] disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    {status !== "sending" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14m0 0-5-5m5 5-5 5" />
                      </svg>
                    )}
                  </button>

                  {status === "error" && (
                    <p role="alert" className="text-xs font-medium text-red-500">
                      Something went wrong — please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        .fab-spin {
          animation: fab-rotate 9s linear infinite;
        }
        @keyframes fab-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fab-spin { animation: none; }
        }
      `}</style>
    </>
  );
}