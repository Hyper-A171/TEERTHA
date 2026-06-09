'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Input, Button } from '@/components/ui';
import { AlertCircle, CheckCircle2, Landmark, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed');
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch {
      setErrorMsg('An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-stone-50 px-4 py-12 dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-maroon-950 shadow-sm">
            <Landmark className="h-6 w-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-stone-900 dark:text-white">Create Teertha Account</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">Sign up to track spiritual activity and bookmark holy shrines</p>
        </div>

        <Card className="border border-stone-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
          {success ? (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm dark:bg-green-950/40 dark:text-green-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">Registration Successful!</h3>
              <p className="mx-auto max-w-xs text-xs text-stone-500 dark:text-stone-400">Your user profile has been created. We are redirecting you to the login screen now...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {errorMsg && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <Input
                label="Full Name"
                id="name"
                required
                placeholder="e.g. Rahul Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email Address"
                id="email"
                type="email"
                required
                placeholder="e.g. rahul@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              <Button type="submit" variant="primary" disabled={loading} className="w-full py-3">
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Creating Profile...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Register Profile</span>
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 border-t border-stone-100 pt-4 text-center dark:border-neutral-800/40">
            <p className="text-xs text-stone-500">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-amber-600 hover:text-amber-500 hover:underline">Sign In</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
