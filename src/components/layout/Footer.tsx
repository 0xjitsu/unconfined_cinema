import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cinema-gray-800 bg-cinema-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-sm tracking-[0.2em] uppercase text-cinema-warm hover:text-cinema-gold transition-colors"
          >
            The Unconfined Cinema
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/theunconfinedcinema"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.15em] text-cinema-muted hover:text-cinema-gold transition-colors min-h-[44px] flex items-center"
              aria-label="Follow on Instagram"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@unconfinedcinema.com"
              className="font-mono text-xs uppercase tracking-[0.15em] text-cinema-muted hover:text-cinema-gold transition-colors min-h-[44px] flex items-center"
            >
              Email
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-cinema-muted/60">
            &copy; 2020–2026 The Unconfined Cinema. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
