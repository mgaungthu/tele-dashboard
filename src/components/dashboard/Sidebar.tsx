import Link from 'next/link';
import { LayoutDashboard, Users, Music, Disc } from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    label: 'Albums',
    href: '/dashboard/albums',
    icon: Disc,
  },
  {
  label: 'Tracks',
  href: '/dashboard/tracks',
  icon: Music, // lucide
  }
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white min-h-screen px-4 py-6 shadow-lg shadow-black/5">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-title">
          Telemusic
        </h1>
        <p className="text-xs text-body">
          Admin Dashboard
        </p>
      </div>

      {/* Menu */}
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-xl px-2 py-1
                       bg-gray-50 hover:bg-primary/10
                       shadow-sm hover:shadow-md
                       transition-all duration-200"
          >
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg
                            bg-primary/10 text-primary">
              <item.icon size={18} />
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-title">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}