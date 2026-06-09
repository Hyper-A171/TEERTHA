'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Select } from '@/components/ui';
import { Settings, Save, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    portalName: 'Teertha Spiritual Tourism',
    supportEmail: 'contact@atrealstudios.com',
    defaultCircuit: 'jyotirlinga',
    itemsPerPage: '10',
    vrEnable: 'true',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const circuitOptions = [
    { value: 'jyotirlinga', label: 'Jyotirlinga Circuit' },
    { value: 'char-dham', label: 'Char Dham Circuit' },
    { value: 'shakti-peeth', label: 'Shakti Peeth Circuit' },
  ];

  const itemsOptions = [
    { value: '5', label: '5 items per page' },
    { value: '10', label: '10 items per page' },
    { value: '20', label: '20 items per page' },
  ];

  const vrOptions = [
    { value: 'true', label: 'Enable VR Previews' },
    { value: 'false', label: 'Disable VR Previews' },
  ];

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-500" />
          <span>System Settings</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Adjust database defaults, contact options, and Phase 2 VR switches.
        </p>
      </div>

      <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-8">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/40 rounded-lg text-green-600 dark:text-green-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Configurations saved successfully in system registers.</span>
            </div>
          )}

          <div className="space-y-4">
            
            <h2 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200 pb-2 border-b border-stone-100 dark:border-neutral-800/40">
              General Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Portal Name Title"
                id="portalName"
                required
                value={formData.portalName}
                onChange={(e) => setFormData({ ...formData, portalName: e.target.value })}
              />
              
              <Input
                label="Support/Contact Email"
                id="supportEmail"
                type="email"
                required
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
              />
            </div>

          </div>

          <div className="space-y-4 pt-4">
            
            <h2 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200 pb-2 border-b border-stone-100 dark:border-neutral-800/40 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              <span>Directory & VR Integrations</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Default Home Circuit"
                id="defaultCircuit"
                options={circuitOptions}
                value={formData.defaultCircuit}
                onChange={(e) => setFormData({ ...formData, defaultCircuit: e.target.value })}
              />

              <Select
                label="Listing Pagination"
                id="itemsPerPage"
                options={itemsOptions}
                value={formData.itemsPerPage}
                onChange={(e) => setFormData({ ...formData, itemsPerPage: e.target.value })}
              />

              <Select
                label="Virtual Reality Switch"
                id="vrEnable"
                options={vrOptions}
                value={formData.vrEnable}
                onChange={(e) => setFormData({ ...formData, vrEnable: e.target.value })}
              />
            </div>

          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-neutral-800/40 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </Button>
          </div>

        </form>

      </Card>

    </div>
  );
}
