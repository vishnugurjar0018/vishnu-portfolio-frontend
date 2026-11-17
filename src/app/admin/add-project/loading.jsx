
"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E8FF]">
        <Loader2
          size={34}
          className="animate-spin text-[#7900D8]"
        />
      </div>

      <h2 className="mt-5 text-lg font-bold text-gray-900">
        Loading...
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Preparing your project workspace
      </p>
    </div>
  );
}
