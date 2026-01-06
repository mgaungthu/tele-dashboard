'use client';

import React from 'react';
import Link from 'next/link';
import { Music, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { DataTable } from '@/components/ui/table/DataTable';
import { tracksApi } from '@/lib/endpoints/tracks.api';

import { TableRowActions } from '@/components/ui/table/TableRowActions';


const columns = [
  { key: 'title', label: 'Title' },
  { key: 'artist', label: 'Artist' },
  { key: 'album', label: 'Album' },
  { key: 'duration', label: 'Duration' },
  {
    key: 'streams',
    label: 'Streams',
    render: (row: any) => row.streams.toLocaleString(),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: any) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          row.status === 'Published'
            ? 'bg-green-100 text-green-700'
            : row.status === 'Draft'
            ? 'bg-slate-100 text-slate-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row: any) => (
      <TableRowActions
        id={row.id}
        viewHref={`/dashboard/tracks/${row.id}`}
      />
    ),
  },
];



export default function TracksPage() {
  
  const { data: tracks = [], isLoading , isError } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => tracksApi.getTracks().then(res => res.data),
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Tracks</h1>
          <p className="text-sm text-slate-500">
            Manage uploaded tracks and streaming status
          </p>
        </div>

        <Link
          href="/dashboard/tracks/new"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Track
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 p-4 text-slate-900">
          <Music size={18} />
          <span className="font-medium">Track List</span>
        </div>

        {isError && (
          <div className="p-6 text-sm text-red-500">
            Failed to load Tracks
          </div>
        )}


        {isLoading ? (
          <div className="p-6 text-sm text-slate-500">Loading tracks...</div>
        ) : (
          <DataTable columns={columns} data={tracks} />
        )}
      </div>
    </div>
  );
}