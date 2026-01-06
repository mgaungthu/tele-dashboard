'use client';

import React, { useMemo, useState } from 'react';

type Option = {
  label: string;
  value: string | number;
};

type MultiSelectProps = {
  options: Option[];
  value?: string[];
  disabled?: boolean;
  onChange?: (values: string[]) => void;
};

export function MultiSelect({
  options,
  value = [],
  disabled,
  onChange,
}: MultiSelectProps) {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const toggleValue = (val: string) => {
    if (disabled) return;

    const next = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];

    onChange?.(next);
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white">
      {/* Search */}
      <div className="border-b border-slate-200 p-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          disabled={disabled}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-slate-100"
        />
      </div>

      {/* Options */}
      <div className="max-h-48 overflow-y-auto p-2">
        {filteredOptions.length === 0 && (
          <div className="p-2 text-sm text-slate-500">
            No results
          </div>
        )}

        {filteredOptions.map((opt) => {
          const stringValue = String(opt.value);
          const checked = value.includes(stringValue);

          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm
                hover:bg-slate-100
                ${disabled ? 'cursor-not-allowed opacity-60' : ''}
              `}
            >
              <input
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={() => toggleValue(stringValue)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600
                           focus:ring-blue-500"
              />
              <span className="text-slate-700">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}