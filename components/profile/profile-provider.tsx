"use client";

import React, { createContext, useContext } from "react";
import type { ProfileContextValue } from "@/types/database";

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({
  profile,
  children,
}: {
  profile: ProfileContextValue;
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
