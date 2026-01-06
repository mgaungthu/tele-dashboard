import * as React from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(function TextArea(
  { className = '', error, ...props },
  ref,
) {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        className={[
          'w-full rounded-md border px-3 py-2 text-sm',
          'border-slate-300 bg-white text-slate-900',
          'placeholder:text-slate-400',
          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : '',
          className,
        ].join(' ')}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
