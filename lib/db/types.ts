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

export interface TempleImage {
  id: number;
  temple_id: number;
  image_url: string;
  title: string;
  created_at: Date;
  temple?: Temple;
}

export interface TempleVideo {
  id: number;
  temple_id: number;
  video_url: string;
  video_type: string;
  duration: number;
  category_id: number | null;
  created_at: Date;
  temple?: Temple;
  category?: MediaCategory;
}

export interface TempleAudioGuide {
  id: number;
  temple_id: number;
  language: string;
  audio_url: string;
  created_at: Date;
  temple?: Temple;
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
