type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:bg-slate-100 disabled:text-slate-500"
    />
  );
}