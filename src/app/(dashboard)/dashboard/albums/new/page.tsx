'use client';

import Link from 'next/link';
import { ArrowLeft, ImagePlus } from 'lucide-react';

import { FormField } from '@/components/ui/form/FormField';
import { TextInput } from '@/components/ui/form/TextInput';
import { SelectInput } from '@/components/ui/form/SelectInput';
import { TextArea } from '@/components/ui/form/TextArea';


export default function CreateAlbumPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ArrowLeft size={14} />
            <Link href="/dashboard/albums">Back to Albums</Link>
          </div>

          <h1 className="mt-2 text-xl font-semibold text-slate-900">
            Create Album
          </h1>
          <p className="text-sm text-slate-500">
            Add a new album or release
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-medium text-slate-900">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="Album Title" required>
                <TextInput placeholder="Enter album title" />
              </FormField>

              <FormField label="Primary Artist" required>
                <SelectInput>
                  <option value="">Select artist</option>
                  <option value="1">Artist One</option>
                  <option value="2">Artist Two</option>
                </SelectInput>
              </FormField>

              <FormField label="Album Type">
                <SelectInput>
                  <option value="album">Album</option>
                  <option value="ep">EP</option>
                  <option value="single">Single</option>
                </SelectInput>
              </FormField>

              <FormField label="Status">
                <SelectInput>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </SelectInput>
              </FormField>

              <FormField label="Release Date">
                <TextInput type="date" />
              </FormField>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-medium text-slate-900">
              Description
            </h2>

            <FormField label="Album Description">
              <TextArea rows={4} placeholder="Optional description" />
            </FormField>
          </div>
        </div>

        {/* Right: Side Panel */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-medium text-slate-900">
              Album Cover
            </h2>

            <div className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-slate-400">
              <ImagePlus size={32} />
              <span className="mt-2 text-sm">
                Upload cover image
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex gap-3">
              <button
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Create Album
              </button>

              <Link
                href="/dashboard/albums"
                className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
