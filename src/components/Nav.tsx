"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[#F2F4F7]/96 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo mark + wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <RethenLogoMark size={32} />
          <span
            className="text-[var(--charcoal)] font-semibold tracking-tight leading-none"
            style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
          >
            Rethen
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#use-cases">Use cases</NavLink>
          <NavLink href="#who-its-for">Who it&apos;s for</NavLink>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#early-access"
            className="px-4 py-2 text-[13px] font-medium border border-[var(--charcoal)] text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--ivory)] transition-colors duration-200"
          >
            Request early access
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-px bg-[var(--charcoal)] transition-all ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <div className={`w-5 h-px bg-[var(--charcoal)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-3 h-px bg-[var(--charcoal)] transition-all ${menuOpen ? "-rotate-45 -translate-y-[3px] w-5" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--ivory)] px-6 py-4 flex flex-col gap-4">
          <MobileNavLink href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</MobileNavLink>
          <MobileNavLink href="#use-cases" onClick={() => setMenuOpen(false)}>Use cases</MobileNavLink>
          <MobileNavLink href="#who-its-for" onClick={() => setMenuOpen(false)}>Who it&apos;s for</MobileNavLink>
          <Link
            href="#early-access"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2.5 text-sm font-medium border border-[var(--charcoal)] text-[var(--charcoal)] text-center"
          >
            Request early access
          </Link>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[13px] font-medium text-[var(--graphite)] hover:text-[var(--charcoal)] transition-colors duration-150"
    >
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-[15px] font-medium text-[var(--graphite)] hover:text-[var(--charcoal)] py-1"
    >
      {children}
    </a>
  );
}

/**
 * RethenLogoMark — faithful SVG recreation of the actual Rethen logo:
 * a bold geometric R with a sharp diagonal slash cutting through it.
 *
 * The mark has:
 * - Heavy vertical stem
 * - Round-top bowl on the right
 * - Angular leg kicking lower-right
 * - A thick diagonal band (darker) slicing from upper-left to lower-right
 *   creating negative-space cuts through the bowl and leg
 */
export function RethenLogoMark({
  size = 32,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) {
  const fill = dark ? "#F2F4F7" : "#0D1117";
  const bg = dark ? "#0D1117" : "#F2F4F7";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rethen logo"
    >
      {/* Square background with slight rounding — matches logo asset */}
      <rect width="100" height="100" rx="4" fill={bg} />

      {/* ── R LETTERFORM ── */}

      {/* Left vertical stem */}
      <rect x="16" y="12" width="15" height="76" fill={fill} />

      {/* Top horizontal crossbar + transition into bowl */}
      <rect x="16" y="12" width="48" height="14" fill={fill} />

      {/* Right bowl side — forms the bumped D shape */}
      <rect x="54" y="12" width="15" height="36" rx="0" fill={fill} />

      {/* Bowl bottom connector */}
      <rect x="16" y="40" width="53" height="14" fill={fill} />

      {/* Leg — kicks from mid-body down to lower right */}
      <polygon points="31,54 47,54 74,88 58,88" fill={fill} />

      {/* ── DIAGONAL SLASH ── */}
      {/*
        The slash is a thick diagonal band going from lower-left to upper-right.
        It cuts through the letter, creating exposed background (negative space).
        We render the full diagonal shape in the letter color,
        then cut through it with background-colored strips to create the gap.
      */}

      {/* Slash main band — upper portion (above the gap) */}
      <polygon points="10,58 24,44 80,16 66,30" fill={fill} />

      {/* Slash main band — lower portion (below the gap, into leg area) */}
      <polygon points="22,78 36,64 58,54 44,68" fill={fill} />

      {/* Negative-space gap in slash — the white cut that makes it look sliced */}
      <polygon points="15,68 27,52 74,22 62,38" fill={bg} />
    </svg>
  );
}
