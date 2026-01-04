export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg">
      {children}
    </div>
  );
}