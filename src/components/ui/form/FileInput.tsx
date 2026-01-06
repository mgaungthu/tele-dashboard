type FileInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function FileInput(props: FileInputProps) {
  return (
    <input
      type="file"
      {...props}
      className="block w-full text-sm text-slate-600
                 file:mr-4 file:rounded-md file:border-0
                 file:bg-slate-200 file:px-4 file:py-2
                 file:text-sm file:font-medium file:text-slate-700
                 hover:file:bg-slate-300"
    />
  );
}