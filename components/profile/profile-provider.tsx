"use client";

import React, { createContext, useContext } from "react";
import type { ProfileData } from "@/types/database";

const ProfileContext = createContext<ProfileData>(null);

export function ProfileProvider({
  profile,
  children,
}: {
  profile: ProfileData;
  children: React.ReactNode;
}) {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
