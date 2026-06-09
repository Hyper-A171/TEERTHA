'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, Input, Button } from '@/components/ui';
import { AlertCircle, Landmark, Lightbulb, LogIn } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const errorParam = searchParams.get('error');

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState(errorParam === 'CredentialsSignin' ? 'Invalid email or password' : '');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setErrorMsg('An unexpected login error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-maroon-950 shadow-sm">
          <Landmark className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-wide text-stone-900 dark:text-white">Sign In to Teertha</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">Enter credentials to manage listings and access portal dashboards</p>
      </div>

      <Card className="border border-stone-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Input
            label="Email Address"
            id="email"
            type="email"
            required
            placeholder="e.g. admin@teertha.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Account Password"
            id="password"
            type="password"
            required
            placeholder="********"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <Button type="submit" variant="primary" disabled={loading} className="w-full py-3">
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Access Account</span>
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 border-t border-stone-100 pt-4 text-center dark:border-neutral-800/40">
          <p className="text-xs text-stone-500">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-bold text-amber-600 hover:text-amber-500 hover:underline">Create Account</Link>
          </p>
        </div>
      </Card>

      <Card className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center text-[11px] leading-relaxed text-amber-800 dark:text-amber-400">
        <Lightbulb className="mx-auto mb-2 h-4 w-4" />
        <strong>Default Seed Accounts:</strong>
        <br />
        Super Admin: <code className="rounded bg-amber-500/10 px-1 select-all">admin@teertha.com</code> | Password: <code className="rounded bg-amber-500/10 px-1 select-all">admin123</code>
        <br />
        Staff Admin: <code className="rounded bg-amber-500/10 px-1 select-all">staff@teertha.com</code> | Password: <code className="rounded bg-amber-500/10 px-1 select-all">admin123</code>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-stone-50 px-4 py-12 dark:bg-neutral-950 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="space-y-4 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-maroon-800 border-t-transparent" />
            <p className="text-xs text-stone-500">Loading auth form...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
