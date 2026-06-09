'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Users, Church, FolderTree, History, RefreshCw, Activity, Calendar } from 'lucide-react';

interface StatsData {
  totalUsers: number;
  totalTemples: number;
  totalCategories: number;
  totalLogs: number;
  recentLogs: Array<{
    id: number;
    action: string;
    created_at: string;
    user: {
      name: string;
      email: string;
    };
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Custom SVG Bar Chart Mock data
  const chartData = [
    { label: 'Mon', value: 34 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 65 },
    { label: 'Thu', value: 55 },
    { label: 'Fri', value: 89 },
    { label: 'Sat', value: 92 },
    { label: 'Sun', value: 78 },
  ];

  const maxVal = Math.max(...chartData.map((d) => d.value));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-2 border-t-transparent border-maroon-800 dark:border-gold-500 rounded-full animate-spin" />
        <p className="text-xs text-stone-500 dark:text-stone-400">Loading admin statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Title & Refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 dark:text-white">
            Administrative Dashboard
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Real-time analytics and controls for Teertha directory portal.
          </p>
        </div>
        
        <button
          onClick={fetchStats}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* 1. STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Users */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Users</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{stats?.totalUsers || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Total Temples */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Shrines</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{stats?.totalTemples || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Church className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Total Categories */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Circuits</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{stats?.totalCategories || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <FolderTree className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Total Logs */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">System Logs</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{stats?.totalLogs || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 2. SPLIT CHARTS & LOGS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SVG Activity Chart (Left 2 columns) */}
        <Card className="lg:col-span-2 border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardHeader className="pb-2 border-b border-stone-100 dark:border-neutral-800/40 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Activity Metrics</CardTitle>
              <p className="text-xs text-stone-400">Weekly portal interaction trends (visits/clicks)</p>
            </div>
            <Activity className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent className="p-6">
            
            {/* Custom SVG Chart */}
            <div className="w-full h-64 flex flex-col justify-end pt-4">
              <div className="flex-grow flex items-end justify-between px-4 h-48 border-b border-stone-200 dark:border-neutral-800">
                {chartData.map((d) => {
                  const percentHeight = (d.value / maxVal) * 100;
                  return (
                    <div key={d.label} className="flex flex-col items-center group w-1/12">
                      
                      {/* Tooltip */}
                      <span className="opacity-0 group-hover:opacity-100 bg-neutral-950 text-white text-[10px] py-1 px-2 rounded absolute mb-20 transition-opacity z-10 font-sans shadow-lg border border-neutral-800">
                        {d.value} hits
                      </span>

                      {/* Bar */}
                      <div
                        style={{ height: `${percentHeight}%` }}
                        className="w-full bg-gradient-to-t from-maroon-950 via-maroon-800 to-amber-500 rounded-t-lg transition-all duration-500 hover:brightness-110 shadow-md shadow-maroon-900/10"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Labels */}
              <div className="flex justify-between px-4 pt-3 text-xs font-semibold text-stone-500">
                {chartData.map((d) => (
                  <span key={d.label} className="w-1/12 text-center">{d.label}</span>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Recent Activity Logs (Right column) */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardHeader className="pb-2 border-b border-stone-100 dark:border-neutral-800/40 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Audit Logs</CardTitle>
              <p className="text-xs text-stone-400">Latest administrative actions</p>
            </div>
            <Calendar className="w-5 h-5 text-maroon-800 dark:text-gold-400" />
          </CardHeader>
          <CardContent className="p-6">
            
            <div className="space-y-4">
              {stats?.recentLogs && stats.recentLogs.length > 0 ? (
                stats.recentLogs.map((log) => (
                  <div key={log.id} className="text-xs border-b border-stone-100 dark:border-neutral-800/40 pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-stone-800 dark:text-stone-200 leading-normal">
                      {log.action}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-stone-400 mt-1.5 font-sans">
                      <span>By: {log.user.name.split(' ')[0]}</span>
                      <span>{new Date(log.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-stone-500">
                  No activity logs logged.
                </div>
              )}
            </div>

          </CardContent>
        </Card>

      </div>

    </div>
  );
}
