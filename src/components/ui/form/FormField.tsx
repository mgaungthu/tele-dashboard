type FormFieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
};

export function FormField({ label, required, hint, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {hint && (
        <p className="mt-1 text-xs text-slate-400">
          {hint}
        </p>
      )}
    </div>
  );
}