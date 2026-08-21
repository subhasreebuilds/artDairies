"use client";

import { ReactNode } from "react";
import { InstagramProvider } from "@/context/InstagramContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <InstagramProvider>
      {children}
    </InstagramProvider>
  );
}
