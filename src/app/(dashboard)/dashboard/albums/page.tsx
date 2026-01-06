'use client';

import Link from 'next/link';
import { Plus, Disc } from 'lucide-react';

import { DataTable } from '@/components/ui/table/DataTable';
import { useQuery } from '@tanstack/react-query';
import { albumsApi } from '@/lib/endpoints/album.api';

const columns = [
  {
    key: 'title',
    label: 'Album',
  },
  {
    key: 'artist',
    label: 'Artist',
    render: (row: any) => row.artist?.name || '—',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'tracksCount',
    label: 'Tracks',
    render: (row: any) => row.tracksCount ?? 0,
  },
  {
    key: 'status',
    label: 'Status',
  },
];

export default function AlbumsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const res = await albumsApi.getAlbums();
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Albums
          </h1>
          <p className="text-sm text-slate-500">
            Manage all music albums
          </p>
        </div>

        <Link
          href="/dashboard/albums/new"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Album
        </Link>
      </div>

      {/* Content */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 font-medium text-slate-900">
          Album List
        </div>

        {isLoading && (
          <div className="p-6 text-sm text-slate-500">
            Loading albums...
          </div>
        )}

        {isError && (
          <div className="p-6 text-sm text-red-500">
            Failed to load albums
          </div>
        )}

        {data && (
          <DataTable
            columns={columns}
            data={data}
          />
        )}
      </div>
    </div>
  );
}