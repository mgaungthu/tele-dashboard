export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-indigo-600 py-2.5 text-white
                 font-semibold hover:bg-indigo-700 transition"
    >
      {children}
    </button>
  );
}