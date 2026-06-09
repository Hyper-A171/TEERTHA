'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Select,
  Badge,
  TableSkeleton,
} from '@/components/ui';
import { Users, ShieldAlert, AlertCircle } from 'lucide-react';
import { getCachedData, setCachedData } from '@/lib/clientCache';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role_id: number;
  created_at: string;
  role: {
    id: number;
    name: string;
  };
}

export default function AdminUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const currentUserRole = (session?.user as any)?.role;
  const isSuperAdmin = currentUserRole === 'Super Admin';

  const fetchUsers = async () => {
    const cachedUsers = getCachedData('users');
    if (cachedUsers) {
      setUsers(cachedUsers);
      setLoading(false);
    } else {
      setLoading(true);
    }
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        setCachedData('users', data);
      } else {
        setErrorMsg('Failed to load users directory');
      }
    } catch (err) {
      setErrorMsg('Network error loading users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, roleId: string) => {
    if (!isSuperAdmin) {
      alert('Forbidden: Only Super Admin can change user roles.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_id: roleId }),
      });

      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update user role');
      }
    } catch (err) {
      alert('Connection error updating role');
    }
  };

  const roleOptions = [
    { value: 1, label: 'Super Admin' },
    { value: 2, label: 'Admin' },
    { value: 3, label: 'User' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-500" />
          <span>User Access Control</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Review portal registers and configure operational roles.
        </p>
      </div>

      {/* Super Admin Notice */}
      {!isSuperAdmin && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-amber-800 dark:text-amber-400 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">Staff Administrator View Only</h4>
            <p className="leading-normal">
              You are signed in as an **Admin**. While you can browse users, you do not have permission to modify roles. Changing user privileges requires **Super Admin** authorization.
            </p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Register Date</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead className="text-right">Modify Permission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-semibold text-stone-900 dark:text-white">
                  {u.name}
                </TableCell>
                <TableCell className="text-xs font-sans">
                  {u.email}
                </TableCell>
                <TableCell className="text-xs font-sans">
                  {new Date(u.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      u.role.name === 'Super Admin'
                        ? 'gold'
                        : u.role.name === 'Admin'
                        ? 'info'
                        : 'default'
                    }
                  >
                    {u.role.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end">
                  <div className="w-44">
                    <Select
                      options={roleOptions}
                      value={u.role_id}
                      disabled={!isSuperAdmin}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="h-8 py-0 px-2 text-xs"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-12 text-center border border-dashed border-stone-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900/40">
          <p className="text-stone-500">No user accounts found.</p>
        </div>
      )}

    </div>
  );
}
