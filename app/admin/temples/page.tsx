'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  Textarea,
  Select,
  Badge,
} from '@/components/ui';
import { Plus, Edit2, Trash2, Church, AlertCircle, Upload, Loader2 } from 'lucide-react';

interface Temple {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  thumbnail: string;
  status: string;
  created_at: string;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

export default function AdminTemples() {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    slug: '',
    description: '',
    location: '',
    thumbnail: '',
    category_id: '',
    status: 'Active',
  });

  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    setUploadingImage(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          thumbnail: data.url,
        }));
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to upload thumbnail image');
      }
    } catch (err) {
      setErrorMsg('Network error uploading thumbnail');
    } finally {
      setUploadingImage(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const templesRes = await fetch('/api/admin/temples');
      const catsRes = await fetch('/api/admin/categories');

      if (templesRes.ok && catsRes.ok) {
        const templesData = await templesRes.json();
        const catsData = await catsRes.json();
        setTemples(templesData);
        setCategories(catsData);
      } else {
        setErrorMsg('Failed to load database directories');
      }
    } catch (err) {
      setErrorMsg('Network error loading temples');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/temples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          location: formData.location,
          thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1626621422472-fe0cf6bbf451?q=80&w=800',
          category_id: formData.category_id,
          status: formData.status,
        }),
      });

      if (res.ok) {
        setIsCreateOpen(false);
        resetForm();
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to create temple profile');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to API');
    } finally {
      setSaving(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/admin/temples/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          location: formData.location,
          thumbnail: formData.thumbnail,
          category_id: formData.category_id,
          status: formData.status,
        }),
      });

      if (res.ok) {
        setIsEditOpen(false);
        resetForm();
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update temple profile');
      }
    } catch (err) {
      setErrorMsg('Failed to update directory');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this temple directory entry?')) return;

    try {
      const res = await fetch(`/api/admin/temples/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete temple');
      }
    } catch (err) {
      alert('Delete action encountered network error');
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      slug: '',
      description: '',
      location: '',
      thumbnail: '',
      category_id: categories[0]?.id.toString() || '',
      status: 'Active',
    });
  };

  const openCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const openEdit = (temple: Temple) => {
    setFormData({
      id: temple.id,
      name: temple.name,
      slug: temple.slug,
      description: temple.description,
      location: temple.location,
      thumbnail: temple.thumbnail,
      category_id: temple.category_id.toString(),
      status: temple.status,
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

  const catOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Church className="w-6 h-6 text-amber-500" />
            <span>Temple Directory Administration</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Create, modify, and manage information records for sacred shrines.
          </p>
        </div>

        <Button
          onClick={openCreate}
          className="flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Temple</span>
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
          <p className="text-xs text-stone-500">Loading temple registers...</p>
        </div>
      ) : temples.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Shrine Name</TableHead>
              <TableHead>Circuit</TableHead>
              <TableHead className="hidden md:table-cell">Geographic Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {temples.map((temple) => (
              <TableRow key={temple.id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-neutral-200">
                    <img
                      src={temple.thumbnail}
                      alt={temple.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-stone-900 dark:text-white">
                  {temple.name}
                </TableCell>
                <TableCell>
                  <Badge variant="gold">{temple.category.name}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs">
                  {temple.location}
                </TableCell>
                <TableCell>
                  <Badge variant={temple.status === 'Active' ? 'success' : 'danger'}>
                    {temple.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(temple)}
                    className="p-2 h-auto"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(temple.id)}
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
          <p className="text-stone-500">No temple records logged. Get started by clicking Add New Temple.</p>
        </div>
      )}

      {/* CREATE MODAL */}
      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Register Sacred Temple"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 font-sans">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Temple Name"
              id="create-name"
              required
              placeholder="e.g. Somnath Temple"
              value={formData.name}
              onChange={handleNameChange}
            />
            
            <Input
              label="Slug Identifier"
              id="create-slug"
              required
              placeholder="e.g. somnath-temple"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Pilgrimage Circuit"
              id="create-cat"
              required
              options={catOptions}
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            />
            
            <Select
              label="Publish Status"
              id="create-status"
              required
              options={statusOptions}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>

          <Input
            label="Geographic Location Address"
            id="create-loc"
            required
            placeholder="e.g. Prabhas Patan, Veraval, Gujarat"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <div className="space-y-1.5 font-sans">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Thumbnail Image URL</label>
              {uploadingImage && (
                <span className="text-[10px] text-amber-500 flex items-center gap-1 font-semibold animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Uploading to Drive...
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex-grow">
                <Input
                  id="create-thumb"
                  required
                  placeholder="e.g. https://images.unsplash.com/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="h-10 px-3 flex items-center gap-1.5 flex-shrink-0"
              >
                {uploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                ) : (
                  <Upload className="w-4 h-4 text-stone-500" />
                )}
                <span>Upload</span>
              </Button>
            </div>
            {formData.thumbnail && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50 mt-1 shadow-sm">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <Textarea
            label="Historical & Spiritual Description"
            id="create-desc"
            required
            rows={5}
            placeholder="Write scriptural history, timing facts, legends..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              {saving ? 'Saving...' : 'Add Temple'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Temple Record"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4 font-sans">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Temple Name"
              id="edit-name"
              required
              placeholder="e.g. Somnath Temple"
              value={formData.name}
              onChange={handleNameChange}
            />
            
            <Input
              label="Slug Identifier"
              id="edit-slug"
              required
              placeholder="e.g. somnath-temple"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Pilgrimage Circuit"
              id="edit-cat"
              required
              options={catOptions}
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            />
            
            <Select
              label="Publish Status"
              id="edit-status"
              required
              options={statusOptions}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>

          <Input
            label="Geographic Location Address"
            id="edit-loc"
            required
            placeholder="e.g. Prabhas Patan, Veraval, Gujarat"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <div className="space-y-1.5 font-sans">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Thumbnail Image URL</label>
              {uploadingImage && (
                <span className="text-[10px] text-amber-500 flex items-center gap-1 font-semibold animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Uploading to Drive...
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex-grow">
                <Input
                  id="edit-thumb"
                  required
                  placeholder="e.g. https://images.unsplash.com/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="h-10 px-3 flex items-center gap-1.5 flex-shrink-0"
              >
                {uploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                ) : (
                  <Upload className="w-4 h-4 text-stone-500" />
                )}
                <span>Upload</span>
              </Button>
            </div>
            {formData.thumbnail && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50 mt-1 shadow-sm">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <Textarea
            label="Historical & Spiritual Description"
            id="edit-desc"
            required
            rows={5}
            placeholder="Write scriptural history..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              {saving ? 'Updating...' : 'Update Temple'}
            </Button>
          </div>
        </form>
      </Dialog>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}
