"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cinema-black px-6">
      <h2 className="mb-4 font-display text-4xl font-light text-cinema-warm">
        Something went wrong
      </h2>
      <p className="mb-8 font-body text-cinema-muted">
        An unexpected error occurred.
      </p>
      <button
        onClick={reset}
        className="min-h-[44px] border border-cinema-gold/40 px-6 py-3 font-body text-sm uppercase tracking-[0.2em] text-cinema-gold transition-colors hover:bg-cinema-gold/10"
      >
        Try Again
      </button>
    </div>
  );
}
