'use client';

import Link from 'next/link';
import { Eye, Ban } from 'lucide-react';

type TableRowActionsProps = {
  id: number;
  viewHref: string;
};

export function TableRowActions({ id, viewHref }: TableRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={viewHref}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
        title="View / Edit"
      >
        <Eye size={16} />
      </Link>

      <button
        type="button"
        className="rounded-md p-2 text-red-600 hover:bg-red-50"
        onClick={() => console.log('Block', id)}
        title="Block"
      >
        <Ban size={16} />
      </button>
    </div>
  );
}