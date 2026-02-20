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

export type ProfileContextValue = {
  id: string;
  email: string;
  role: "Administrator" | "Staff" | "Viewer";
  lguId: string | null;
  departmentId: string | null;
  isActive: boolean;
  isVerified: boolean;
};

export type ProfileData = {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  role: string;
  department: string;
  lgu: string;
};

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
