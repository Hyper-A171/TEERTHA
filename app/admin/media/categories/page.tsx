'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Dialog,
  Input,
  Badge,
} from '@/components/ui';
import { Plus, Edit2, Trash2, FolderTree, AlertCircle } from 'lucide-react';

interface MediaCategory {
  id: number;
  name: string;
  slug: string;
}

export default function AdminMediaCategories() {
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    slug: '',
  });

  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        setErrorMsg('Failed to load video circuits');
      }
    } catch (err) {
      setErrorMsg('Network error loading media categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/media/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
        }),
      });

      if (res.ok) {
        setIsCreateOpen(false);
        setFormData({ id: 0, name: '', slug: '' });
        fetchCategories();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to create category');
      }
    } catch (err) {
      setErrorMsg('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/admin/media/categories/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
        }),
      });

      if (res.ok) {
        setIsEditOpen(false);
        setFormData({ id: 0, name: '', slug: '' });
        fetchCategories();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update category');
      }
    } catch (err) {
      setErrorMsg('Failed to update catalog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? Videos associated will be set to un-categorized.')) return;

    try {
      const res = await fetch(`/api/admin/media/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      alert('Delete action encountered network error');
    }
  };

  const openEdit = (cat: MediaCategory) => {
    setFormData({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    });
    setIsEditOpen(true);
  };

  const generateSlug = (nameVal: string) => {
    return nameVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({
      ...formData,
      name: val,
      slug: generateSlug(val),
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-amber-500" />
            <span>Video & VR Categories</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Configure categorizations for media listings (e.g. Darshan streams, VR walkthroughs).
          </p>
        </div>

        <Button
          onClick={() => {
            setFormData({ id: 0, name: '', slug: '' });
            setIsCreateOpen(true);
          }}
          className="flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Category</span>
        </Button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <div className="w-8 h-8 border-2 border-t-transparent border-maroon-800 dark:border-gold-500 rounded-full animate-spin" />
          <p className="text-xs text-stone-500">Loading classifications...</p>
        </div>
      ) : categories.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Slug Handle</TableHead>
              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-semibold text-stone-900 dark:text-white">
                  {cat.name}
                </TableCell>
                <TableCell>
                  <code className="bg-stone-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">
                    {cat.slug}
                  </code>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(cat)}
                    className="p-2 h-auto"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 h-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-12 text-center border border-dashed border-stone-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900/40">
          <p className="text-stone-500">No media classifications logged. Get started by clicking Add Media Category.</p>
        </div>
      )}

      {/* CREATE MODAL */}
      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Media Category"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 font-sans">
          <Input
            label="Category Name"
            id="create-name"
            required
            placeholder="e.g. 360 VR Walkthroughs"
            value={formData.name}
            onChange={handleNameChange}
          />
          
          <Input
            label="Slug Identifier"
            id="create-slug"
            required
            placeholder="e.g. 360-vr-walkthroughs"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-200/60 dark:border-neutral-800/60">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCreateOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Add Category'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Category Details"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4 font-sans">
          <Input
            label="Category Name"
            id="edit-name"
            required
            placeholder="e.g. 360 VR Walkthroughs"
            value={formData.name}
            onChange={handleNameChange}
          />
          
          <Input
            label="Slug Identifier"
            id="edit-slug"
            required
            placeholder="e.g. 360-vr-walkthroughs"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-200/60 dark:border-neutral-800/60">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Updating...' : 'Update Category'}
            </Button>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
