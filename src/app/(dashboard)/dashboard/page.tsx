"use client";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-title text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="text-body text-sm">
          Overview of system activity
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs text-body">Total Users</p>
          <h2 className="text-title text-2xl font-bold mt-1">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs text-body">Total Artists</p>
          <h2 className="text-title text-2xl font-bold mt-1">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs text-body">Total Tracks</p>
          <h2 className="text-title text-2xl font-bold mt-1">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs text-body">Today Streams</p>
          <h2 className="text-title text-2xl font-bold mt-1">
            0
          </h2>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-title text-sm font-semibold">
            Recent Activity
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-body">
              <tr>
                <th className="px-6 py-3 text-left font-medium">
                  ID
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Type
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4 text-body">—</td>
                <td className="px-6 py-4 text-body">—</td>
                <td className="px-6 py-4 text-body">No data yet</td>
                <td className="px-6 py-4 text-body">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
