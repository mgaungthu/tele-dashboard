interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full text-gray-500 rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}