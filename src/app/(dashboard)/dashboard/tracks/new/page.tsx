'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, Music, Plus } from 'lucide-react';
import Link from 'next/link';

import { FormField } from '@/components/ui/form/FormField';
import { TextInput } from '@/components/ui/form/TextInput';
import { SelectInput } from '@/components/ui/form/SelectInput';
import { MultiSelect } from '@/components/ui/form/MultiSelect';
import { FileInput } from '@/components/ui/form/FileInput';

export default function AddTrackPage() {
  const [featuringArtists, setFeaturingArtists] = useState<string[]>([]);
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/tracks"
            className="rounded-md border border-slate-200 bg-white p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Add Track
            </h1>
            <p className="text-sm text-slate-500">
              Create a new track and upload audio file
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus size={16} />
          Create Track
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Basic Info */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-slate-900">
            <Music size={18} />
            <h2 className="font-medium">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Title" required>
              <TextInput placeholder="Enter track title" />
            </FormField>

            <FormField label="Artist" required>
              <SelectInput>
                <option value="">Select artist</option>
                <option value="1">Artist One</option>
                <option value="2">Artist Two</option>
              </SelectInput>
            </FormField>

            <FormField label="Album">
              <SelectInput>
                <option value="">Select album</option>
                <option value="1">First Album</option>
                <option value="2">Second Album</option>
              </SelectInput>
            </FormField>

            <FormField label="Initial Status">
              <SelectInput>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </SelectInput>
            </FormField>

            <FormField label="Release Date">
              <TextInput type="date" />
            </FormField>

            <FormField label="Genre">
              <SelectInput>
                <option value="">Select genre</option>
                <option value="1">Pop</option>
                <option value="2">Hip Hop</option>
                <option value="3">Rock</option>
                <option value="4">Electronic</option>
              </SelectInput>
            </FormField>

            <FormField label="Duration (seconds)">
              <TextInput
                type="number"
                disabled
                placeholder="Auto-detected after upload"
              />
            </FormField>

          </div>
        </div>

        {/* Featuring Artists */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-medium text-slate-900">
            Featuring Artists
          </h2>
          <FormField
            label="Select Featuring Artists"
            hint="Optional — search and select multiple artists"
          >
            <MultiSelect
              options={[
                { label: 'Artist One', value: 1 },
                { label: 'Artist Two', value: 2 },
                { label: 'Artist Three', value: 3 },
                { label: 'Artist Fourth', value: 4 },
              ]}
              value={featuringArtists}
              onChange={setFeaturingArtists}
            />
          </FormField>
        </div>

        {/* Upload */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-slate-900">
              Upload Audio File
            </h2>

            <button
              type="button"
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <Upload size={14} />
              Choose File
            </button>
          </div>

          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            Supported formats: MP3, FLAC, WAV<br />
            Max size: 50MB
          </div>

          <div className="mt-4">
            <FormField label="Cover Image (optional)">
              <FileInput accept="image/*" />
            </FormField>
          </div>
        </div>

        {/* Right: Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-medium text-slate-900">
            Notes
          </h2>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Track will be saved as Draft by default</li>
            <li>• Audio will be processed after upload</li>
            <li>• You can edit details later</li>
          </ul>
        </div>
      </div>
    </div>
  );
}