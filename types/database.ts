export type Profile = {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  lgu_id: string | null;
} | null;

export type ProfileData = {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;

  role: {
    id: string;
    name: string;
    description: string | null;
  };

  lgu: {
    id: string;
    name: string;
    level: string | null;
    region: string | null;
    is_active: boolean;
  };
} | null;

export type Lgu = {
  id: string;
  name: string;
  level: string;
  region: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};
