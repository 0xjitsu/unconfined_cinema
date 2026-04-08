import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cinema-gray-800 bg-cinema-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Logo + tagline — takes most space */}
          <div className="md:col-span-6">
            <Link
              href="/"
              className="font-display text-xl tracking-[0.15em] uppercase text-cinema-warm hover:text-cinema-gold transition-colors md:text-2xl"
            >
              The Unconfined Cinema
            </Link>
            <p className="mt-3 max-w-xs font-body text-xs leading-relaxed text-cinema-muted/60">
              Where Philippine Cinema Escapes the Screen
            </p>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-cinema-gold/60">
              Navigate
            </span>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              {[
                { href: "/#projects", label: "Projects" },
                { href: "/events", label: "Events" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs text-cinema-muted hover:text-cinema-gold transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-cinema-gold/60">
              Connect
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/unconfinedcinema/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-cinema-muted hover:text-cinema-gold transition-colors min-h-[44px] flex items-center"
                aria-label="Follow on Instagram"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@unconfinedcinema.com"
                className="font-mono text-xs text-cinema-muted hover:text-cinema-gold transition-colors min-h-[44px] flex items-center"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="h-px w-full bg-gradient-to-r from-cinema-gray-800 via-cinema-gray-800/50 to-transparent" aria-hidden="true" />
        </div>
        <div className="mt-6 flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <p className="font-mono text-[10px] text-cinema-muted/40">
            &copy; 2020–2026 The Unconfined Cinema. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-cinema-muted/30">
            Manila, Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
