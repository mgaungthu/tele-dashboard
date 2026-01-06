type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({ children, ...props }: SelectInputProps) {
  return (
    <select
      {...props}
      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}