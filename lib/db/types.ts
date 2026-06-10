export interface Role {
  id: number;
  name: string;
  created_at: Date;
}

export interface User {
  id: number;
  role_id: number;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  role?: Role;
}

export interface TempleCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: Date;
}

export interface Temple {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  thumbnail: string;
  status: string;
  created_at: Date;
  category?: TempleCategory;
}

export interface MediaFolder {
  id: number;
  folder_name: string;
  parent_folder: number | null;
}

export interface Media {
  id: number;
  title: string;
  file_name: string;
  file_url: string;
  file_id: string | null;
  mime_type: string;
  file_size: number;
  temple_id: number;
  category_id: number | null;
  folder_id: number | null;
  uploaded_by: number | null;
  video_type: string | null;
  duration: number | null;
  language: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  temple?: Temple;
  category?: MediaCategory;
  folder?: MediaFolder;
}

export interface MediaCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ActivityLog {
  id: number;
  user_id: number;
  action: string;
  created_at: Date;
  user?: User;
}
