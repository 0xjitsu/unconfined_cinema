import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cinema-black px-6">
      <span className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
        404
      </span>
      <h2 className="mb-4 font-display text-4xl font-light text-cinema-warm">
        This screening has ended
      </h2>
      <p className="mb-8 font-body text-cinema-muted">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="min-h-[44px] border border-cinema-gold/40 px-6 py-3 font-body text-sm uppercase tracking-[0.2em] text-cinema-gold transition-colors hover:bg-cinema-gold/10 flex items-center"
      >
        Return Home
      </Link>
    </div>
  );
}
