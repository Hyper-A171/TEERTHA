'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardContent, Input, Button, Badge } from '@/components/ui';
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const errorParam = searchParams.get('error');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState(
    errorParam === 'CredentialsSignin' ? 'Invalid email or password' : ''
  );
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
    } catch (err) {
      setErrorMsg('An unexpected login error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      
      {/* Decorative Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-maroon-950 text-xl font-bold mx-auto shadow-md">
          🪷
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-white tracking-wide">
          Sign In to Teertha
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Enter credentials to manage listings and access portal dashboards
        </p>
      </div>

      <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Input
              label="Email Address"
              id="email"
              type="email"
              required
              placeholder="e.g. admin@teertha.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              label="Account Password"
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Access Account</span>
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-neutral-800/40 text-center">
          <p className="text-xs text-stone-500">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-amber-600 hover:text-amber-500 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </Card>
      
      {/* Seed Hint Helper */}
      <Card className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed text-center">
        💡 <strong>Default Seed Accounts:</strong>
        <br />
        Super Admin: <code className="bg-amber-500/10 px-1 rounded select-all">admin@teertha.com</code> | Password: <code className="bg-amber-500/10 px-1 rounded select-all">admin123</code>
        <br />
        Staff Admin: <code className="bg-amber-500/10 px-1 rounded select-all">staff@teertha.com</code> | Password: <code className="bg-amber-500/10 px-1 rounded select-all">admin123</code>
      </Card>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-stone-50 dark:bg-neutral-950 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-t-transparent border-maroon-800 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-500">Loading auth form...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
