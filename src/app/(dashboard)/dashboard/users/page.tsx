"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/table/DataTable";
import { TableRowActions } from "@/components/ui/table/TableRowActions";
import { usersApi } from "@/lib/endpoints/users.api";

type User = {
  id: number;
  name?: string;
  email: string;
  role: string;
  status: "active" | "blocked";
};

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "status",
    label: "Status",
    render: (row: User) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          row.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.status === "active" ? "Active" : "Blocked"}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (row: User) => (
      <TableRowActions
        id={row.id}
        viewHref={`/dashboard/users/${row.id}`}
      />
    ),
  },
];

export default function UsersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await usersApi.getUsers();
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Users
          </h1>
          <p className="text-sm text-slate-500">
            Manage all platform users
          </p>
        </div>

        <Link
          href="/dashboard/users/new"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add User
        </Link>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 font-medium text-slate-900">
          User List
        </div>

        {isLoading && (
          <div className="p-6 text-sm text-slate-500">
            Loading users...
          </div>
        )}

        {isError && (
          <div className="p-6 text-sm text-red-500">
            Failed to load users
          </div>
        )}

        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}