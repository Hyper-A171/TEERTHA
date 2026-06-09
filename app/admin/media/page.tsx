'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Dialog,
  Input,
  Select,
  Badge,
} from '@/components/ui';
import {
  Upload,
  FileImage,
  FileVideo,
  Volume2,
  Trash2,
  Edit2,
  Search,
  CheckCircle,
  AlertCircle,
  HardDrive,
  BarChart,
  Video
} from 'lucide-react';

interface MediaAsset {
  id: number;
  temple_id: number;
  image_url?: string;
  video_url?: string;
  audio_url?: string;
  title?: string;
  video_type?: string;
  duration?: number;
  language?: string;
  category_id?: number | null;
  created_at: string;
  temple: {
    name: string;
  };
  category?: {
    name: string;
  } | null;
}

interface Temple {
  id: number;
  name: string;
}

interface MediaCategory {
  id: number;
  name: string;
}

export default function AdminMediaDashboard() {
  const [images, setImages] = useState<MediaAsset[]>([]);
  const [videos, setVideos] = useState<MediaAsset[]>([]);
  const [audios, setAudios] = useState<MediaAsset[]>([]);
  
  const [temples, setTemples] = useState<Temple[]>([]);
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Tab states: "images", "videos", "audios"
  const [activeTab, setActiveTab] = useState<'images' | 'videos' | 'audios'>('images');
  
  // Search query
  const [searchVal, setSearchVal] = useState('');

  // Upload Management State
  const [dragActive, setDragActive] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'metadata' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for registering uploaded media
  const [mediaForm, setMediaForm] = useState({
    temple_id: '',
    url: '',
    title: '',
    video_type: 'Standard',
    duration: '',
    category_id: '',
    language: 'English',
  });

  // Mode: "upload" or "paste"
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  // Edit states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editAsset, setEditAsset] = useState<MediaAsset | null>(null);
  const [editForm, setEditForm] = useState({
    id: 0,
    type: 'image',
    title: '',
    video_type: 'Standard',
    duration: '',
    category_id: '',
    language: 'English',
  });
  
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const mediaRes = await fetch('/api/admin/media');
      const templesRes = await fetch('/api/admin/temples');
      const catsRes = await fetch('/api/admin/media/categories');

      if (mediaRes.ok && templesRes.ok && catsRes.ok) {
        const mediaData = await mediaRes.json();
        const templesData = await templesRes.json();
        const catsData = await catsRes.json();
        
        setImages(mediaData.images);
        setVideos(mediaData.videos);
        setAudios(mediaData.audios);
        setTemples(templesData);
        setCategories(catsData);

        if (templesData.length > 0) {
          setMediaForm((prev) => ({
            ...prev,
            temple_id: templesData[0].id.toString(),
            category_id: catsData[0]?.id.toString() || '',
          }));
        }
      } else {
        setErrorMsg('Failed to load media catalog databases');
      }
    } catch (err) {
      setErrorMsg('Network error loading library components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploadFile(file);
    setUploadState('uploading');
    setUploadProgress(0);

    // Mock progress bar increments
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        handleUploadFileSubmit(file);
      }
    }, 150);
  };

  const handleUploadFileSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        
        // Auto determine Tab based on mime type
        let type: 'images' | 'videos' | 'audios' = 'images';
        if (file.type.startsWith('video/')) type = 'videos';
        else if (file.type.startsWith('audio/')) type = 'audios';
        
        // Open metadata assignment form
        setMediaForm((prev) => ({
          ...prev,
          url: data.url,
          title: file.name.split('.')[0].replace(/[-_]+/g, ' '),
        }));
        setUploadState('metadata');
      } else {
        setErrorMsg('Failed to upload file to local storage');
        setUploadState('idle');
      }
    } catch (err) {
      setErrorMsg('Network error uploading asset buffer');
      setUploadState('idle');
    }
  };

  const handleMetadataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    // Determine type string
    let type = 'image';
    if (activeTab === 'videos') type = 'video';
    else if (activeTab === 'audios') type = 'audio';

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          temple_id: mediaForm.temple_id,
          url: mediaForm.url,
          title: mediaForm.title,
          video_type: mediaForm.video_type,
          duration: mediaForm.duration,
          category_id: mediaForm.category_id || null,
          language: mediaForm.language,
        }),
      });

      if (res.ok) {
        setUploadState('success');
        fetchData();
        setTimeout(() => {
          setUploadState('idle');
          setUploadFile(null);
        }, 1500);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to save media metadata');
      }
    } catch (err) {
      setErrorMsg('Failed to complete database registration');
    } finally {
      setSaving(false);
    }
  };

  const handleEditOpen = (asset: MediaAsset, type: 'images' | 'videos' | 'audios') => {
    setEditAsset(asset);
    setEditForm({
      id: asset.id,
      type: type === 'images' ? 'image' : type === 'videos' ? 'video' : 'audio',
      title: asset.title || '',
      video_type: asset.video_type || 'Standard',
      duration: asset.duration?.toString() || '',
      category_id: asset.category_id?.toString() || '',
      language: asset.language || 'English',
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/media/${editForm.id}?type=${editForm.type}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setIsEditOpen(false);
        fetchData();
      } else {
        alert('Failed to update asset metadata');
      }
    } catch (err) {
      alert('Network error updating metadata');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, type: 'images' | 'videos' | 'audios') => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    
    let typeParam = 'image';
    if (type === 'videos') typeParam = 'video';
    else if (type === 'audios') typeParam = 'audio';

    try {
      const res = await fetch(`/api/admin/media/${id}?type=${typeParam}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete asset');
      }
    } catch (err) {
      alert('Delete operation failed');
    }
  };

  // Filter lists based on search values
  const filterList = (list: MediaAsset[]) => {
    return list.filter((item) => {
      const text = `${item.title || ''} ${item.temple.name || ''} ${item.language || ''} ${item.video_type || ''} ${item.category?.name || ''}`.toLowerCase();
      return text.includes(searchVal.toLowerCase());
    });
  };

  const filteredImages = filterList(images);
  const filteredVideos = filterList(videos);
  const filteredAudios = filterList(audios);

  // Quick stats calculations
  const totalStorage = (images.length * 1.2 + videos.length * 24.5 + audios.length * 3.8).toFixed(1);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Upload className="w-6 h-6 text-amber-500" />
            <span>Spiritual Media Library</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Upload images, standard/360° videos, and multi-language audio guides.
          </p>
        </div>
      </div>

      {/* 1. ANALYTICS CLOUD CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Images count */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Gallery Images</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{images.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <FileImage className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Videos count */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Video & VR Files</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{videos.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <FileVideo className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Audio guides count */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Audio Guides</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{audios.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Est storage count */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Est. Media Storage</p>
              <h3 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">{totalStorage} MB</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-neutral-500/10 text-stone-600 dark:text-stone-300 flex items-center justify-center">
              <HardDrive className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 2. UPLOADER BOX & INPUT SELECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Drag and Drop upload manager */}
        <Card className="lg:col-span-2 border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-center min-h-[350px] relative overflow-hidden">
          
          {uploadState === 'idle' && (
            <div
              className={`p-10 flex flex-col items-center justify-center text-center h-full border-4 border-dashed rounded-xl transition-colors cursor-pointer ${
                dragActive ? 'border-amber-500 bg-amber-500/5' : 'border-stone-200 dark:border-neutral-800 bg-transparent hover:bg-stone-50/50 dark:hover:bg-neutral-900/30'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,video/*,audio/*"
                onChange={handleFileSelect}
              />
              <div className="w-16 h-16 rounded-full bg-maroon-800/10 dark:bg-gold-500/10 text-maroon-800 dark:text-gold-400 flex items-center justify-center mb-4 shadow-sm animate-pulse">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200">Drag & Drop Media Assets</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-sm">
                Drop images, video recordings (standard/360°), or audio guide files. Files will be saved locally in the public folder.
              </p>
              <Button type="button" variant="outline" className="mt-6">
                Browse Files
              </Button>
            </div>
          )}

          {uploadState === 'uploading' && (
            <div className="p-10 flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="w-12 h-12 border-2 border-t-transparent border-maroon-800 dark:border-gold-500 rounded-full animate-spin" />
              <div className="space-y-1 w-full max-w-xs mx-auto">
                <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Reading asset buffers...</h4>
                <p className="text-xs text-stone-400">Uploading {uploadFile?.name}</p>
                <div className="w-full bg-stone-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-maroon-800 to-amber-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {uploadState === 'metadata' && (
            <div className="p-6 sm:p-8 space-y-4 h-full">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-neutral-800/40">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="text-md font-serif font-bold text-stone-900 dark:text-white">File Uploaded! Assign Metadata</h3>
              </div>

              <form onSubmit={handleMetadataSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-sans">
                <Input
                  label="Title/Label"
                  id="meta-title"
                  required
                  placeholder="e.g. Kedarnath Inner Sanctum View"
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                />

                <Select
                  label="Assign to Temple"
                  id="meta-temple"
                  required
                  options={temples.map(t => ({ value: t.id, label: t.name }))}
                  value={mediaForm.temple_id}
                  onChange={(e) => setMediaForm({ ...mediaForm, temple_id: e.target.value })}
                />

                {/* Show conditional form options based on target file tab */}
                {activeTab === 'videos' && (
                  <>
                    <Select
                      label="Video Type Classification"
                      id="meta-vtype"
                      required
                      options={[
                        { value: 'Standard', label: 'Standard Video' },
                        { value: '360_VR', label: '360° VR Immersive Video' },
                      ]}
                      value={mediaForm.video_type}
                      onChange={(e) => setMediaForm({ ...mediaForm, video_type: e.target.value })}
                    />

                    <Select
                      label="Video Circuit Category"
                      id="meta-vcat"
                      options={[
                        { value: '', label: 'No Video Category' },
                        ...categories.map(c => ({ value: c.id, label: c.name }))
                      ]}
                      value={mediaForm.category_id}
                      onChange={(e) => setMediaForm({ ...mediaForm, category_id: e.target.value })}
                    />

                    <Input
                      label="Duration (Seconds)"
                      id="meta-duration"
                      type="number"
                      required
                      placeholder="e.g. 180"
                      value={mediaForm.duration}
                      onChange={(e) => setMediaForm({ ...mediaForm, duration: e.target.value })}
                    />
                  </>
                )}

                {activeTab === 'audios' && (
                  <Select
                    label="Audio Language Track"
                    id="meta-lang"
                    required
                    options={[
                      { value: 'English', label: 'English Guide' },
                      { value: 'Hindi', label: 'Hindi Guide' },
                      { value: 'Marathi', label: 'Marathi Guide' },
                    ]}
                    value={mediaForm.language}
                    onChange={(e) => setMediaForm({ ...mediaForm, language: e.target.value })}
                  />
                )}

                <div className="sm:col-span-2 pt-4 border-t border-stone-100 dark:border-neutral-800/40 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setUploadState('idle');
                      setUploadFile(null);
                    }}
                    disabled={saving}
                  >
                    Discard
                  </Button>
                  <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? 'Registering...' : 'Add to Library'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {uploadState === 'success' && (
            <div className="p-10 flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center shadow-md animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white">Asset Linked Successfully</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">The file has been successfully registered to the directory.</p>
            </div>
          )}

        </Card>

        {/* Manual Link / URL paste manager */}
        <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between">
          <form onSubmit={handleMetadataSubmit} className="space-y-4 font-sans h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-2 border-b border-stone-100 dark:border-neutral-800/40">
                <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-white uppercase tracking-wider">Link Remote Media Asset</h3>
                <p className="text-[10px] text-stone-400 mt-1">Useful when testing on Vercel or linking from cloud storage (Cloudinary, YouTube, etc.)</p>
              </div>

              <Input
                label="Direct Media URL"
                id="url-paste"
                required
                placeholder="e.g. https://domain.com/asset.jpg"
                value={mediaForm.url}
                onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
              />

              <Input
                label="Title/Label"
                id="url-title"
                required
                placeholder="e.g. Somnath Outer Gardens"
                value={mediaForm.title}
                onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
              />

              <Select
                label="Assign to Temple"
                id="url-temple"
                required
                options={temples.map(t => ({ value: t.id, label: t.name }))}
                value={mediaForm.temple_id}
                onChange={(e) => setMediaForm({ ...mediaForm, temple_id: e.target.value })}
              />

              {activeTab === 'videos' && (
                <>
                  <Select
                    label="Video Classification"
                    id="url-vtype"
                    required
                    options={[
                      { value: 'Standard', label: 'Standard Video' },
                      { value: '360_VR', label: '360° VR Immersive Video' },
                    ]}
                    value={mediaForm.video_type}
                    onChange={(e) => setMediaForm({ ...mediaForm, video_type: e.target.value })}
                  />

                  <Select
                    label="Video Category"
                    id="url-vcat"
                    options={[
                      { value: '', label: 'No Category' },
                      ...categories.map(c => ({ value: c.id, label: c.name }))
                    ]}
                    value={mediaForm.category_id}
                    onChange={(e) => setMediaForm({ ...mediaForm, category_id: e.target.value })}
                  />

                  <Input
                    label="Duration (Seconds)"
                    id="url-duration"
                    type="number"
                    required
                    value={mediaForm.duration}
                    onChange={(e) => setMediaForm({ ...mediaForm, duration: e.target.value })}
                  />
                </>
              )}

              {activeTab === 'audios' && (
                <Select
                  label="Audio Language"
                  id="url-lang"
                  required
                  options={[
                    { value: 'English', label: 'English Guide' },
                    { value: 'Hindi', label: 'Hindi Guide' },
                    { value: 'Marathi', label: 'Marathi Guide' },
                  ]}
                  value={mediaForm.language}
                  onChange={(e) => setMediaForm({ ...mediaForm, language: e.target.value })}
                />
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-neutral-800/40">
              <Button type="submit" variant="primary" disabled={saving || !mediaForm.url} className="w-full flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Link Remote Asset</span>
              </Button>
            </div>
          </form>
        </Card>

      </div>

      {/* 3. MEDIA GALLERY GRID */}
      <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        
        {/* Tabs and Search */}
        <div className="p-6 border-b border-stone-100 dark:border-neutral-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tab selectors */}
          <div className="flex gap-1.5 p-1 bg-stone-100 dark:bg-neutral-800 rounded-lg w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('images'); setErrorMsg(''); }}
              className={`flex-grow md:flex-grow-0 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'images' ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Gallery Images
            </button>
            <button
              onClick={() => { setActiveTab('videos'); setErrorMsg(''); }}
              className={`flex-grow md:flex-grow-0 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'videos' ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Videos & VR
            </button>
            <button
              onClick={() => { setActiveTab('audios'); setErrorMsg(''); }}
              className={`flex-grow md:flex-grow-0 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'audios' ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Audio Guides
            </button>
          </div>

          {/* Search filter input */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-stone-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search library assets..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

        </div>

        {/* Tab content grids */}
        <CardContent className="p-6">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-8 h-8 border-2 border-t-transparent border-maroon-800 dark:border-gold-500 rounded-full animate-spin" />
              <p className="text-xs text-stone-500">Retrieving media items...</p>
            </div>
          ) : (
            <>
              {activeTab === 'images' && (
                filteredImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((img) => (
                      <div key={img.id} className="group relative rounded-xl overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-950 shadow-sm flex flex-col justify-between">
                        
                        {/* Preview */}
                        <div className="relative h-40 w-full overflow-hidden bg-neutral-200 border-b border-stone-100 dark:border-neutral-800/40">
                          <img
                            src={img.image_url}
                            alt={img.title || ''}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-2">
                          <Badge variant="gold" className="text-[9px]">{img.temple.name}</Badge>
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-white truncate font-sans">{img.title}</h4>
                          <span className="text-[10px] text-stone-400 block">{new Date(img.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* Controls Overlay */}
                        <div className="p-3 bg-stone-50 dark:bg-neutral-900/40 border-t border-stone-100 dark:border-neutral-800/20 flex justify-end gap-1.5">
                          <button
                            onClick={() => handleEditOpen(img, 'images')}
                            className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-amber-500 transition-colors text-stone-500"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(img.id, 'images')}
                            className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-red-500 transition-colors text-stone-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-stone-500">No images registered matching filters.</div>
                )
              )}

              {activeTab === 'videos' && (
                filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredVideos.map((vid) => (
                      <div key={vid.id} className="group relative rounded-xl overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-950 shadow-sm flex flex-col justify-between">
                        
                        {/* Video Mock preview representation */}
                        <div className="relative h-40 w-full overflow-hidden bg-neutral-950 flex flex-col items-center justify-center text-white border-b border-stone-100 dark:border-neutral-800/40">
                          <Video className="w-10 h-10 text-neutral-700 mb-2 group-hover:scale-105 transition-transform" />
                          <span className="text-[10px] text-neutral-500 font-mono">{vid.video_url?.split('/').slice(-1)[0]}</span>
                          <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] py-0.5 px-1.5 rounded text-neutral-300 font-mono">
                            {Math.floor((vid.duration || 0) / 60)}:{(vid.duration || 0) % 60 < 10 ? '0' : ''}{(vid.duration || 0) % 60}
                          </span>
                          <div className="absolute top-2 left-2 flex gap-1">
                            <Badge variant={vid.video_type === '360_VR' ? 'gold' : 'default'} className="text-[9px]">
                              {vid.video_type}
                            </Badge>
                            {vid.category?.name && (
                              <Badge variant="info" className="text-[9px]">
                                {vid.category.name}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-2">
                          <Badge variant="gold" className="text-[9px]">{vid.temple.name}</Badge>
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-white truncate font-sans">{vid.video_url?.split('/').slice(-1)[0]}</h4>
                          <span className="text-[10px] text-stone-400 block">{new Date(vid.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* Controls */}
                        <div className="p-3 bg-stone-50 dark:bg-neutral-900/40 border-t border-stone-100 dark:border-neutral-800/20 flex justify-end gap-1.5">
                          <button
                            onClick={() => handleEditOpen(vid, 'videos')}
                            className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-amber-500 transition-colors text-stone-500"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(vid.id, 'videos')}
                            className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-red-500 transition-colors text-stone-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-stone-500">No video recordings found.</div>
                )
              )}

              {activeTab === 'audios' && (
                filteredAudios.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredAudios.map((aud) => (
                      <div key={aud.id} className="group relative rounded-xl overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-950 shadow-sm flex flex-col justify-between">
                        
                        {/* Audio track preview wrapper */}
                        <div className="relative h-40 w-full overflow-hidden bg-neutral-900 flex flex-col items-center justify-center text-white border-b border-stone-100 dark:border-neutral-800/40">
                          <Volume2 className="w-10 h-10 text-neutral-700 mb-2 group-hover:scale-105 transition-transform" />
                          <span className="text-[10px] text-neutral-500 font-mono">{aud.audio_url?.split('/').slice(-1)[0]}</span>
                          <div className="absolute top-2 left-2">
                            <Badge variant="gold" className="text-[9px]">{aud.language}</Badge>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-2">
                          <Badge variant="gold" className="text-[9px]">{aud.temple.name}</Badge>
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-white truncate font-sans">{aud.audio_url?.split('/').slice(-1)[0]}</h4>
                          <span className="text-[10px] text-stone-400 block">{new Date(aud.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* Controls */}
                        <div className="p-3 bg-stone-50 dark:bg-neutral-900/40 border-t border-stone-100 dark:border-neutral-800/20 flex justify-end gap-1.5">
                          <button
                            onClick={() => handleEditOpen(aud, 'audios')}
                            className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-amber-500 transition-colors text-stone-500"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(aud.id, 'audios')}
                            className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-red-500 transition-colors text-stone-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-stone-500">No audio guides registered.</div>
                )
              )}
            </>
          )}

        </CardContent>
      </Card>

      {/* METADATA EDIT DIALOG */}
      <Dialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Modify Media Metadata"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4 font-sans">
          
          {editForm.type === 'image' && (
            <Input
              label="Image Title"
              id="edit-meta-title"
              required
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
          )}

          {editForm.type === 'video' && (
            <>
              <Select
                label="Video Type"
                id="edit-meta-vtype"
                required
                options={[
                  { value: 'Standard', label: 'Standard Video' },
                  { value: '360_VR', label: '360° VR Immersive Video' },
                ]}
                value={editForm.video_type}
                onChange={(e) => setEditForm({ ...editForm, video_type: e.target.value })}
              />

              <Select
                label="Video Circuit Category"
                id="edit-meta-vcat"
                options={[
                  { value: '', label: 'No Category' },
                  ...categories.map(c => ({ value: c.id, label: c.name }))
                ]}
                value={editForm.category_id}
                onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value })}
              />

              <Input
                label="Video Duration (Seconds)"
                id="edit-meta-duration"
                type="number"
                required
                value={editForm.duration}
                onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
              />
            </>
          )}

          {editForm.type === 'audio' && (
            <Select
              label="Audio Language Track"
              id="edit-meta-lang"
              required
              options={[
                { value: 'English', label: 'English Guide' },
                { value: 'Hindi', label: 'Hindi Guide' },
                { value: 'Marathi', label: 'Marathi Guide' },
              ]}
              value={editForm.language}
              onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
            />
          )}

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
              {saving ? 'Saving...' : 'Update Details'}
            </Button>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
