'use client';

import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('/login');
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  return (
    <header
      className="
        h-16 bg-white flex items-center justify-between px-6
        shadow-md shadow-black/5
      "
    >
      {/* Left: Page title */}
      <div>
        <h1 className="text-title text-sm font-semibold">
          Dashboard
        </h1>
        <p className="text-xs text-body">
          Admin overview
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* User avatar placeholder */}
        <div
          className="
            h-8 w-8 rounded-full
            bg-primary/10 text-primary
            flex items-center justify-center
            text-xs font-semibold
          "
        >
          A
        </div>

        <button
          onClick={handleLogout}
          className="
            text-sm font-medium text-red-600
            hover:underline
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}