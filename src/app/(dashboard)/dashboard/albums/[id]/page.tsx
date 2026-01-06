'use client';

import { useQuery } from '@tanstack/react-query';
import { Music, Disc, Calendar } from 'lucide-react';
import Link from 'next/link';

import { DataTable } from '@/components/ui/table/DataTable';
import { albumsApi } from '@/lib/endpoints/album.api';
import { tracksApi } from '@/lib/endpoints/tracks.api';

const trackColumns = [
  { key: 'title', label: 'Title' },
  { key: 'duration', label: 'Duration' },
  { key: 'status', label: 'Status' },
];

export default function AlbumDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const albumId = Number(params.id);

  const {
    data: album,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () =>
      albumsApi.getAlbum(albumId).then(res => res.data),
  });

  const { data: tracks = [] } = useQuery({
    queryKey: ['album-tracks', albumId],
    queryFn: () =>
      tracksApi.getTracks({ albumId }).then(res => res.data),
    enabled: !!albumId,
  });

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-500">
        Failed to load album
      </div>
    );
  }

  if (isLoading || !album) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading album...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Album Header */}
      <div className="flex items-start gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-32 w-32 rounded-lg bg-slate-100 flex items-center justify-center">
          <Disc className="text-slate-400" size={48} />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            {album.title}
          </h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Music size={14} />
              {album.artist?.name}
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {album.releaseDate || '—'}
            </span>
          </div>
        </div>

        <Link
          href={`/dashboard/albums/${albumId}/edit`}
          className="rounded-md border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Edit Album
        </Link>
      </div>

      {/* Tracks Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Music size={18} />
            <span className="font-medium">Tracks in this Album</span>
          </div>

          <Link
            href={`/dashboard/tracks/new?albumId=${albumId}`}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
          >
            Add Track
          </Link>
        </div>

        <DataTable columns={trackColumns} data={tracks} />
      </div>
    </div>
  );
}