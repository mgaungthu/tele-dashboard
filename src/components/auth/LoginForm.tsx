'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { authService } from '@/services/auth.service';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(email, password);
      console.log('go to dashboard')
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm space-y-6"
    >
      {/* Brand */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-semibold text-lg text-amber-300">
          Telemusic Admin
        </span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500">
          Please enter your details
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <Input
          label="Email address"
          placeholder="admin@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Options */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" className="rounded" />
          Remember for 30 days
        </label>
        <a href="#" className="text-indigo-600 hover:underline">
          Forgot password
        </a>
      </div>

      {/* Button */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>

      {/* Footer */}
      <p className="text-sm text-center text-gray-500">
        Don’t have an account?{' '}
        <span className="text-indigo-600 font-medium cursor-pointer">
          Contact admin
        </span>
      </p>
    </form>
  );
}