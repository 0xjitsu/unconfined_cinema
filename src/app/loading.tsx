export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cinema-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-pulse rounded-full border border-cinema-gold/40" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-muted/60">
          Loading
        </span>
      </div>
    </div>
  );
}
