// useSidebarState.ts
"use client";
import { useState } from "react";

export function useSidebarState() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return { isSidebarOpen, toggleSidebar };
}
