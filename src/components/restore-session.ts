// components/session-restorer.tsx
"use client"

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function RestoreSession() {
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return null; // this component doesn't show anything, it just runs logic
}