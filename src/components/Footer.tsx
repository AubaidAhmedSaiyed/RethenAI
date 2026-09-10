import { RethenLogoMark } from "./Nav";

export function Footer() {
  return (
    <footer className="border-t border-[var(--dark-border)] bg-[var(--dark-bg)]">
      {/* Brand block */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <RethenLogoMark size={30} dark />
              <span
                className="text-[var(--ivory)] font-semibold tracking-tight"
                style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
              >
                Rethen AI
              </span>
            </div>
            <p className="text-[14px] text-[var(--soft-gray)] font-light max-w-sm leading-relaxed mb-4">
              Infrastructure for the next generation of autonomous software.
            </p>
            <p className="text-[13px] leading-loose max-w-sm" style={{ color: "#3A4256" }}>
              Connect the execution.
              <br />
              Follow the work.
              <br />
              Understand the outcome.
            </p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-1.5">
            <p className="col-span-2 text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#3A4256" }}>
              Navigation
            </p>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-light py-0.5 transition-colors"
                style={{ color: "#5A6478" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{ borderColor: "#1A2030" }}
      >
        <p className="text-[11px] font-mono" style={{ color: "#3A4256" }}>
          © {new Date().getFullYear()} Rethen AI. All rights reserved.
        </p>
        <p className="text-[11px] font-mono" style={{ color: "#3A4256" }}>
          Infrastructure for autonomous software.
        </p>
      </div>
    </footer>
  );
}

const footerLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "Early access", href: "#early-access" },
];
