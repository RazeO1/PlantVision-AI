"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const IslandScene = dynamic(() => import("./IslandScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
    </div>
  ),
});

export function PlantVisionIsland() {
  return (
    <div className="relative w-full h-[580px] lg:h-[640px]">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          </div>
        }
      >
        <IslandScene />
      </Suspense>
    </div>
  );
}