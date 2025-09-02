export default function CircleLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-block h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white ${className}`} />
  );
}
