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
  Skeleton,
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
  Folder,
  FolderPlus,
  ChevronRight,
  MoreVertical,
  Move,
  RotateCcw,
  FileText,
  Settings as SettingsIcon,
  Video,
} from 'lucide-react';
import { getCachedData, setCachedData } from '@/lib/clientCache';
import { Media, MediaFolder, Temple, MediaCategory } from '@/lib/db/types';

interface MediaLibraryProps {
  forcedType?: 'image' | 'video' | 'audio' | 'document' | 'all';
  forcedSettings?: boolean;
  forcedUpload?: boolean;
}

export default function MediaLibrary({
  forcedType = 'all',
  forcedSettings = false,
  forcedUpload = false,
}: MediaLibraryProps) {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [temples, setTemples] = useState<Temple[]>([]);
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Active folder path context (null means Root)
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);

  // Tab states: "images", "videos", "audios", "documents", "trash", "settings"
  const [activeTab, setActiveTab] = useState<
    'images' | 'videos' | 'audios' | 'documents' | 'trash' | 'settings'
  >('images');

  // Search & Filter
  const [searchVal, setSearchVal] = useState('');
  const [filterTempleId, setFilterTempleId] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');

  // Folder actions modals
  const [isFolderCreateOpen, setIsFolderCreateOpen] = useState(false);
  const [isFolderRenameOpen, setIsFolderRenameOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<MediaFolder | null>(null);
  const [folderNameForm, setFolderNameForm] = useState('');

  // Move file modal
  const [isMoveFileOpen, setIsMoveFileOpen] = useState(false);
  const [moveTargetFile, setMoveTargetFile] = useState<Media | null>(null);
  const [moveFolderId, setMoveFolderId] = useState<string>('');

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

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  // Edit states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: 0,
    title: '',
    video_type: 'Standard',
    duration: '',
    category_id: '',
    language: 'English',
    folder_id: '',
  });

  const [saving, setSaving] = useState(false);

  // Initial load lock if forcedSettings/Upload are active
  useEffect(() => {
    if (forcedSettings) {
      setActiveTab('settings');
    } else if (forcedUpload) {
      setUploadState('idle');
    }

    if (forcedType !== 'all') {
      if (forcedType === 'image') setActiveTab('images');
      else if (forcedType === 'video') setActiveTab('videos');
      else if (forcedType === 'audio') setActiveTab('audios');
      else if (forcedType === 'document') setActiveTab('documents');
    }
  }, [forcedType, forcedSettings, forcedUpload]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch folders
      const foldersRes = await fetch('/api/admin/media/folders');
      if (foldersRes.ok) {
        const foldersData = await foldersRes.ok ? await foldersRes.json() : [];
        setFolders(foldersData);
      }

      // Fetch temples
      const templesRes = await fetch('/api/admin/temples');
      if (templesRes.ok) {
        const templesData = await templesRes.json();
        setTemples(templesData);
        if (templesData.length > 0 && !mediaForm.temple_id) {
          setMediaForm(prev => ({ ...prev, temple_id: templesData[0].id.toString() }));
        }
      }

      // Fetch media categories
      const catsRes = await fetch('/api/admin/media/categories');
      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData);
      }

      // Fetch media (standard vs trash based on tab)
      const urlParams = new URLSearchParams();
      if (activeTab === 'trash') {
        urlParams.append('trash', 'true');
      }
      if (filterTempleId) {
        urlParams.append('temple_id', filterTempleId);
      }
      if (filterCategoryId) {
        urlParams.append('category_id', filterCategoryId);
      }

      const mediaRes = await fetch(`/api/admin/media?${urlParams.toString()}`);
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        setMediaList(mediaData.all || []);
      } else {
        setErrorMsg('Failed to load media items');
      }
    } catch (err) {
      setErrorMsg('Network error loading library components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, filterTempleId, filterCategoryId]);

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
    }, 100);
  };

  const handleUploadFileSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();

        // Lock Active Tab automatically
        if (forcedType === 'all') {
          if (file.type.startsWith('image/')) setActiveTab('images');
          else if (file.type.startsWith('video/')) setActiveTab('videos');
          else if (file.type.startsWith('audio/')) setActiveTab('audios');
          else setActiveTab('documents');
        }

        setMediaForm(prev => ({
          ...prev,
          url: data.url,
          title: file.name.split('.')[0].replace(/[-_]+/g, ' '),
        }));
        setUploadState('metadata');
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to upload file to Google Drive');
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

    // Determine type string helper
    let type = 'image';
    if (activeTab === 'videos') type = 'video';
    else if (activeTab === 'audios') type = 'audio';
    else if (activeTab === 'documents') type = 'document';

    // File name and extension parsing helper
    const extension = '.' + mediaForm.url.split('.').pop()?.split('?')[0] || '';
    const file_name = `${Date.now()}-${mediaForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${extension}`;

    // Auto mime-type helper
    let mime_type = 'application/octet-stream';
    if (activeTab === 'images') mime_type = 'image/jpeg';
    else if (activeTab === 'videos') mime_type = 'video/mp4';
    else if (activeTab === 'audios') mime_type = 'audio/mpeg';
    else if (mediaForm.url.endsWith('.pdf')) mime_type = 'application/pdf';

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
          file_name,
          mime_type,
          file_size: uploadFile?.size || 0,
          folder_id: currentFolderId,
        }),
      });

      if (res.ok) {
        setUploadState('success');
        fetchData();
        setMediaForm(prev => ({ ...prev, url: '', title: '' }));
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

  const handleEditOpen = (asset: Media) => {
    setEditForm({
      id: asset.id,
      title: asset.title,
      video_type: asset.video_type || 'Standard',
      duration: asset.duration?.toString() || '',
      category_id: asset.category_id?.toString() || '',
      language: asset.language || 'English',
      folder_id: asset.folder_id?.toString() || '',
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/media/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          video_type: editForm.video_type,
          duration: editForm.duration,
          category_id: editForm.category_id || null,
          language: editForm.language,
          folder_id: editForm.folder_id || null,
        }),
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

  const handleMoveFileOpen = (file: Media) => {
    setMoveTargetFile(file);
    setMoveFolderId(file.folder_id?.toString() || '');
    setIsMoveFileOpen(true);
  };

  const handleMoveFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moveTargetFile) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/media/${moveTargetFile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folder_id: moveFolderId || null,
        }),
      });

      if (res.ok) {
        setIsMoveFileOpen(false);
        fetchData();
      } else {
        alert('Failed to move media asset');
      }
    } catch (err) {
      alert('Move operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, permanent = false) => {
    const msg = permanent
      ? 'Are you sure you want to PERMANENTLY delete this media asset? This cannot be undone.'
      : 'Move this media asset to the Trash Bin?';
    if (!confirm(msg)) return;

    try {
      const res = await fetch(`/api/admin/media/${id}?permanent=${permanent}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete asset');
      }
    } catch (err) {
      alert('Delete operation failed');
    }
  };

  const handleRestore = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to restore asset');
      }
    } catch (err) {
      alert('Restore operation failed');
    }
  };

  // Folder CRUD methods
  const handleFolderCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderNameForm.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/media/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folder_name: folderNameForm,
          parent_folder: currentFolderId,
        }),
      });

      if (res.ok) {
        setIsFolderCreateOpen(false);
        setFolderNameForm('');
        fetchData();
      } else {
        alert('Failed to create folder');
      }
    } catch (err) {
      alert('Network error creating folder');
    } finally {
      setSaving(false);
    }
  };

  const handleFolderRenameOpen = (folder: MediaFolder) => {
    setSelectedFolder(folder);
    setFolderNameForm(folder.folder_name);
    setIsFolderRenameOpen(true);
  };

  const handleFolderRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFolder || !folderNameForm.trim()) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/media/folders/${selectedFolder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_name: folderNameForm }),
      });

      if (res.ok) {
        setIsFolderRenameOpen(false);
        setFolderNameForm('');
        fetchData();
      } else {
        alert('Failed to rename folder');
      }
    } catch (err) {
      alert('Network error renaming folder');
    } finally {
      setSaving(false);
    }
  };

  const handleFolderDelete = async (id: number) => {
    if (
      !confirm(
        'Are you sure you want to delete this folder? Any subfolders will also be deleted, and files inside will be un-linked back to Root.'
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/media/folders/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (currentFolderId === id) {
          setCurrentFolderId(null);
        }
        fetchData();
      } else {
        alert('Failed to delete folder');
      }
    } catch (err) {
      alert('Network error deleting folder');
    }
  };

  // Breadcrumbs generator helper
  const getBreadcrumbs = () => {
    const crumbs = [];
    let activeId = currentFolderId;

    while (activeId !== null) {
      const current = folders.find(f => f.id === activeId);
      if (!current) break;
      crumbs.unshift(current);
      activeId = current.parent_folder;
    }

    return crumbs;
  };

  // filter files list by activeTab and currentFolderId
  const getFilteredFiles = () => {
    return mediaList.filter(item => {
      // Search match
      const searchStr = `${item.title} ${item.file_name} ${item.temple?.name || ''} ${item.language || ''}`.toLowerCase();
      if (searchVal && !searchStr.includes(searchVal.toLowerCase())) {
        return false;
      }

      // If in trash bin, show all deleted files regardless of folder
      if (activeTab === 'trash') {
        return true;
      }

      // Folder matching
      if (item.folder_id !== currentFolderId) {
        return false;
      }

      // Tab filtering
      if (activeTab === 'images') return item.mime_type.startsWith('image/');
      if (activeTab === 'videos') return item.mime_type.startsWith('video/');
      if (activeTab === 'audios') return item.mime_type.startsWith('audio/');
      if (activeTab === 'documents') {
        return (
          !item.mime_type.startsWith('image/') &&
          !item.mime_type.startsWith('video/') &&
          !item.mime_type.startsWith('audio/')
        );
      }
      return true;
    });
  };

  const currentSubfolders = folders.filter(f => f.parent_folder === currentFolderId);
  const currentFiles = getFilteredFiles();
  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-amber-500 animate-pulse" />
            <span>Teertha Digital Asset Management</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Manage images, immersive VR tours, audio guides, historical documents, and folder hierarchies.
          </p>
        </div>
      </div>

      {/* 1. UPLOADER BOX */}
      {forcedSettings === false && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drag and Drop upload manager */}
          <Card className="lg:col-span-2 border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
            {uploadState === 'idle' && (
              <div
                className={`p-10 flex flex-col items-center justify-center text-center h-full border-4 border-dashed rounded-xl transition-colors cursor-pointer ${
                  dragActive
                    ? 'border-amber-500 bg-amber-500/5'
                    : 'border-stone-200 dark:border-neutral-800 bg-transparent hover:bg-stone-50/50 dark:hover:bg-neutral-900/30'
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
                  accept="image/*,video/*,audio/*,application/pdf"
                  onChange={handleFileSelect}
                />
                <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 shadow-sm">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="text-md font-serif font-bold text-stone-800 dark:text-stone-200">
                  Drag & Drop Files Here
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-sm">
                  Supports Images, Videos, Audios, and PDFs. Files are processed and saved securely inside Google Drive.
                </p>
                <Button type="button" variant="outline" className="mt-4">
                  Browse Files
                </Button>
              </div>
            )}

            {uploadState === 'uploading' && (
              <div className="p-10 flex flex-col items-center justify-center text-center h-full space-y-4 animate-pulse">
                <div className="w-12 h-12 border-2 border-t-transparent border-amber-500 rounded-full animate-spin" />
                <div className="space-y-1 w-full max-w-xs mx-auto">
                  <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    Uploading to Google Drive...
                  </h4>
                  <p className="text-[10px] text-stone-400 truncate">{uploadFile?.name}</p>
                  <div className="w-full bg-stone-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {uploadState === 'metadata' && (
              <div className="p-6 sm:p-8 space-y-4 h-full">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-neutral-800/40">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h3 className="text-md font-serif font-bold text-stone-900 dark:text-white">
                    Link Uploaded Asset
                  </h3>
                </div>

                <form onSubmit={handleMetadataSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <Input
                    label="Asset Name / Label"
                    id="meta-title"
                    required
                    placeholder="e.g. Somnath Main Entry View"
                    value={mediaForm.title}
                    onChange={e => setMediaForm({ ...mediaForm, title: e.target.value })}
                  />

                  <Select
                    label="Associated Temple"
                    id="meta-temple"
                    required
                    options={temples.map(t => ({ value: t.id, label: t.name }))}
                    value={mediaForm.temple_id}
                    onChange={e => setMediaForm({ ...mediaForm, temple_id: e.target.value })}
                  />

                  {activeTab === 'videos' && (
                    <>
                      <Select
                        label="Video Class"
                        id="meta-vtype"
                        required
                        options={[
                          { value: 'Standard', label: 'Standard Video' },
                          { value: '360_VR', label: '360° VR Immersive Video' },
                        ]}
                        value={mediaForm.video_type}
                        onChange={e => setMediaForm({ ...mediaForm, video_type: e.target.value })}
                      />

                      <Select
                        label="Category"
                        id="meta-vcat"
                        options={[
                          { value: '', label: 'No Category' },
                          ...categories.map(c => ({ value: c.id, label: c.name })),
                        ]}
                        value={mediaForm.category_id}
                        onChange={e => setMediaForm({ ...mediaForm, category_id: e.target.value })}
                      />

                      <Input
                        label="Duration (Seconds)"
                        id="meta-duration"
                        type="number"
                        placeholder="e.g. 90"
                        value={mediaForm.duration}
                        onChange={e => setMediaForm({ ...mediaForm, duration: e.target.value })}
                      />
                    </>
                  )}

                  {activeTab === 'audios' && (
                    <Select
                      label="Audio Language"
                      id="meta-lang"
                      required
                      options={[
                        { value: 'English', label: 'English' },
                        { value: 'Hindi', label: 'Hindi' },
                        { value: 'Marathi', label: 'Marathi' },
                        { value: 'Sanskrit', label: 'Sanskrit' },
                      ]}
                      value={mediaForm.language}
                      onChange={e => setMediaForm({ ...mediaForm, language: e.target.value })}
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
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                      {saving ? 'Registering...' : 'Add to Catalog'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {uploadState === 'success' && (
              <div className="p-10 flex flex-col items-center justify-center text-center h-full space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center shadow-md animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white">
                  Asset Added to Library
                </h3>
              </div>
            )}
          </Card>

          {/* Remote URL Paste box */}
          <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between">
            <form onSubmit={handleMetadataSubmit} className="space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="pb-2 border-b border-stone-100 dark:border-neutral-800/40">
                  <h3 className="text-xs font-serif font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                    Link Remote URL
                  </h3>
                  <p className="text-[10px] text-stone-400">
                    If linking a remote image, it will be automatically mirrored to Google Drive.
                  </p>
                </div>

                <Input
                  label="Direct HTTP File URL"
                  id="url-paste"
                  required
                  placeholder="https://example.com/asset.jpg"
                  value={mediaForm.url}
                  onChange={e => setMediaForm({ ...mediaForm, url: e.target.value })}
                />

                <Input
                  label="Label / Title"
                  id="url-title"
                  required
                  placeholder="e.g. Somnath Outer Compound"
                  value={mediaForm.title}
                  onChange={e => setMediaForm({ ...mediaForm, title: e.target.value })}
                />

                <Select
                  label="Assign to Temple"
                  id="url-temple"
                  required
                  options={temples.map(t => ({ value: t.id, label: t.name }))}
                  value={mediaForm.temple_id}
                  onChange={e => setMediaForm({ ...mediaForm, temple_id: e.target.value })}
                />

                {activeTab === 'videos' && (
                  <>
                    <Select
                      label="Video Type"
                      id="url-vtype"
                      required
                      options={[
                        { value: 'Standard', label: 'Standard Video' },
                        { value: '360_VR', label: '360° VR Immersive Video' },
                      ]}
                      value={mediaForm.video_type}
                      onChange={e => setMediaForm({ ...mediaForm, video_type: e.target.value })}
                    />

                    <Select
                      label="Video Category"
                      id="url-vcat"
                      options={[
                        { value: '', label: 'No Category' },
                        ...categories.map(c => ({ value: c.id, label: c.name })),
                      ]}
                      value={mediaForm.category_id}
                      onChange={e => setMediaForm({ ...mediaForm, category_id: e.target.value })}
                    />

                    <Input
                      label="Duration (Seconds)"
                      id="url-duration"
                      type="number"
                      value={mediaForm.duration}
                      onChange={e => setMediaForm({ ...mediaForm, duration: e.target.value })}
                    />
                  </>
                )}

                {activeTab === 'audios' && (
                  <Select
                    label="Audio Language"
                    id="url-lang"
                    required
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'Hindi', label: 'Hindi' },
                      { value: 'Marathi', label: 'Marathi' },
                    ]}
                    value={mediaForm.language}
                    onChange={e => setMediaForm({ ...mediaForm, language: e.target.value })}
                  />
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-neutral-800/40">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={saving || !mediaForm.url}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Register Link</span>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* 2. DIRECTORIES & BROWSER */}
      <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        {/* Directories Navigation Breadcrumbs & Filter Bar */}
        <div className="p-4 border-b border-stone-100 dark:border-neutral-800/40 space-y-3 bg-stone-50/50 dark:bg-neutral-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Breadcrumbs */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs text-stone-500 font-semibold uppercase tracking-wider">
              <button
                onClick={() => setCurrentFolderId(null)}
                className={`hover:text-amber-600 transition-colors flex items-center gap-1 ${
                  currentFolderId === null ? 'text-amber-600 font-bold' : ''
                }`}
              >
                <Folder className="w-4 h-4" />
                <span>Root</span>
              </button>

              {breadcrumbs.map(crumb => (
                <React.Fragment key={crumb.id}>
                  <ChevronRight className="w-3 h-3 text-stone-400" />
                  <button
                    onClick={() => setCurrentFolderId(crumb.id)}
                    className={`hover:text-amber-600 transition-colors ${
                      currentFolderId === crumb.id ? 'text-amber-600 font-bold' : ''
                    }`}
                  >
                    {crumb.folder_name}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Folder creation & Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeTab !== 'trash' && activeTab !== 'settings' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsFolderCreateOpen(true)}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <FolderPlus className="w-4 h-4 text-amber-500" />
                  <span>New Folder</span>
                </Button>
              )}

              {/* Filters */}
              {activeTab !== 'settings' && (
                <>
                  <select
                    value={filterTempleId}
                    onChange={e => setFilterTempleId(e.target.value)}
                    className="h-8 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs px-2.5 outline-none"
                  >
                    <option value="">All Temples</option>
                    {temples.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filterCategoryId}
                    onChange={e => setFilterCategoryId(e.target.value)}
                    className="h-8 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs px-2.5 outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Selection menu */}
        <div className="px-6 py-2 border-b border-stone-100 dark:border-neutral-800/40 flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-neutral-900">
          <div className="flex gap-1.5 p-1 bg-stone-100 dark:bg-neutral-800 rounded-lg w-full md:w-auto overflow-x-auto">
            {forcedType === 'all' && (
              <>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'images'
                      ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'videos'
                      ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  Videos & VR
                </button>
                <button
                  onClick={() => setActiveTab('audios')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'audios'
                      ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  Audio Guides
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  PDFs & Docs
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('trash')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'trash'
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-stone-500 hover:text-red-500'
              }`}
            >
              Trash Bin
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-neutral-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Folder Settings
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-stone-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search items..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Catalog Body */}
        <CardContent className="p-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-xl" />
              ))}
            </div>
          ) : activeTab === 'settings' ? (
            /* Settings Panel (Folder lists for delete/rename) */
            <div className="space-y-4">
              <div className="pb-2 border-b border-stone-100 dark:border-neutral-800/40">
                <h3 className="text-sm font-serif font-bold text-stone-800 dark:text-stone-200">
                  Folder Directory Management
                </h3>
                <p className="text-xs text-stone-400">Manage folder naming and directory paths.</p>
              </div>

              {folders.length === 0 ? (
                <div className="text-center py-10 text-xs text-stone-500">No folders configured yet.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {folders.map(f => (
                    <div
                      key={f.id}
                      className="p-4 border border-stone-200 dark:border-neutral-800 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Folder className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 truncate">
                          {f.folder_name}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFolderRenameOpen(f)}
                          className="p-1 text-stone-500 hover:text-amber-500"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFolderDelete(f.id)}
                          className="p-1 text-stone-500 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* File Browser Mode */
            <div className="space-y-6">
              {/* Subfolders list - only display if not in Trash Bin */}
              {activeTab !== 'trash' && currentSubfolders.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                    Folders ({currentSubfolders.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {currentSubfolders.map(sub => (
                      <div
                        key={sub.id}
                        onDoubleClick={() => setCurrentFolderId(sub.id)}
                        onClick={() => setCurrentFolderId(sub.id)}
                        className="p-3 border border-stone-200/80 dark:border-neutral-800 rounded-xl bg-stone-50/50 dark:bg-neutral-900/30 hover:border-amber-500 dark:hover:border-amber-500 cursor-pointer flex flex-col justify-between relative group"
                      >
                        <div className="flex items-center gap-2">
                          <Folder className="w-8 h-8 text-amber-500 flex-shrink-0" />
                          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate pr-4">
                            {sub.folder_name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files Grid */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  Assets ({currentFiles.length})
                </h4>

                {currentFiles.length === 0 ? (
                  <div className="text-center py-20 text-xs text-stone-500">
                    No files found in this category or folder.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {currentFiles.map(file => (
                      <div
                        key={file.id}
                        className="group relative rounded-xl overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-950 shadow-sm flex flex-col justify-between"
                      >
                        {/* File preview based on type */}
                        <div className="relative h-40 w-full overflow-hidden bg-neutral-900 border-b border-stone-100 dark:border-neutral-800/40 flex flex-col items-center justify-center text-white">
                          {file.mime_type.startsWith('image/') ? (
                            <img
                              src={file.file_url}
                              alt={file.title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : file.mime_type.startsWith('video/') ? (
                            <>
                              <Video className="w-10 h-10 text-neutral-600 mb-2 group-hover:scale-105 transition-transform" />
                              <span className="text-[10px] text-neutral-500 max-w-full px-2 truncate">
                                {file.file_name}
                              </span>
                              <Badge
                                variant={file.video_type === '360_VR' ? 'gold' : 'default'}
                                className="absolute top-2 left-2 text-[9px]"
                              >
                                {file.video_type}
                              </Badge>
                              {file.duration && (
                                <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] py-0.5 px-1.5 rounded text-neutral-300 font-mono">
                                  {Math.floor(file.duration / 60)}:
                                  {file.duration % 60 < 10 ? '0' : ''}
                                  {file.duration % 60}
                                </span>
                              )}
                            </>
                          ) : file.mime_type.startsWith('audio/') ? (
                            <>
                              <Volume2 className="w-10 h-10 text-neutral-600 mb-2 group-hover:scale-105 transition-transform" />
                              <span className="text-[10px] text-neutral-500 max-w-full px-2 truncate">
                                {file.file_name}
                              </span>
                              {file.language && (
                                <Badge variant="gold" className="absolute top-2 left-2 text-[9px]">
                                  {file.language}
                                </Badge>
                              )}
                            </>
                          ) : (
                            <>
                              <FileText className="w-10 h-10 text-neutral-600 mb-2 group-hover:scale-105 transition-transform" />
                              <span className="text-[10px] text-neutral-500 max-w-full px-2 truncate">
                                {file.file_name}
                              </span>
                              <Badge variant="info" className="absolute top-2 left-2 text-[9px]">
                                DOCUMENT
                              </Badge>
                            </>
                          )}
                        </div>

                        {/* File Details */}
                        <div className="p-4 space-y-2 flex-grow">
                          <Badge variant="gold" className="text-[9px]">
                            {file.temple?.name}
                          </Badge>
                          <h4 className="text-xs font-semibold text-stone-900 dark:text-white truncate">
                            {file.title}
                          </h4>
                          <span className="text-[9px] text-stone-400 block">
                            {new Date(file.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        {/* File Controls */}
                        <div className="p-2 bg-stone-50 dark:bg-neutral-900/40 border-t border-stone-100 dark:border-neutral-800/20 flex justify-end gap-1.5">
                          {activeTab === 'trash' ? (
                            <>
                              <button
                                onClick={() => handleRestore(file.id)}
                                title="Restore item"
                                className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-green-500 transition-colors text-stone-500 cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(file.id, true)}
                                title="Permanently delete"
                                className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-red-500 transition-colors text-stone-500 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleMoveFileOpen(file)}
                                title="Move to folder"
                                className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-blue-500 transition-colors text-stone-500 cursor-pointer"
                              >
                                <Move className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleEditOpen(file)}
                                title="Edit metadata"
                                className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-amber-500 transition-colors text-stone-500 cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(file.id, false)}
                                title="Move to Trash Bin"
                                className="p-1.5 rounded bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:text-red-500 transition-colors text-stone-500 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3. DIALOGS */}

      {/* CREATE FOLDER DIALOG */}
      <Dialog
        isOpen={isFolderCreateOpen}
        onClose={() => setIsFolderCreateOpen(false)}
        title="Create New Folder"
      >
        <form onSubmit={handleFolderCreateSubmit} className="space-y-4">
          <Input
            label="Folder Name"
            id="new-folder-name"
            required
            placeholder="e.g. Ritual Photography"
            value={folderNameForm}
            onChange={e => setFolderNameForm(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 dark:border-neutral-800/40">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsFolderCreateOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Folder'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* RENAME FOLDER DIALOG */}
      <Dialog
        isOpen={isFolderRenameOpen}
        onClose={() => setIsFolderRenameOpen(false)}
        title="Rename Folder"
      >
        <form onSubmit={handleFolderRenameSubmit} className="space-y-4">
          <Input
            label="New Folder Name"
            id="rename-folder-name"
            required
            value={folderNameForm}
            onChange={e => setFolderNameForm(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 dark:border-neutral-800/40">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsFolderRenameOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Rename'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* MOVE FILE DIALOG */}
      <Dialog
        isOpen={isMoveFileOpen}
        onClose={() => setIsMoveFileOpen(false)}
        title="Move Media to Folder"
      >
        <form onSubmit={handleMoveFileSubmit} className="space-y-4">
          <Select
            label="Select Destination Folder"
            id="move-file-dest"
            options={[
              { value: '', label: 'Root Directory' },
              ...folders.map(f => ({ value: f.id.toString(), label: f.folder_name })),
            ]}
            value={moveFolderId}
            onChange={e => setMoveFolderId(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 dark:border-neutral-800/40">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsMoveFileOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Moving...' : 'Move File'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* EDIT METADATA DIALOG */}
      <Dialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Modify Media Details"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            label="Title / Label"
            id="edit-meta-title"
            required
            value={editForm.title}
            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
          />

          {editForm.video_type !== undefined && (
            <>
              <Select
                label="Video Class"
                id="edit-meta-vtype"
                required
                options={[
                  { value: 'Standard', label: 'Standard Video' },
                  { value: '360_VR', label: '360° VR Immersive Video' },
                ]}
                value={editForm.video_type}
                onChange={e => setEditForm({ ...editForm, video_type: e.target.value })}
              />

              <Select
                label="Video Category"
                id="edit-meta-vcat"
                options={[
                  { value: '', label: 'No Category' },
                  ...categories.map(c => ({ value: c.id, label: c.name })),
                ]}
                value={editForm.category_id}
                onChange={e => setEditForm({ ...editForm, category_id: e.target.value })}
              />

              <Input
                label="Duration (Seconds)"
                id="edit-meta-duration"
                type="number"
                value={editForm.duration}
                onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
              />
            </>
          )}

          {editForm.language !== undefined && (
            <Select
              label="Audio Language"
              id="edit-meta-lang"
              required
              options={[
                { value: 'English', label: 'English' },
                { value: 'Hindi', label: 'Hindi' },
                { value: 'Marathi', label: 'Marathi' },
              ]}
              value={editForm.language}
              onChange={e => setEditForm({ ...editForm, language: e.target.value })}
            />
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 dark:border-neutral-800/40">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Update'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
