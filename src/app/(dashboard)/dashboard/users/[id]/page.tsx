

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { usersApi } from "@/lib/endpoints/users.api";

type UserStatus = "active" | "blocked";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await usersApi.getUser(id);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading user detail...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-sm text-red-500">
        Failed to load user detail
      </div>
    );
  }

  const statusColor =
    data.status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  const isBlocked = data.status === "blocked";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/users"
            className="rounded-md border border-slate-200 bg-white p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              User Detail
            </h1>
            <p className="text-sm text-slate-500">
              View user information
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/users/${id}/edit`)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2
                       text-sm font-medium text-white hover:bg-blue-700"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium
              ${isBlocked
                ? "border-green-600 text-green-700 bg-green-50 hover:bg-green-100"
                : "border-red-600 text-red-700 bg-red-50 hover:bg-red-100"
              }
            `}
            // No mutation yet
            type="button"
          >
            {isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-medium text-slate-900">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
            <InfoItem label="Name" value={data.name || "-"} />
            <InfoItem label="Email" value={data.email} />
            <InfoItem label="Role" value={data.role} />
            <InfoItem
              label="Status"
              value={
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
                >
                  {data.status === "active" ? "Active" : "Blocked"}
                </span>
              }
            />
          </div>
        </div>

        {/* Artist Info */}
        {data.role === "artist" && data.artistProfile && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-medium text-slate-900">
              Artist Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
              <InfoItem
                label="Artist Name"
                value={data.artistProfile.artistName}
              />
              <InfoItem
                label="Genre"
                value={data.artistProfile.genre?.name || "-"}
              />
              <InfoItem
                label="Country"
                value={data.artistProfile.country?.name || "-"}
              />
              <InfoItem
                label="City"
                value={data.artistProfile.city?.name || "-"}
              />
            </div>

            {data.artistProfile.bio && (
              <div className="mt-4 text-sm">
                <div className="mb-1 font-medium text-slate-700">
                  Bio
                </div>
                <p className="text-slate-600">
                  {data.artistProfile.bio}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
 * Small helper component
 * ========================= */
function InfoItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-slate-500">
        {label}
      </div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}