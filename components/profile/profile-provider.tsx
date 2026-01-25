"use client";

import React, { createContext, useContext } from "react";
import type { Profile } from "@/types/profile";

const ProfileContext = createContext<Profile>(null);

export function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile;
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
