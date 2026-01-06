'use client';

import React from 'react';
import { ArrowLeft, Save, Music } from 'lucide-react';
import Link from 'next/link';

export default function TrackDetailPage() {
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
              Track Detail
            </h1>
            <p className="text-sm text-slate-500">
              View and edit track information
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Save size={16} />
          Save Changes
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
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Title
              </label>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="Ehsaas"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Artist
              </label>
              <input
                className="w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm"
                defaultValue="Artist One"
                disabled
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Album
              </label>
              <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option>First Album</option>
                <option>Second Album</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Status
              </label>
              <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option>Published</option>
                <option>Draft</option>
                <option>Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload & Processing */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-slate-900">
              Upload & Processing
            </h2>

            <button
              type="button"
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Upload File
            </button>
          </div>

          {/* Status */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Current Status
            </span>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              Processing
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="mb-1 flex justify-between text-xs text-slate-500">
              <span>Progress</span>
              <span>65%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          {/* File Info */}
          <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-3">
            <div>
              <span className="block text-xs text-slate-500">
                File Name
              </span>
              ehsaas_final.mp3
            </div>
            <div>
              <span className="block text-xs text-slate-500">
                File Size
              </span>
              8.4 MB
            </div>
            <div>
              <span className="block text-xs text-slate-500">
                Format
              </span>
              MP3 (320kbps)
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-medium text-slate-900">
            Track Stats
          </h2>

          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex justify-between">
              <span>Streams</span>
              <span className="font-medium">12,034</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>3:45</span>
            </div>
            <div className="flex justify-between">
              <span>Format</span>
              <span>MP3</span>
            </div>
            <div className="flex justify-between">
              <span>Bitrate</span>
              <span>320kbps</span>
            </div>
            <div className="flex justify-between">
              <span>Created At</span>
              <span>2025-12-20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}